# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Static marketing website for **Scannable** (scannable.io) — a PPE/safety equipment management platform. This is a **Webflow replacement**: the site was exported from Webflow once as a one-time migration, and is now maintained entirely outside of Webflow. All future edits, updates, and changes are made exclusively via AI (Claude Code).

**Hosting:** GitHub Pages (no build step — files are served as-is).

## Architecture

- **Pure static HTML/CSS/JS** — no build tool, no bundler, no package.json, no build step
- Each page lives in its own directory as `index.html` (e.g., `products/inventory-management/index.html`)
- **`_parts/`** — Shared HTML fragments (navbar, footer) and inline styles/scripts. When editing navbar or footer, update the `_clean.html` templates here and propagate to all pages.
- **`_build/`** — One-time migration tooling used during the initial Webflow export. Not used for ongoing development.
- **`_source.html`** — Full Webflow export of the homepage, kept as reference for the original markup patterns
- **`css/`** — `webflow.css` (framework) + `style.css` (custom overrides)
- **`js/`** — Webflow runtime chunks + `components.js` (custom JS)
- **`images/`** — Organized by section (`home/`, `products/`, `cdn/`, `logos/`, `app/`)

## Local Development

Serve with any static file server:
```
python3 -m http.server 8000
```
All internal links use root-relative paths (starting with `/`).

## Important Patterns

- **No build process.** Edit HTML/CSS/JS files directly — what's in the repo is what gets served.
- Navbar and footer are shared across all pages. The canonical templates live in `_parts/{navbar,footer}_clean.html`. When making global changes (nav links, footer content), update the template and then apply the change across all page `index.html` files.
- CSS uses Webflow's class naming conventions (e.g., `navbar`, `footer6_component`, `container-medium`)
- Pages reference Google Fonts (Inter) and Webflow's JS runtime for interactions
- All images are local — no external CDN references should exist in the HTML
