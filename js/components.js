/* ============================================
   Scannable Marketing Website - Web Components
   ============================================ */

/* ---- Site Header Component ---- */
class SiteHeader extends HTMLElement {
  connectedCallback() {
    const active = this.getAttribute('active-page') || '';
    const bp = this.getAttribute('base-path') || '.';

    this.innerHTML = `
      <header class="site-header">
        <div class="site-header__inner">
          <a href="${bp}/index.html" class="site-header__logo">
            <img src="${bp}/images/logos/scannable-light.svg" alt="Scannable" height="28">
          </a>

          <nav class="site-header__nav">
            <!-- Product dropdown -->
            <div class="nav-item" data-dropdown>
              <button class="nav-item__trigger">Product <span class="chevron">&#9662;</span></button>
              <div class="nav-dropdown">
                <a href="${bp}/products/inventory-management/index.html" class="nav-dropdown__link">Inventory management</a>
                <a href="${bp}/products/equipment-assignment/index.html" class="nav-dropdown__link">Equipment assignment</a>
                <a href="${bp}/products/digital-inspections/index.html" class="nav-dropdown__link">Digital inspections</a>
                <a href="${bp}/products/compliance-management/index.html" class="nav-dropdown__link">Compliance reporting</a>
                <div class="nav-dropdown__divider"></div>
                <a href="${bp}/manufacturers/index.html" class="nav-dropdown__link">For Manufacturers</a>
                <a href="${bp}/resellers/index.html" class="nav-dropdown__link">For Resellers</a>
                <a href="${bp}/inspectors/index.html" class="nav-dropdown__link">For Inspectors</a>
              </div>
            </div>

            <!-- NFC dropdown -->
            <div class="nav-item" data-dropdown>
              <button class="nav-item__trigger">NFC <span class="chevron">&#9662;</span></button>
              <div class="nav-dropdown">
                <a href="${bp}/smart-ppe/index.html" class="nav-dropdown__link">Smart PPE&trade;</a>
                <a href="https://shop.scannable.io/" class="nav-dropdown__link" target="_blank" rel="noopener">Shop retrofit tags</a>
              </div>
            </div>

            <!-- Industries dropdown -->
            <div class="nav-item" data-dropdown>
              <button class="nav-item__trigger">Industries <span class="chevron">&#9662;</span></button>
              <div class="nav-dropdown nav-dropdown--wide">
                <a href="${bp}/industry/rope-access/index.html" class="nav-dropdown__link">Rope Access</a>
                <a href="${bp}/industry/fire/index.html" class="nav-dropdown__link">Fire &amp; Emergency</a>
                <a href="${bp}/industry/rescue/index.html" class="nav-dropdown__link">Rescue</a>
                <a href="${bp}/industry/tower/index.html" class="nav-dropdown__link">Tower</a>
                <a href="${bp}/industry/arboriculture/index.html" class="nav-dropdown__link">Arboriculture</a>
                <a href="${bp}/industry/construction/index.html" class="nav-dropdown__link">Construction</a>
                <a href="${bp}/industry/renewables/index.html" class="nav-dropdown__link">Renewables</a>
                <a href="${bp}/industry/training-centres/index.html" class="nav-dropdown__link">Training Centres</a>
                <a href="${bp}/industry/lifting/index.html" class="nav-dropdown__link">Lifting</a>
                <a href="${bp}/industry/telecoms/index.html" class="nav-dropdown__link">Telecoms</a>
                <a href="${bp}/industry/mining/index.html" class="nav-dropdown__link">Mining</a>
                <a href="${bp}/industry/oil-and-gas/index.html" class="nav-dropdown__link">Oil and Gas</a>
                <a href="${bp}/industry/energy/index.html" class="nav-dropdown__link">Energy</a>
                <a href="${bp}/industry/marine/index.html" class="nav-dropdown__link">Marine</a>
                <a href="${bp}/industry/government/index.html" class="nav-dropdown__link">Government</a>
                <a href="${bp}/industry/events-rigging/index.html" class="nav-dropdown__link">Events / Rigging</a>
              </div>
            </div>

            <!-- Resources dropdown -->
            <div class="nav-item" data-dropdown>
              <button class="nav-item__trigger">Resources <span class="chevron">&#9662;</span></button>
              <div class="nav-dropdown">
                <a href="${bp}/customers/index.html" class="nav-dropdown__link">Customer stories</a>
                <a href="${bp}/demo-library/index.html" class="nav-dropdown__link">Demo videos</a>
                <a href="https://support.scannable.io/" class="nav-dropdown__link" target="_blank" rel="noopener">Knowledge base</a>
                <a href="${bp}/roi-calculator/index.html" class="nav-dropdown__link">ROI calculator</a>
                <a href="${bp}/nfc-tag-selector/index.html" class="nav-dropdown__link">Tag selector</a>
                <a href="${bp}/blog/index.html" class="nav-dropdown__link">Articles</a>
              </div>
            </div>

            <!-- Direct links -->
            <a href="https://shop.scannable.io/" class="nav-item__link" target="_blank" rel="noopener">Shop</a>
            <a href="${bp}/pricing/index.html" class="nav-item__link ${active === 'pricing' ? 'nav-item__link--active' : ''}">Pricing</a>
            <a href="${bp}/getting-started/index.html" class="nav-item__link ${active === 'getting-started' ? 'nav-item__link--active' : ''}">Getting Started</a>
          </nav>

          <div class="site-header__actions">
            <a href="https://app.scannable.io/sign-in" class="site-header__signin">Sign In</a>
            <a href="${bp}/bookademo/index.html" class="site-header__cta">Request Demo</a>
          </div>

          <button class="site-header__mobile-toggle" aria-label="Toggle menu">&#9776;</button>
        </div>

        <!-- Mobile navigation -->
        <div class="site-header__mobile-nav">
          <div class="mobile-nav__section">
            <div class="mobile-nav__heading">Product</div>
            <a href="${bp}/products/inventory-management/index.html" class="mobile-nav__link">Inventory management</a>
            <a href="${bp}/products/equipment-assignment/index.html" class="mobile-nav__link">Equipment assignment</a>
            <a href="${bp}/products/digital-inspections/index.html" class="mobile-nav__link">Digital inspections</a>
            <a href="${bp}/products/compliance-management/index.html" class="mobile-nav__link">Compliance reporting</a>
            <a href="${bp}/manufacturers/index.html" class="mobile-nav__link">For Manufacturers</a>
            <a href="${bp}/resellers/index.html" class="mobile-nav__link">For Resellers</a>
            <a href="${bp}/inspectors/index.html" class="mobile-nav__link">For Inspectors</a>
          </div>
          <div class="mobile-nav__section">
            <div class="mobile-nav__heading">NFC</div>
            <a href="${bp}/smart-ppe/index.html" class="mobile-nav__link">Smart PPE&trade;</a>
            <a href="https://shop.scannable.io/" class="mobile-nav__link" target="_blank" rel="noopener">Shop retrofit tags</a>
          </div>
          <div class="mobile-nav__section">
            <div class="mobile-nav__heading">Industries</div>
            <a href="${bp}/industry/rope-access/index.html" class="mobile-nav__link">Rope Access</a>
            <a href="${bp}/industry/fire/index.html" class="mobile-nav__link">Fire &amp; Emergency</a>
            <a href="${bp}/industry/rescue/index.html" class="mobile-nav__link">Rescue</a>
            <a href="${bp}/industry/tower/index.html" class="mobile-nav__link">Tower</a>
            <a href="${bp}/industry/arboriculture/index.html" class="mobile-nav__link">Arboriculture</a>
            <a href="${bp}/industry/construction/index.html" class="mobile-nav__link">Construction</a>
            <a href="${bp}/industry/renewables/index.html" class="mobile-nav__link">Renewables</a>
            <a href="${bp}/industry/training-centres/index.html" class="mobile-nav__link">Training Centres</a>
            <a href="${bp}/industry/lifting/index.html" class="mobile-nav__link">Lifting</a>
            <a href="${bp}/industry/telecoms/index.html" class="mobile-nav__link">Telecoms</a>
            <a href="${bp}/industry/mining/index.html" class="mobile-nav__link">Mining</a>
            <a href="${bp}/industry/oil-and-gas/index.html" class="mobile-nav__link">Oil and Gas</a>
            <a href="${bp}/industry/energy/index.html" class="mobile-nav__link">Energy</a>
            <a href="${bp}/industry/marine/index.html" class="mobile-nav__link">Marine</a>
            <a href="${bp}/industry/government/index.html" class="mobile-nav__link">Government</a>
            <a href="${bp}/industry/events-rigging/index.html" class="mobile-nav__link">Events / Rigging</a>
          </div>
          <div class="mobile-nav__section">
            <div class="mobile-nav__heading">Resources</div>
            <a href="${bp}/customers/index.html" class="mobile-nav__link">Customer stories</a>
            <a href="${bp}/demo-library/index.html" class="mobile-nav__link">Demo videos</a>
            <a href="https://support.scannable.io/" class="mobile-nav__link" target="_blank" rel="noopener">Knowledge base</a>
            <a href="${bp}/roi-calculator/index.html" class="mobile-nav__link">ROI calculator</a>
            <a href="${bp}/nfc-tag-selector/index.html" class="mobile-nav__link">Tag selector</a>
            <a href="${bp}/blog/index.html" class="mobile-nav__link">Articles</a>
          </div>
          <div class="mobile-nav__section">
            <a href="https://shop.scannable.io/" class="mobile-nav__link" target="_blank" rel="noopener">Shop</a>
            <a href="${bp}/pricing/index.html" class="mobile-nav__link">Pricing</a>
            <a href="${bp}/getting-started/index.html" class="mobile-nav__link">Getting Started</a>
          </div>
          <div class="mobile-nav__section" style="margin-top: 16px;">
            <a href="https://app.scannable.io/sign-in" class="btn btn--outline" style="width: 100%; margin-bottom: 8px;">Sign In</a>
            <a href="${bp}/bookademo/index.html" class="btn btn--primary" style="width: 100%;">Request Demo</a>
          </div>
        </div>
      </header>
    `;

    this.setupDropdowns();
    this.setupMobileMenu();
    this.setupScrollBehavior();
  }

