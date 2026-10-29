# Explore Nagpur — Travel Website & UI/UX Laboratory Project

[![HTML5](https://img.shields.io/badge/HTML5-Semantic%20Markup-E34F26?style=flat&logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Glossary/HTML5)
[![CSS3](https://img.shields.io/badge/CSS3-Custom%20Properties-1572B6?style=flat&logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla%20ES6+-F7DF1E?style=flat&logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![SEO](https://img.shields.io/badge/SEO-Structured%20Data%20%26%20Sitemap-26A69A?style=flat)](https://schema.org)
[![WCAG](https://img.shields.io/badge/Accessibility-WCAG%202.1%20AA-4CAF50?style=flat)](https://www.w3.org/WAI/standards-guidelines/wcag/)

> **Project Title:** Explore Nagpur — Discover Places, Plan Trips, and Explore Maharashtra  
> **Course:** UI/UX Design & Web Technologies Laboratory  
> **Project Scope:** Academic evaluation, responsive frontend engineering, and measurable technical SEO implementation.

---

## 📖 Project Overview

**Explore Nagpur** is a complete, responsive, multi-page travel website designed to showcase modern UI/UX design and technical Search Engine Optimization (SEO). Inspired by premium travel magazines and contemporary tourism platforms, the site provides a rich, informative guide to Nagpur's historical monuments, urban lakes, culinary heritage, and world-renowned tiger sanctuaries in Central India (Pench, Tadoba, Gorewada).

Built **without heavy third-party frameworks** (no React, Angular, or Vue), the codebase uses pure semantic HTML5, modern CSS3 custom properties, and vanilla JavaScript. This ensures fast performance, zero build dependencies, and clear, beginner-friendly code that is easy to explain during college laboratory viva examinations.

---

## 🗂️ Project Directory Structure

```text
explore-nagpur/
├── index.html                   # Page 1: Landing page, hero, categories, featured trips
├── destinations.html            # Page 2: Search, category filtering, detailed modal dialogs
├── weekend-trips.html           # Page 3: 2-day and 3-day getaways, road trip guides, safari tips
├── travel-guide.html            # Page 4: Packing essentials, wildlife safari rules, Saoji food, FAQs
├── about.html                   # Page 5: Project mission, lab scope, validated contact form
├── sitemap.xml                  # Canonical XML sitemap for search crawlers
├── robots.txt                   # Crawler directives referencing sitemap
├── .gitignore                   # Version control ignore rules
├── README.md                    # Project documentation and deployment guide
├── SEO_REPORT.md                # Comprehensive UI/UX & SEO laboratory report template
├── css/
│   └── styles.css               # Central stylesheet with design tokens, layout grids & media queries
├── js/
│   └── main.js                  # Master JavaScript file for interactivity and client-side validation
└── assets/
    ├── icons/
    │   └── favicon.svg          # Custom SVG favicon representing Nagpur (Orange + Compass)
    └── images/
        ├── hero-nagpur.jpg      # Scenic high-resolution landscape banner
        ├── deekshabhoomi.jpg    # Buddhist sacred stupa photograph
        ├── futala-lake.jpg      # Sunset lake waterfront photograph
        ├── ambazari-lake.jpg    # Nature trail and lake garden photograph
        ├── pench-tiger.jpg      # Bengal tiger in teak forest photograph
        ├── tadoba-safari.jpg    # Safari Gypsy jeep tracking wildlife photograph
        ├── chikhaldara.jpg      # Misty mountain valley photograph
        ├── ramtek-temple.jpg    # Ancient hilltop fort temple photograph
        ├── dragon-palace.jpg    # Lotus marble Buddhist temple photograph
        ├── gorewada-park.jpg    # Woodland safari trail photograph
        ├── sevagram-ashram.jpg  # Gandhian heritage ashram photograph
        ├── nagpur-oranges.jpg   # Nagpur mandarin citrus orchard photograph
        ├── saoji-cuisine.jpg    # Traditional Vidarbha cuisine photograph
        └── placeholder-fallback.svg # Branded SVG image fallback for offline resilience
```

---

## 🚀 How to Run the Website Locally

Because this project is built entirely with vanilla web technologies, no build steps (`npm run build`), bundling, or dependencies are required.

### Method 1: Using Python's Built-in HTTP Server (Recommended)
1. Open your terminal or PowerShell in the project directory:
   ```bash
   cd "path/to/explore-nagpur"
   ```
2. Start the local server:
   ```bash
   python -m http.server 8000
   ```
3. Open your browser and navigate to:
   ```text
   http://localhost:8000/
   ```

### Method 2: Using Node.js (npx serve)
```bash
npx serve .
```

### Method 3: Using VS Code Live Server Extension
1. Open the project folder in VS Code.
2. Right-click on `index.html` and select **"Open with Live Server"**.

### Method 4: Direct Browser Execution
You can also directly double-click `index.html` in your file explorer to open it in Chrome, Edge, Firefox, or Safari. All relative asset links, scripts, and CSS will load properly.

---

## 🎨 UI/UX Design System

* **Color Palette:**
  * **Forest Green (`#0d281a`, `#143d28`, `#1c5237`):** Nature, wildlife reserves, and eco-tourism.
  * **Warm Terracotta & Orange (`#d96b27`, `#b85418`):** Cultural homage to Nagpur (The Orange City) and high-contrast accessible CTAs.
  * **Warm Cream Canvas (`#faf7f2`, `#f4efe6`):** Low-glare, magazine-style background.
  * **Slate Text (`#16201a`, `#4a5a51`):** WCAG AA compliant text contrast (>4.5:1).
* **Typography:**
  * Headings: *Playfair Display* (Editorial Serif)
  * Body & Controls: *Plus Jakarta Sans* (Clean Modern Geometric Sans)
  * Fluid scaling via CSS `clamp()` for seamless responsiveness across mobile, tablet, and desktop.
* **Component Interactions:**
  * Sticky glassmorphic navigation with backdrop blur.
  * Mobile slide-down hamburger menu with ARIA state tracking.
  * Interactive destination search and category filter pills with empty state recovery.
  * Accessible modal dialog (`aria-modal="true"`) for comprehensive destination details.
  * Accordion FAQ with keyboard accessibility.
  * Smooth-scrolling floating Back-to-Top button.
  * Fully validated client-side contact and newsletter forms with accessible alerts.

---

## 🔍 SEO Implementation Overview

### 1. On-Page SEO
* **Title Tags:** Unique, keyword-targeted, under 60 characters on every page.
* **Meta Descriptions:** Compelling 145–158 character summaries with clear calls to action.
* **Semantic Hierarchy:** Single `<h1>` per page, followed by logical `<h2>` and `<h3>` tags.
* **Keyword Optimization:** Natural integration of target queries without stuffing (*places to visit in Nagpur*, *Nagpur tourist attractions*, *travel guide for Nagpur*, *weekend trips near Nagpur*).
* **Image SEO:** Explicit `width` and `height` to prevent layout shifts (CLS), meaningful `alt` text, lazy-loading for below-the-fold assets, and high-priority eager loading for the primary hero banner.
* **Internal Linking:** Consistent cross-linking with descriptive anchor texts.
* **Open Graph & Twitter Cards:** Full social preview metadata configured across all pages.

### 2. Technical SEO
* **XML Sitemap (`sitemap.xml`):** Formatted with `<urlset>`, `<loc>`, `<lastmod>`, `<changefreq>`, and `<priority>` for all five indexable pages.
* **Robots Directives (`robots.txt`):** Permits crawling of public pages and references the absolute sitemap URL.
* **Self-Referential Canonical Tags:** Declared on each page to avoid duplicate indexing.
* **JSON-LD Structured Data:**
  * `WebSite` & `SearchAction` on `index.html`.
  * `TouristDestination` on `index.html`.
  * `BreadcrumbList` on inner pages for breadcrumb search snippets.
  * `ItemList` & `TouristAttraction` on `destinations.html` and `weekend-trips.html`.
  * `FAQPage` on `travel-guide.html` (eligible for Google Rich Results).
  * `AboutPage` on `about.html`.

---

## 🌐 Deployment Instructions

### Deploy to GitHub Pages (Free with HTTPS)
1. Initialize a git repository and commit all files:
   ```bash
   git init
   git add .
   git commit -m "feat: complete explore nagpur travel website"
   ```
2. Create a new public repository on GitHub named `explore-nagpur`.
3. Add the remote and push your code:
   ```bash
   git remote add origin https://github.com/Divyanshkhare-06/explore-nagpur.git
   git branch -M main
   git push -u origin main
   ```
4. In your GitHub repository:
   * Go to **Settings** &rarr; **Pages**.
   * Under **Build and deployment** &rarr; **Branch**, select `main` and root directory `/ (root)`, then click **Save**.
5. Your website will be live in 1–2 minutes at:
   ```text
   https://Divyanshkhare-06.github.io/explore-nagpur/
   ```

### Deploy to Netlify
1. Log in to [Netlify](https://www.netlify.com/).
2. Drag and drop your project directory into the Netlify dashboard.
3. Your site is deployed immediately with automatic HTTPS.

---

## ⚠️ Crucial Updates Required After Deployment

Once you know your exact live hosting URL (e.g., `https://Divyanshkhare-06.github.io/explore-nagpur/` or `https://explore-nagpur.netlify.app/`):

1. **Update Canonical URLs in all HTML files:**
   Open each HTML file (`index.html`, `destinations.html`, `weekend-trips.html`, `travel-guide.html`, `about.html`) and update:
   ```html
   <link rel="canonical" href="https://your-exact-domain/page.html">
   <meta property="og:url" content="https://your-exact-domain/page.html">
   <meta name="twitter:url" content="https://your-exact-domain/page.html">
   ```
2. **Update `sitemap.xml`:**
   Replace the `<loc>` tags with your deployed domain URLs.
3. **Update `robots.txt`:**
   Update the `Sitemap:` directive line with your live sitemap absolute URL:
   ```text
   Sitemap: https://your-exact-domain/sitemap.xml
   ```

---

## 🧪 SEO & UI/UX Testing Checklist

To collect evidence for your laboratory report and viva:

1. **Local Validation:**
   * Open Chrome DevTools &rarr; Console: Verify zero JavaScript errors.
   * Open Network tab: Verify all images and stylesheets return `200 OK`.
2. **Google Lighthouse Audit:**
   * Open Chrome DevTools &rarr; **Lighthouse** tab.
   * Run Mobile and Desktop audits for **Performance**, **Accessibility**, **Best Practices**, and **SEO**.
   * Take screenshots of the scores for your report.
3. **Rich Results Structured Data Testing:**
   * Visit [Google Rich Results Test](https://search.google.com/test/rich-results).
   * Enter your live URL or paste code to verify that `BreadcrumbList`, `TouristAttraction`, and `FAQPage` are valid with zero errors.
4. **Mobile Responsiveness Check:**
   * Toggle Device Toolbar in DevTools (`Ctrl+Shift+M` / `Cmd+Shift+M`).
   * Test screen sizes from 360px (mobile) to 1440px (desktop) to ensure zero horizontal overflow.
5. **Form Validation Checks:**
   * Test submitting empty inputs on `about.html` and verify inline error feedback.
   * Test submitting invalid email formats on both the newsletter and contact forms.
   * Verify the success banner appears when inputs are valid.

---

## 📄 Academic Project Disclaimer

**Explore Nagpur** is an educational project developed solely for academic evaluation in a college UI/UX and Web Technologies laboratory. It is not an active travel agency, commercial tour operator, or booking platform. No monetary transactions or real bookings take place on this platform.

---

## 👨‍💻 Author & Credits

* **Developer:** Divyansh Khare
* **Project:** UI/UX Laboratory Evaluation
* **License:** Educational Non-Commercial Use

