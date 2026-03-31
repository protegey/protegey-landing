# SEO Implementation Plan

> Comprehensive SEO improvements based on full codebase audit.
> Created: 2026-03-31

---

## Scope

- Metadata standardization
- Canonical URL fixes
- Sitemap generation fixes
- Structured data additions & fixes
- Accessibility improvements
- Internal linking fixes
- Font loading optimization
- Image optimization

---

## Phase 1: Critical Fixes (P0)

### 1.1 Fix Sitemap Locale Prefix Bug
**Severity:** Critical — wrong URLs submitted to Google
**Files:** `server/api/sitemap-urls.get.ts`, `nuxt.config.ts`

- Change `locale === 'en'` → `locale === 'fr'` on lines 26 and 41 (French is default, no prefix)
- Set `autoI18n: false` in `nuxt.config.ts` sitemap config (we manually generate all variants, avoid duplication)
- Add `lastmod` field to all URL entries (use build date or a static date)
- Add 16 missing dynamic route variants:
  - 5× `/solutions/[id]`: transaction-monitoring, account-protection, aml-compliance, risk-profiling, fraud-intelligence
  - 11× `/use-cases/[slug]`: banks, lending, microfinance, fintechs, mobile_money, remittance, ecommerce, gaming, crypto, regulators, mobility
- All 16 routes × 3 locales = 48 new URLs added to sitemap

### 1.2 Fix Canonical URL Bugs in 5 Pages
**Severity:** Critical — wrong canonical URLs cause duplicate content penalties
**Files:** `about.vue:257`, `privacy.vue:102`, `terms.vue:109`, `solutions/index.vue:24`, `solutions/[id].vue:46`

- Change `currentLocale === 'en'` → `currentLocale === 'fr'` in all 5 files
- Remove duplicate `useHead({ link: [{ rel: 'canonical' }] })` calls — the layout already handles canonical via `default.vue:92`
- Fix BreadcrumbList schema URLs in the same files (same `=== 'en'` bug)

### 1.3 Fix `useSeoUtils.ts`
**Severity:** Medium — unused but has bugs
**File:** `app/composables/useSeoUtils.ts`

- Fix `getAlternateLinks` hreflang: use `en-US`, `fr-FR`, `ar-EG` instead of short codes
- Fix `x-default` href: point to current page's French version (`${baseUrl}${cleanPath}`), not always root
- Keep the utility — it's not detrimental, just stale

### 1.4 Standardize Metadata System
**Severity:** High — 22 pages missing complete OG/Twitter meta
**New file:** `app/composables/usePageMeta.ts`

Create a single composable that every page uses:

```ts
export function usePageMeta(opts: {
  title: string | (() => string)
  description: string | (() => string)
  ogImage?: string          // defaults to global og-image.jpg
  schemaOrg?: any[]         // optional structured data
})
```

**What it does:**
- Sets `useSeoMeta()` with: `title`, `ogTitle`, `description`, `ogDescription`, `ogImage`, `twitterCard`, `twitterTitle`, `twitterDescription`, `twitterImage`, `twitterSite`
- `ogImage` defaults to `t('seo.global.image')`; pages with hero images override
- Calls `defineOgImageComponent()` server-side when `ogImage` is set
- Calls `useSchemaOrg()` when `schemaOrg` is provided

**Then refactor all 16 page files** to use `usePageMeta()` instead of scattered `useSeoMeta()` calls. Pages affected:

| Page | Current State | After |
|---|---|---|
| `contact.vue` | title, ogTitle, description only | Full OG + Twitter |
| `api-docs.vue` | title, ogTitle, description only | Full OG + Twitter |
| `privacy.vue` | title, ogTitle, description only | Full OG + Twitter |
| `terms.vue` | title, ogTitle, description only | Full OG + Twitter |
| `use-cases/index.vue` | title, ogTitle, description only | Full OG + Twitter |
| `use-cases/[slug].vue` | title, description only | Full OG + Twitter |
| `what-is-protegey.vue` | title, ogTitle, description | Full OG + Twitter |
| `how-it-works.vue` | title, ogTitle, description, ogDescription | Full OG + Twitter |
| `who-its-for.vue` | title, ogTitle, description, ogDescription | Full OG + Twitter |
| `comparisons.vue` | title, ogTitle, description, ogDescription | Full OG + Twitter |
| `trust.vue` | title, ogTitle, description, ogDescription | Full OG + Twitter |
| `careers.vue` | Complete but missing twitterImage | Fixed |