  setupDropdowns() {
    const dropdowns = this.querySelectorAll('[data-dropdown]');

    dropdowns.forEach(item => {
      const trigger = item.querySelector('.nav-item__trigger');

      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains('nav-item--open');

        // Close all dropdowns first
        dropdowns.forEach(d => d.classList.remove('nav-item--open'));

        if (!isOpen) {
          item.classList.add('nav-item--open');
        }
      });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', () => {
      dropdowns.forEach(d => d.classList.remove('nav-item--open'));
    });
  }

  setupMobileMenu() {
    const toggle = this.querySelector('.site-header__mobile-toggle');
    const mobileNav = this.querySelector('.site-header__mobile-nav');

    toggle.addEventListener('click', () => {
      const isOpen = mobileNav.classList.contains('is-open');
      mobileNav.classList.toggle('is-open');
      toggle.innerHTML = isOpen ? '&#9776;' : '&#10005;';
      document.body.style.overflow = isOpen ? '' : 'hidden';
    });
  }

  setupScrollBehavior() {
    const header = this.querySelector('.site-header');
    let lastScroll = 0;
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScroll = window.scrollY;

          if (currentScroll > 100 && currentScroll > lastScroll) {
            header.classList.add('site-header--hidden');
          } else {
            header.classList.remove('site-header--hidden');
          }

          lastScroll = currentScroll;
          ticking = false;
        });
        ticking = true;
      }
    });
  }
}

