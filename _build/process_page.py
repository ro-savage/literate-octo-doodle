#!/usr/bin/env python3
"""
Process a single page from scannable.io into a local static HTML file.
Usage: python3 process_page.py <url_path> [<title>]
Example: python3 process_page.py /industry/rope-access "Rope Access"
"""
import sys, os, re, urllib.request, ssl, hashlib, json

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PARTS_DIR = os.path.join(BASE_DIR, '_parts')
IMAGES_CDN_DIR = os.path.join(BASE_DIR, 'images', 'cdn')
ctx = ssl.create_default_context()

def download(url, timeout=20):
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36'})
    with urllib.request.urlopen(req, context=ctx, timeout=timeout) as resp:
        return resp.read()

def download_image(url, local_path):
    """Download an image if it doesn't already exist."""
    full_path = os.path.join(BASE_DIR, local_path)
    if os.path.exists(full_path):
        return True
    try:
        data = download(url)
        os.makedirs(os.path.dirname(full_path), exist_ok=True)
        with open(full_path, 'wb') as f:
            f.write(data)
        return True
    except Exception as e:
        return False

def url_to_filename(url):
    """Convert a CDN URL to a clean local filename."""
    decoded = urllib.request.unquote(url)
    filename = decoded.split('/')[-1]
    filename = re.sub(r'[^a-zA-Z0-9._-]', '-', filename)
    filename = re.sub(r'-+', '-', filename).strip('-')
    if len(filename) > 80:
        filename = filename[:80]
    if not filename:
        filename = hashlib.md5(url.encode()).hexdigest()[:12]
    return filename

def get_relative_prefix(url_path):
    """Return root-relative prefix for all paths (works with any server)."""
    return ''

def replace_cdn_urls(html, prefix):
    """Replace CDN URLs with local paths, downloading images as needed."""
    # Known mappings
    known_map = {
        'Scannable%20Preferred%20Light.svg': f'{prefix}/images/logos/scannable-light.svg',
        'Scannable Preferred Light.svg': f'{prefix}/images/logos/scannable-light.svg',
        'Scannable%20Preferred.svg': f'{prefix}/images/logos/scannable-dark.svg',
        'Scannable Preferred.svg': f'{prefix}/images/logos/scannable-dark.svg',
        'sprat-logo.png': f'{prefix}/images/logos/sprat.png',
        'irata-logo.png': f'{prefix}/images/logos/irata.png',
        'lime-scannable-logo.png': f'{prefix}/images/logos/lime-scannable.png',
        'scannable-app-qr.png': f'{prefix}/images/app/qr-code.png',
        'apple-cta.png': f'{prefix}/images/app/apple-store.png',
        'google-cta.png': f'{prefix}/images/app/google-play.png',
        'tick-purple.png': f'{prefix}/images/logos/tick-purple.png',
        'cross-icon.png': f'{prefix}/images/logos/cross-icon.png',
        'world-map.svg': f'{prefix}/images/home/world-map.svg',
        'favicon.png': f'{prefix}/images/cdn/favicon.png',
    }

    for fragment, local in known_map.items():
        # Replace any CDN URL containing this fragment
        pattern = rf'https://cdn\.prod\.website-files\.com/[^"\'<>\s]*?{re.escape(fragment)}[^"\'<>\s]*'
        html = re.sub(pattern, local, html)

    # Find remaining CDN URLs and download them
    # Match through file extension to handle filenames with () in them
    remaining = re.findall(r'https://cdn\.prod\.website-files\.com/[^"\'<>\s]+\.(?:png|jpg|jpeg|webp|svg|gif)(?:\b|(?=["\s<]))', html)
    # Also catch any that end without extension (srcset entries with width descriptors)
    remaining += re.findall(r'https://cdn\.prod\.website-files\.com/[a-zA-Z0-9%/_.-]+', html)
    for url in set(remaining):
        filename = url_to_filename(url)
        local_rel = f'images/cdn/{filename}'
        download_image(url, local_rel)
        html = html.replace(url, f'{prefix}/{local_rel}')

    return html

def extract_page_content(html):
    """Extract the content between navbar and footer."""
    # Find navbar end
    navbar_start = html.find('<div data-animation="default" class="navbar')
    if navbar_start == -1:
        navbar_start = html.find('class="navbar ')

    # Track div depth to find navbar end
    if navbar_start > -1:
        depth = 0
        pos = navbar_start
        navbar_end = navbar_start
        while pos < len(html):
            if html[pos:pos+4] == '<div':
                depth += 1
            elif html[pos:pos+6] == '</div>':
                depth -= 1
                if depth == 0:
                    navbar_end = pos + 6
                    break
            pos += 1
    else:
        navbar_end = html.find('<body>') + 6

    # Find footer
    footer_start = html.find('<footer class="footer6_component')
    if footer_start == -1:
        footer_start = html.find('<footer')

    footer_end = html.find('</footer>', footer_start)
    if footer_end > -1:
        footer_end += 9
    else:
        footer_end = html.find('</body>')

    content = html[navbar_end:footer_start] if footer_start > -1 else html[navbar_end:]
    footer = html[footer_start:footer_end] if footer_start > -1 else ''

    # Also extract the page title
    title_match = re.search(r'<title>([^<]+)</title>', html)
    title = title_match.group(1) if title_match else 'Scannable'

    desc_match = re.search(r'<meta[^>]+name="description"[^>]+content="([^"]*)"', html)
    description = desc_match.group(1) if desc_match else ''

    return content, footer, title, description

