# Gill AI Labs Website

Static, mobile-first marketing website for Gill AI Labs. It uses native HTML, CSS, and JavaScript with no build or runtime dependencies.

## Architecture

- `index.html` - primary conversion landing page
- `*.html` - static pages with page-specific metadata and semantic content
- `assets/css/styles.css` - responsive design system and component styles
- `assets/js/site.js` - shared navigation, light theme preference, mobile menu, and back-to-top interaction
- `robots.txt` and `sitemap.xml` - crawler configuration

## Local preview

Open `index.html` directly in a browser, or serve the directory with any static HTTP server. Lead forms open a prefilled email to `hello@gillailabs.com`; visitors need a configured email application. Use a form endpoint or email delivery service instead when submissions must be sent without an email client.

## Deployment notes

Before publishing, replace the placeholder phone number, office/map detail, and test domain data with verified business information. The site is CDN-ready because all assets are local and unbundled.