### 1.5 Remove Duplicate Global Schemas
**Severity:** High — Google flags conflicting Organization schemas
**File:** `app/layouts/default.vue`

- Remove global Organization + WebSite JSON-LD injection from `default.vue:96-106`
- Keep `og:site_name`, `og:type`, `twitter:card` as global defaults in `useHead()`
- Move Organization schema to homepage only (via `usePageMeta` or keep in `index.vue`)
- Remove duplicate Organization schema from `index.vue` (keep one)

---

## Phase 2: Structured Data (P1)

### 2.1 Fix Existing Schema Bugs

| Fix | File | Detail |
|---|---|---|
| Fix FAQ schema | `FAQ.vue:8-30` | Move `faqs` array inside `if (import.meta.server)` so `t()` resolves per-locale at runtime, not build time |
| Fix Offer price | `index.vue:82` | Change `price: '0.00'` (string) → `price: 0` (number) — Google requires numeric |
| Fix trust.vue schema | `trust.vue:25` | Remove invalid `iso6523Code: 'ISO 27001'` — not a valid schema.org property |
| Fix Product schema offers | `solutions/[id].vue:50-64` | Add `price` and `priceCurrency` to `offers` object — required for Product rich results |
| Fix 5 BreadcrumbList URLs | about, privacy, terms, solutions, solutions/[id] | Change `=== 'en'` → `=== 'fr'` in all BreadcrumbList schema URL generation |

### 2.2 Add Missing BreadcrumbList Schema

| Page | Breadcrumbs |
|---|---|
| `contact.vue` | Home → Contact |
| `careers.vue` | Home → Careers |
| `api-docs.vue` | Home → API Docs |
| `use-cases/index.vue` | Home → Use Cases |
| `use-cases/[slug].vue` | Home → Use Cases → {Industry Name} |
| `what-is-protegey.vue` | Home → What is Protegey |
| `how-it-works.vue` | Home → How It Works |
| `who-its-for.vue` | Home → Who It's For |
| `comparisons.vue` | Home → Comparisons |

### 2.3 Add Missing Page-Level Schemas

| Page | Schema Type | Key Properties |
|---|---|---|
| `contact.vue` | `ContactPage` | name, description, mainEntity: Organization |
| `careers.vue` | `WebPage` + employer `Organization` | name, description, employer.name |
| `api-docs.vue` | `TechArticle` | name, description, author: "Protegey", articleSection: "API Documentation" |
| `use-cases/index.vue` | `CollectionPage` | name, description |
| `use-cases/[slug].vue` | `Article` | headline, description, author: "Protegey", articleSection: industry name |
| `how-it-works.vue` | `WebPage` + `TechArticle` | name, description, articleSection: "Fraud Detection Pipeline" (NOT HowTo — this describes an automated system, not user instructions) |

---

## Phase 3: Accessibility (P1)

### 3.1 Fix Navigation Landmarks

| Fix | File | Detail |
|---|---|---|
| Wrap desktop nav in `<nav>` | `HeaderNav.vue:193` | Change `<div class="hidden md:flex ...">` → `<nav role="navigation" aria-label="Main navigation" class="hidden md:flex ...">` |
| Wrap mobile menu in `<nav>` | `HeaderNav.vue:371` | Add `role="navigation"` and `aria-label="Mobile navigation"` to the menu container |
| Add `role="dialog"` + `aria-modal` | `HeaderNav.vue:354` | Mobile overlay needs `role="dialog" aria-modal="true"` for screen readers |
| Add `aria-label` to close button | `HeaderNav.vue:364` | Close button needs `:aria-label="$t('a11y.close_menu')"` |