def load_template_part(name, prefix):
    """Load navbar or footer template and convert to root-relative paths."""
    path = os.path.join(PARTS_DIR, f'{name}_clean.html')
    with open(path) as f:
        html = f.read()

    # Convert ./ relative paths to root-relative /
    html = re.sub(r'((?:src|href|srcset)=")\./', r'\1/', html)
    html = html.replace('url(&quot;./', 'url(&quot;/')

    return html

def build_page(url_path, custom_title=None):
    """Build a complete page from a scannable.io URL path."""
    url_path = url_path.rstrip('/')
    prefix = get_relative_prefix(url_path)
    local_dir = os.path.join(BASE_DIR, url_path.strip('/'))
    os.makedirs(local_dir, exist_ok=True)
    output_path = os.path.join(local_dir, 'index.html')

    # Download source
    url = f'https://www.scannable.io{url_path}'
    try:
        data = download(url, timeout=30)
        html = data.decode('utf-8')
    except Exception as e:
        print(f'FAIL download {url_path}: {e}')
        return False

    # Extract content
    content, footer_html, title, description = extract_page_content(html)

    if custom_title:
        title = custom_title

    # Replace CDN URLs in content and footer
    content = replace_cdn_urls(content, prefix)
    footer_html = replace_cdn_urls(footer_html, prefix)

    # Remove data-w-id attributes
    content = re.sub(r' data-w-id="[^"]*"', '', content)
    footer_html = re.sub(r' data-w-id="[^"]*"', '', footer_html)

    # Load navbar and footer templates
    navbar = load_template_part('navbar', prefix)

    # Use extracted footer if it has content, otherwise use template
    if len(footer_html.strip()) < 100:
        footer_html = load_template_part('footer', prefix)

    # Also get scroll script
    scroll_script_path = os.path.join(PARTS_DIR, 'scroll-script.js')
    with open(scroll_script_path) as f:
        scroll_script = f.read()

    # Assemble
    page = f'''<!DOCTYPE html>
<html data-wf-domain="www.scannable.io" lang="en">
<head>
  <meta charset="utf-8"/>
  <title>{title}</title>
  <meta content="{description}" name="description"/>
  <meta content="width=device-width, initial-scale=1" name="viewport"/>
  <link href="{prefix}/css/webflow.css" rel="stylesheet" type="text/css"/>
  <link href="https://fonts.googleapis.com" rel="preconnect"/>
  <link href="https://fonts.gstatic.com" rel="preconnect" crossorigin="anonymous"/>
  <script src="https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js"></script>
  <script>WebFont.load({{ google: {{ families: ["Inter:300,400,500,600,700"] }} }});</script>
  <script>!function(o,c){{var n=c.documentElement,t=" w-mod-";n.className+=t+"js",("ontouchstart"in o||o.DocumentTouch&&c instanceof DocumentTouch)&&(n.className+=t+"touch")}}(window,document);</script>
  <link href="{prefix}/images/cdn/favicon.png" rel="shortcut icon" type="image/x-icon"/>
  <style>
    * {{ -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }}
    h1, h2, h3, h4, h5, h6, p {{ font-family: "Helvetica Neue", Helvetica, Arial, sans-serif !important; }}
    a, .w-input, .w-select, .w-tab-link, .w-nav-link, .w-nav-brand, .w-dropdown-btn, .w-dropdown-toggle, .w-dropdown-link {{ color: inherit; text-decoration: inherit; font-size: inherit; }}
    .container-medium, .container-small, .container-large {{ margin-right: auto !important; margin-left: auto !important; }}
    :root {{ --main-font: "Helvetica Neue", Helvetica, Arial, "Lucida Grande", sans-serif; }}
    body {{ font-family: var(--main-font); }}
    h1, h2, h3, h4, h5, h6 {{ font-family: var(--main-font); }}
  </style>
  <script>
{scroll_script}
  </script>
</head>
<body>
  {navbar}
  {content}
  {footer_html}
  <script src="{prefix}/js/jquery.min.js"></script>
  <script src="{prefix}/js/webflow.chunk1.js"></script>
  <script src="{prefix}/js/webflow.chunk2.js"></script>
  <script src="{prefix}/js/webflow.main.js"></script>
</body>
</html>'''

    with open(output_path, 'w') as f:
        f.write(page)

    # Verify no CDN refs remain
    cdn_remaining = len(re.findall(r'cdn\.prod\.website-files\.com', page))
    size = len(page)

    return True, size, cdn_remaining

def process_batch(paths):
    """Process a batch of URL paths."""
    results = []
    for path in paths:
        try:
            result = build_page(path)
            if result and result[0]:
                _, size, cdn = result
                status = f'OK ({size//1024}KB, {cdn} cdn refs)'
            else:
                status = 'FAIL'
        except Exception as e:
            status = f'ERROR: {e}'
        results.append((path, status))
        print(f'  {path}: {status}')
    return results

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print('Usage: python3 process_page.py <url_path> [<url_path2> ...]')
        sys.exit(1)

    paths = sys.argv[1:]
    results = process_batch(paths)

    ok = sum(1 for _, s in results if s.startswith('OK'))
    print(f'\nDone: {ok}/{len(results)} succeeded')
