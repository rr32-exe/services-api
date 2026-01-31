# 📖 Complete Documentation

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [File Structure](#file-structure)
3. [Configuration](#configuration)
4. [Content Management](#content-management)
5. [Deployment](#deployment)
6. [Customization](#customization)
7. [Monetization](#monetization)
8. [SEO & Marketing](#seo--marketing)
9. [Troubleshooting](#troubleshooting)

---

## Architecture Overview

### Tech Stack

**Frontend:**
- Astro 4.x (Static Site Generator)
- Tailwind CSS 3.x (Styling)
- Vanilla JS (Minimal client-side)

**Hosting:**
- Cloudflare Pages (Static hosting + CDN)
- Cloudflare Workers (Serverless functions)
- Cloudflare D1 (Serverless SQL database)

**Build System:**
- npm workspaces (Monorepo management)
- Node.js 18+ (Required runtime)

**Content:**
- Markdown (Blog posts)
- Frontmatter (Metadata)
- OpenAI GPT-3.5 (Content generation)

### Why This Stack?

1. **Zero Monthly Cost:** Everything runs on free tiers
2. **Lightning Fast:** Astro generates static HTML
3. **SEO Friendly:** Pre-rendered pages, perfect for Google
4. **Scalable:** Cloudflare CDN handles traffic spikes
5. **Easy to Maintain:** Simple, no complex backend

---

## File Structure

### Root Level

```
services-api/
├── package.json           # Root package with scripts
├── .env.example           # Environment template
├── .env                   # Your secrets (gitignored)
├── .gitignore             # Git ignore rules
├── README.md              # Quick start guide
├── DEPLOYMENT.md          # Deployment guide
├── DOCUMENTATION.md       # This file
└── LICENSE                # MIT License
```

### Scripts

```
scripts/
├── setup.js               # One-time setup wizard
├── generate-content.js    # AI content generation
├── deploy-all.js          # Deploy all sites
├── seed-database.js       # Database schema
└── schema.sql             # Generated SQL schema
```

### Packages (Monorepo)

```
packages/
├── shared/                # Shared code
│   ├── src/
│   │   ├── utils/         # Helper functions
│   │   ├── components/    # Shared components
│   │   └── types/         # TypeScript types
│   └── package.json
│
├── swankyboyz/            # SwankyBoyz.com
│   ├── src/
│   │   ├── pages/         # Routes (.astro files)
│   │   │   └── index.astro
│   │   ├── layouts/       # Page templates
│   │   │   └── Layout.astro
│   │   ├── components/    # UI components
│   │   └── content/
│   │       └── blog/      # Blog posts (.md)
│   ├── astro.config.mjs   # Astro configuration
│   ├── tailwind.config.mjs # Tailwind configuration
│   ├── wrangler.toml      # Cloudflare config
│   └── package.json
│
├── vaughnsterlingtours/   # VaughnSterlingTours.com
│   └── [same structure]
│
└── vaughnsterling/        # VaughnSterling.com
    └── [same structure]
```

---

## Configuration

### Environment Variables

Located in `.env` at project root:

```bash
# OpenAI (Optional - for content generation)
OPENAI_API_KEY=sk-...

# Cloudflare (Required for deployment)
CLOUDFLARE_ACCOUNT_ID=abc123...
CLOUDFLARE_API_TOKEN=xyz789...

# Database (Optional - for dynamic features)
D1_DATABASE_ID=d1-id...

# Affiliates (Optional - for monetization)
AMAZON_ASSOCIATE_ID=yourname-20
AMAZON_ACCESS_KEY=...
AMAZON_SECRET_KEY=...

# Domains
SWANKYBOYZ_DOMAIN=swankyboyz.com
VAUGHNSTERLINGTOURS_DOMAIN=vaughnsterlingtours.com
VAUGHNSTERLING_DOMAIN=vaughnsterling.com

# Analytics (Optional)
GOOGLE_ANALYTICS_ID=G-...
CLOUDFLARE_WEB_ANALYTICS_TOKEN=...
```

### Astro Configuration

Each site has `astro.config.mjs`:

```javascript
import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import cloudflare from '@astrojs/cloudflare';

export default defineConfig({
  output: 'server',           // Enables SSR if needed
  adapter: cloudflare(),      // Cloudflare deployment
  integrations: [tailwind()], // Tailwind CSS
  site: 'https://domain.com', // Your domain
});
```

### Tailwind Configuration

Custom colors per site:

**SwankyBoyz:** Green theme
**VaughnSterlingTours:** Blue theme  
**VaughnSterling:** Purple theme

---

## Content Management

### Writing Blog Posts

Create `.md` files in `packages/[site]/src/content/blog/`:

```markdown
---
title: "How to Style a Capsule Wardrobe"
description: "Complete guide to building a minimalist wardrobe"
category: "fashion"
keywords: ["mens fashion", "capsule wardrobe", "minimalism"]
date: 2026-02-10
author: "Vaughn Sterling"
---

## Introduction

Your content here...

## Section 1

More content...

### Subsection

Even more content...
```

### Frontmatter Fields

- `title`: Post title (required)
- `description`: Meta description for SEO (required)
- `category`: Category slug (fashion, grooming, travel, etc.)
- `keywords`: Array of SEO keywords
- `date`: Publication date (YYYY-MM-DD)
- `author`: Author name

### Content Guidelines

**Length:** 800-1500 words ideal for SEO

**Structure:**
1. Catchy intro (2-3 paragraphs)
2. Multiple H2 sections (##)
3. Subsections with H3 (###)
4. Conclusion with CTA

**SEO Tips:**
- Include primary keyword in title
- Use keyword in first paragraph
- Add keyword to 2-3 subheadings
- Natural keyword density (1-2%)
- Internal links to other posts
- External links to authority sites

**Affiliate Links:**
- Use contextually
- Don't overdo it (1-3 per post)
- Add disclosure: "This post contains affiliate links"

### AI Content Generation

Run the generator:

```bash
npm run generate-content
```

This creates:
- 5 articles for SwankyBoyz
- 5 articles for VaughnSterlingTours
- 3 articles for VaughnSterling

**Cost:** ~$1-2 total

**Customization:**
1. Review generated content
2. Add your personal touch
3. Insert affiliate links
4. Add images (optional)
5. Adjust tone/style

---

## Deployment

### First-Time Setup

```bash
# 1. Install dependencies
npm run setup

# 2. Authenticate with Cloudflare
npm install -g wrangler
wrangler login

# 3. Create Pages projects
cd packages/swankyboyz && wrangler pages project create swankyboyz
cd ../vaughnsterlingtours && wrangler pages project create vaughnsterlingtours
cd ../vaughnsterling && wrangler pages project create vaughnsterling
cd ../..
```

### Deploy All Sites

```bash
npm run deploy:all
```

### Deploy Single Site

```bash
npm run deploy:swanky      # SwankyBoyz only
npm run deploy:tours       # Tours only
npm run deploy:personal    # Personal only
```

### Automatic Deployment (CI/CD)

Set up GitHub Actions for automatic deployment on push:

1. Go to GitHub repo → Settings → Secrets
2. Add secrets:
   - `CLOUDFLARE_API_TOKEN`
   - `CLOUDFLARE_ACCOUNT_ID`
3. Push to main branch
4. Sites auto-deploy

---

## Customization

### Changing Colors

Edit `tailwind.config.mjs` in each package:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        50: '#f0fdf4',   // Lightest
        100: '#dcfce7',
        500: '#22c55e',  // Base
        600: '#16a34a',
        700: '#15803d',  // Darkest
      },
    },
  },
}
```

### Adding New Pages

Create `.astro` file in `src/pages/`:

```astro
---
import Layout from '../layouts/Layout.astro';

const title = "About Us";
const description = "Learn more about SwankyBoyz";
---

<Layout title={title} description={description}>
  <h1>About Us</h1>
  <p>Content here...</p>
</Layout>
```

### Custom Components

Create reusable component:

```astro
---
// src/components/Button.astro
const { text, href } = Astro.props;
---

<a 
  href={href} 
  class="bg-primary-600 text-white px-6 py-3 rounded-lg hover:bg-primary-700"
>
  {text}
</a>
```

Use it:

```astro
---
import Button from '../components/Button.astro';
---

<Button text="Click Me" href="/contact" />
```

---

## Monetization

### Amazon Associates

1. **Sign Up:** https://affiliate-program.amazon.com
2. **Get Approved:** Need 3 sales within 180 days
3. **Add Links:** Use product linking tools

**Example:**

```markdown
Check out this [amazing watch](https://amazon.com/dp/B08XYZ?tag=yourname-20) 
that I personally use and recommend.
```

### Affiliate Link Helper

Use the shared utility:

```javascript
import { generateAffiliateLink } from '../../../shared/src/utils/index.js';

const link = generateAffiliateLink(
  'https://amazon.com/dp/B08XYZ',
  'yourname-20'
);
```

### Other Monetization

**Display Ads:**
- Google AdSense
- Ezoic
- Mediavine (need 50K sessions/month)

**Sponsored Content:**
- Charge brands for reviews
- R500-2000 per post

**Digital Products:**
- Ebooks
- Courses
- Templates

**Services:**
- Coaching
- Consulting
- Freelance writing

---

## SEO & Marketing

### On-Page SEO Checklist

- [ ] Unique titles (<60 chars)
- [ ] Meta descriptions (<160 chars)
- [ ] H1 tag on every page
- [ ] Alt text on images
- [ ] Clean URLs (no ?id=123)
- [ ] Internal linking
- [ ] Fast loading (<2s)
- [ ] Mobile responsive
- [ ] HTTPS enabled

### Technical SEO

**Sitemap:**
Astro auto-generates at `/sitemap.xml`

**Robots.txt:**
```
User-agent: *
Allow: /

Sitemap: https://domain.com/sitemap.xml
```

**Submit to Search Engines:**
- Google Search Console
- Bing Webmaster Tools

### Content Strategy

**Month 1: Foundation (10-15 articles)**
- Core topics
- Product roundups
- How-to guides

**Month 2: Expansion (15-20 more articles)**
- Long-tail keywords
- Comparison posts
- Personal stories

**Month 3: Optimization (Improve existing)**
- Update top posts
- Add more affiliate links
- Improve CTAs

### Promotion Tactics

**Social Media:**
- Pinterest (great for traffic)
- Instagram (lifestyle content)
- Twitter/X (engagement)
- Facebook groups

**SEO:**
- Target long-tail keywords
- Build backlinks
- Guest posting
- Forum participation

**Email Marketing:**
- Build list from day 1
- Weekly newsletter
- Exclusive content
- Affiliate promotions

---

## Troubleshooting

### Build Errors

**Error:** `Cannot find module '@astrojs/tailwind'`

**Fix:**
```bash
cd packages/swankyboyz
npm install
```

---

**Error:** `wrangler: command not found`

**Fix:**
```bash
npm install -g wrangler
```

---

### Deployment Errors

**Error:** `Authentication error`

**Fix:**
```bash
wrangler logout
wrangler login
```

---

**Error:** `Project not found`

**Fix:**
```bash
cd packages/swankyboyz
wrangler pages project create swankyboyz
```

---

### Runtime Errors

**Error:** Site loads but no styling

**Fix:**
```bash
npm run build:swanky
npm run deploy:swanky
```

---

**Error:** 404 on blog posts

**Fix:**
Check markdown files exist in `src/content/blog/`

---

### Performance Issues

**Slow loading:**
- Optimize images (use WebP)
- Minimize JavaScript
- Enable Cloudflare caching

**High bandwidth:**
- Compress images
- Use lazy loading
- Enable Cloudflare compression

---

## Advanced Features

### Adding Comments (with D1)

1. Set up D1 database
2. Create API endpoint in `src/pages/api/comments.js`
3. Add form to blog post template
4. Store comments in D1

### Newsletter Signup

1. Create D1 table for subscribers
2. Add signup form
3. Create API endpoint to save emails
4. Export to email service (Mailchimp, etc.)

### Analytics Dashboard

1. Use Cloudflare Analytics API
2. Create admin page
3. Display traffic stats
4. Track affiliate clicks

---

## Maintenance

### Weekly Tasks
- [ ] Check analytics
- [ ] Respond to comments
- [ ] Share new content
- [ ] Check affiliate links

### Monthly Tasks
- [ ] Update old content
- [ ] Optimize top posts
- [ ] Check broken links
- [ ] Review earnings

### Quarterly Tasks
- [ ] Content audit
- [ ] SEO review
- [ ] Competitor analysis
- [ ] Strategy adjustment

---

## Resources

### Official Docs
- [Astro](https://docs.astro.build)
- [Cloudflare Pages](https://developers.cloudflare.com/pages/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Wrangler CLI](https://developers.cloudflare.com/workers/wrangler/)

### Learning
- [Astro Tutorial](https://docs.astro.build/en/tutorial/)
- [SEO Guide](https://moz.com/beginners-guide-to-seo)
- [Affiliate Marketing](https://www.authorityhacker.com/)

### Tools
- [Ahrefs](https://ahrefs.com) - SEO research
- [Canva](https://canva.com) - Graphics
- [Unsplash](https://unsplash.com) - Free images
- [Grammarly](https://grammarly.com) - Writing

---

## Support

If you need help:

1. Check this documentation
2. Review DEPLOYMENT.md
3. Check inline code comments
4. Search Astro/Cloudflare docs
5. Ask in Astro Discord

---

**Good luck with your sites, Vaughn! 🚀**