### 3.2 Fix Heading Hierarchy

| Page | Current | Fix |
|---|---|---|
| `contact.vue` | h1 → h3 (skips h2) | Change email/location h3 → h2, form title h3 → h2 |
| `use-cases/index.vue` | h1 → h3 (skips h2) | Change industry card h3 → h2 |
| `privacy.vue` | h1 → h3 (skips h2) | Change all section h3 → h2 |
| `terms.vue` | h1 → h3 (skips h2) | Change all section h3 → h2 |
| `api-docs.vue` | h1 → h3 (skips h2) | Change feature card h3 → h2 |
| `who-its-for.vue` | h1 → h3 (skips h2) | Change card h3 → h2 |
| `how-it-works.vue` | h1 → h3 → h2 (out of order) | Change pipeline step h3 → h2 |

### 3.3 Fix Keyboard Navigation

| Fix | File | Detail |
|---|---|---|
| Keyboard-openable dropdowns | `HeaderNav.vue:196-298` | Add `@focus`/`@blur` or `@click` handlers alongside `@mouseenter`/`@mouseleave` — hover-only excludes keyboard users |
| Focus trap in mobile menu | `HeaderNav.vue:348-466` | Implement focus trap — Tab key should cycle within overlay, not escape to page behind |
| Escape key → close mobile menu | `HeaderNav.vue` | Add `onKeydown` listener for Escape to close mobile overlay |
| Escape key → close dropdowns | `HeaderNav.vue` | Add Escape handler to close desktop dropdowns |

### 3.4 Fix GSAP aria-hidden Bug
**Severity:** High — GSAP hides main/header/footer from screen readers
**File:** `index.vue:104-122`

- Root cause: GSAP's ScrollTrigger adds `data-aria-hidden` to non-target elements
- Fix: Add `aria-hidden: false` to GSAP ScrollTrigger config, or use `targets` more precisely
- Remove the `onMounted` workaround that manually strips `aria-hidden` attributes

### 3.5 Add lang/dir to error.vue
**File:** `error.vue:22`

- `error.vue` bypasses default layout, so it doesn't get `useLocaleHead` htmlAttrs
- Add `useHead({ htmlAttrs: { lang: 'fr', dir: 'ltr' } })` or use `useI18n().locale` to set dynamically

---

## Phase 4: Internal Linking (P2)

### 4.1 Fix Orphaned Pages — lending & remittance

| Fix | File | Detail |
|---|---|---|
| Add to `INDUSTRY_ORDER` | `HeaderNav.vue:151-160` | Add `'lending'` and `'remittance'` to the array so they appear in nav dropdown |
| Add to use-cases grid | `use-cases/index.vue:30-39` | Add to `SECTOR_KEYS` array so they appear on the index page |

### 4.2 Add Cross-Linking

| Fix | File | Detail |
|---|---|---|
| "Related solutions" section | `solutions/[id].vue` | Add bottom section linking to other 4 solution pages (exclude current) |
| "Related industries" section | `use-cases/[slug].vue` | Add bottom section linking to 3-4 related industries |
| Individual use-case links in Footer | `Footer.vue:117-122` | Replace single `/use-cases` link with top 5 individual industry links + "View all" |

### 4.3 Create `/demo` Page & Replace Fragment Links
**New file:** `app/pages/demo.vue`

- Create dedicated demo request page wrapping the waitlist form
- Extract waitlist form into shared component (`app/components/sections/WaitlistForm.vue`)
- Set proper SEO meta via `usePageMeta()` and `ContactPage` schema
- Replace all 3 `/#waitlist` fragment links:
  - `HeaderNav.vue:318` (desktop CTA)
  - `HeaderNav.vue:461` (mobile CTA)
  - `use-cases/index.vue:110` (CTA section)
  - `use-cases/[slug].vue:211` (CTA section)