customElements.define('site-header', SiteHeader);

/* ---- Site Footer Component ---- */
class SiteFooter extends HTMLElement {
  connectedCallback() {
    const bp = this.getAttribute('base-path') || '.';

    this.innerHTML = `
      <footer class="site-footer">
        <!-- Newsletter -->
        <div class="site-footer__newsletter">
          <div>
            <h3>Subscribe to updates</h3>
            <p>Stay informed about our latest news and offers.</p>
          </div>
          <form class="site-footer__newsletter-form" onsubmit="event.preventDefault();">
            <input type="email" placeholder="Enter your email" aria-label="Email address" required />
            <button type="submit">Subscribe</button>
          </form>
        </div>

        <!-- Main footer -->
        <div class="site-footer__main">
          <div class="site-footer__col">
            <h4>Quick Links</h4>
            <a href="${bp}/pricing/index.html">Pricing</a>
            <a href="${bp}/contact/index.html">Contact</a>
            <a href="${bp}/about/index.html">About Us</a>
            <a href="https://app.scannable.io/sign-up">Sign Up / Log In</a>
            <a href="${bp}/manufacturers/index.html">For Manufacturers</a>
            <a href="${bp}/resellers/index.html">For Rope Resellers</a>
            <a href="https://shop.scannable.io/" target="_blank" rel="noopener">NFC Shop</a>
          </div>

          <div class="site-footer__col">
            <h4>Resources</h4>
            <a href="https://support.scannable.io/" target="_blank" rel="noopener">Knowledge Base</a>
            <a href="${bp}/getting-started/index.html">Getting Started</a>
            <a href="${bp}/blog/index.html">Blog</a>
            <a href="${bp}/faq/index.html">FAQ</a>
            <a href="${bp}/terms-conditions/index.html">Terms of Service</a>
            <a href="${bp}/privacy-policy/index.html">Privacy Policy</a>
            <a href="https://status.scannable.io/" target="_blank" rel="noopener">Platform Status</a>
            <a href="https://trust.scannable.io/" target="_blank" rel="noopener">Trust Centre</a>
          </div>

          <div class="site-footer__col">
            <h4>Download the App</h4>
            <img src="${bp}/images/app/qr-code.png" alt="Download Scannable" width="120" style="margin-bottom: 12px; border-radius: 8px;">
            <div style="display: flex; gap: 8px; flex-wrap: wrap;">
              <a href="https://apps.apple.com/app/scannable" target="_blank" rel="noopener">
                <img src="${bp}/images/app/apple-store.png" alt="App Store" height="40">
              </a>
              <a href="https://play.google.com/store/apps/details?id=io.scannable" target="_blank" rel="noopener">
                <img src="${bp}/images/app/google-play.png" alt="Google Play" height="40">
              </a>
            </div>
          </div>

          <div class="site-footer__col">
            <h4>Contact</h4>
            <div class="site-footer__contact-item">
              <p><strong>Scannable HQ</strong><br>
              3 Endeavour Street, W&#x101;naka, New Zealand</p>
            </div>
            <div class="site-footer__contact-item">
              <p>
                <a href="mailto:support@scannable.io">support@scannable.io</a><br>
                NZ: +64 3 568 8343<br>
                UK: +44 748 134 3898<br>
                US: +1 (720) 804-0714
              </p>
            </div>
            <div class="site-footer__social">
              <a href="https://facebook.com/scannable" target="_blank" rel="noopener" aria-label="Facebook">f</a>
              <a href="https://instagram.com/scannable" target="_blank" rel="noopener" aria-label="Instagram">ig</a>
              <a href="https://linkedin.com/company/scannable" target="_blank" rel="noopener" aria-label="LinkedIn">in</a>
              <a href="https://youtube.com/scannable" target="_blank" rel="noopener" aria-label="YouTube">yt</a>
            </div>
          </div>
        </div>

        <!-- Bottom bar -->
        <div class="site-footer__bottom">
          <div>
            <img src="${bp}/images/logos/scannable-dark.svg" alt="Scannable" height="24" style="margin-bottom: 8px;">
            <div>&copy; 2026 Scannable. All rights reserved.</div>
          </div>
          <div class="site-footer__badges">
            <img src="${bp}/images/logos/sprat.png" alt="SPRAT" height="32">
            <img src="${bp}/images/logos/irata.png" alt="IRATA" height="32">
          </div>
        </div>
      </footer>
    `;
  }
}

customElements.define('site-footer', SiteFooter);