---

## Phase 5: Performance (P2)

### 5.1 Font Loading Optimization
**Severity:** High — 23 font variants = ~800KB-1.2MB payload
**File:** `nuxt.config.ts:140`

**Current URL loads:**
- IBM Plex Sans: 100, 200, 300, 400, 500, 600, 700 + italic 400, 500, 600 = **10 variants**
- IBM Plex Sans Arabic: 100, 200, 300, 400, 500, 600, 700 = **7 variants**
- Inter: 300, 400, 500, 600, 700, 800 = **6 variants**

**Fixes:**
1. **Remove unused weights:** Delete 100, 200, and all italic variants. Keep only 300-700 for Plex Sans, 300-700 for Inter.
2. **Split Arabic fonts:** Only load IBM Plex Sans Arabic for `ar` locale. For `fr`/`en`, remove it from the Google Fonts URL.
3. **Add preload:** Add `<link rel="preload" href="..." as="font" crossorigin>` for IBM Plex Sans 500 and 600 (critical heading fonts).
4. **Add dns-prefetch:** Add `<link rel="dns-prefetch" href="https://fonts.googleapis.com">` as fallback for browsers without preconnect.

**Resulting URLs:**
- fr/en: `IBM+Plex+Sans:300;400;500;600;700&Inter:300;400;500;600;700;800` (~400KB savings)
- ar: Above + `IBM+Plex+Sans+Arabic:300;400;500;600;700`

### 5.2 Image Optimization

| Fix | File | Detail |
|---|---|---|
| Convert `about-hero.png` (572KB) → WebP | `about.vue:31` | Use `<NuxtImg>` with `format="webp"`, add explicit `width`/`height` attributes to prevent CLS |
| Replace mobile menu PNG logos | `HeaderNav.vue:360-361` | Change `logo-icon-light-mode.png` (273KB) and `logo-icon-dark-mode.png` (199KB) to use the 6.8KB SVG variants |
| Add `width`/`height` to all `<img>` | `HeaderNav.vue:186-187`, `Footer.vue:9-10` | Add intrinsic dimensions to prevent CLS — SVGs are 68.45×13.55 viewBox, use `width="137" height="27"` (2x) |
| Convert all `<img>` → `<NuxtImg>` | Global | Enables automatic WebP/AVIF conversion, responsive `srcset`, lazy loading |

### 5.3 Lazy Load GSAP
**Severity:** High — 100KB GSAP on every page
**Files:** All pages importing GSAP statically

- Replace static `import { gsap } from 'gsap'` with dynamic imports on pages that don't need animations
- Pages that DON'T need GSAP: `terms.vue`, `privacy.vue`, `api-docs.vue`, `contact.vue`, `what-is-protegey.vue`, `how-it-works.vue`, `who-its-for.vue`, `comparisons.vue`, `trust.vue`
- Lazy-load mobile menu component with `defineAsyncComponent` in `HeaderNav.vue`

---

## Execution Order

```
Phase 1 — Critical (blocks correct indexing)
  ├── 1.1 Fix sitemap locale prefix + add 48 missing URLs + lastmod
  ├── 1.2 Fix canonical URL bugs in 5 pages
  ├── 1.3 Fix useSeoUtils.ts (hreflang codes, x-default)
  ├── 1.4 Create usePageMeta composable + refactor all 16 pages
  └── 1.5 Remove duplicate global schemas from layout

Phase 2 — Structured Data (rich results)
  ├── 2.1 Fix existing schema bugs (FAQ, Offer price, trust.vue, Product offers, BreadcrumbList URLs)
  ├── 2.2 Add BreadcrumbList schema to 9 missing pages
  └── 2.3 Add page-level schemas (ContactPage, TechArticle, Article, CollectionPage)

Phase 3 — Accessibility (crawlability + compliance)
  ├── 3.1 Fix navigation landmarks (<nav>, role="dialog", aria-labels)
  ├── 3.2 Fix heading hierarchy in 7 pages (h3 → h2)
  ├── 3.3 Fix keyboard navigation (dropdowns, focus trap, Escape key)
  ├── 3.4 Fix GSAP aria-hidden bug
  └── 3.5 Add lang/dir to error.vue

Phase 4 — Internal Linking (crawl depth)
  ├── 4.1 Add lending & remittance to nav and use-cases grid
  ├── 4.2 Add cross-linking (related solutions, related industries, footer industries)
  └── 4.3 Create /demo page, replace 4 fragment links

Phase 5 — Performance (Core Web Vitals)
  ├── 5.1 Trim font variants + split Arabic fonts conditionally
  ├── 5.2 Optimize images (WebP, dimensions, NuxtImg)
  └── 5.3 Lazy-load GSAP on non-animation pages
```

---

## Files to Modify

| File | Phases |
|---|---|
| `server/api/sitemap-urls.get.ts` | 1.1 |
| `nuxt.config.ts` | 1.1, 5.1 |
| `app/composables/useSeoUtils.ts` | 1.3 |
| `app/composables/usePageMeta.ts` | **NEW** — 1.4 |
| `app/layouts/default.vue` | 1.5 |
| `app/pages/index.vue` | 1.4, 2.1, 3.4 |
| `app/pages/about.vue` | 1.2, 1.4, 2.1, 2.2 |
| `app/pages/contact.vue` | 1.4, 2.2, 2.3, 3.2 |
| `app/pages/careers.vue` | 1.4, 2.2, 2.3 |
| `app/pages/api-docs.vue` | 1.4, 2.2, 2.3, 3.2 |
| `app/pages/privacy.vue` | 1.2, 1.4, 2.1, 2.2, 3.2 |
| `app/pages/terms.vue` | 1.2, 1.4, 2.1, 2.2, 3.2 |
| `app/pages/solutions/index.vue` | 1.2, 1.4, 2.1, 2.2, 4.2 |
| `app/pages/solutions/[id].vue` | 1.2, 1.4, 2.1, 2.2, 4.2 |
| `app/pages/use-cases/index.vue` | 1.4, 2.2, 2.3, 3.2, 4.1, 4.3 |
| `app/pages/use-cases/[slug].vue` | 1.4, 2.2, 2.3, 4.2, 4.3 |
| `app/pages/what-is-protegey.vue` | 1.4, 2.2 |
| `app/pages/how-it-works.vue` | 1.4, 2.2, 2.3, 3.2 |
| `app/pages/who-its-for.vue` | 1.4, 2.2, 3.2 |
| `app/pages/comparisons.vue` | 1.4, 2.2 |
| `app/pages/trust.vue` | 1.4, 2.1, 2.2 |
| `app/pages/demo.vue` | **NEW** — 4.3 |
| `app/components/sections/HeaderNav.vue` | 3.1, 3.3, 4.1, 4.3, 5.2, 5.3 |
| `app/components/sections/Footer.vue` | 4.2, 5.2 |
| `app/components/sections/FAQ.vue` | 2.1 |
| `app/error.vue` | 3.5 |

---

## Success Criteria

- [ ] Sitemap contains all 90 URLs (30 pages × 3 locales) with correct prefixes and `lastmod`
- [ ] All pages have complete OG + Twitter meta (7+ tags each)
- [ ] No duplicate Organization/WebSite schemas
- [ ] All BreadcrumbList schemas use correct locale prefix
- [ ] All headings follow proper hierarchy (no skipped levels)
- [ ] Desktop nav has `<nav>` landmark, mobile menu has `role="dialog"`
- [ ] Dropdown menus are keyboard-accessible
- [ ] lending and remittance appear in navigation
- [ ] No fragment `/#waitlist` links — all point to `/demo`
- [ ] Font payload reduced by ~400KB (removed unused weights)
- [ ] Arabic fonts only loaded on `ar` locale
- [ ] All images use `<NuxtImg>` or have explicit dimensions
- [ ] GSAP not loaded on text-only pages
