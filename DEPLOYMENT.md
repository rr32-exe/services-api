# 🚀 DEPLOYMENT GUIDE

## Complete Step-by-Step Deployment to Cloudflare Free Tier

This guide will walk you through deploying all three sites to Cloudflare Pages with zero monthly costs.

### Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Cloudflare account created (free)
- [ ] Domains registered (SwankyBoyz.com, VaughnSterlingTours.com, VaughnSterling.com)
- [ ] OpenAI API key (optional, for content generation)

---

## PART 1: Initial Setup (5 minutes)

### Step 1: Install Dependencies

```bash
npm run setup
```

This will:
- Create `.env` file from template
- Install all dependencies for all packages
- Display next steps

### Step 2: Configure Environment

Edit `.env` file with your credentials:

```bash
# Required for deployment
CLOUDFLARE_ACCOUNT_ID=your_account_id_here
CLOUDFLARE_API_TOKEN=your_api_token_here

# Optional for content generation
OPENAI_API_KEY=your_openai_key_here

# Optional for affiliates
AMAZON_ASSOCIATE_ID=your_amazon_id
```

**Getting Cloudflare Credentials:**

1. Log into Cloudflare Dashboard
2. Go to "My Profile" → "API Tokens"
3. Create Token → "Edit Cloudflare Workers" template
4. Copy Account ID from the right sidebar
5. Copy API Token after creation

---

## PART 2: Content Generation (10 minutes)

### Option A: AI-Generated Content

Generate 13 SEO-optimized articles:

```bash
npm run generate-content
```

**Cost:** ~$1-2 in OpenAI credits
**Output:** 5 articles for SwankyBoyz, 5 for Tours, 3 for Personal site

### Option B: Write Your Own Content

Create markdown files in:
- `packages/swankyboyz/src/content/blog/`
- `packages/vaughnsterlingtours/src/content/blog/`
- `packages/vaughnsterling/src/content/blog/`

Format:
```markdown
---
title: "Article Title"
description: "Description"
category: "category-name"
keywords: ["keyword1", "keyword2"]
date: 2026-01-31
author: "Vaughn Sterling"
---

Your content here...
```

---

## PART 3: Local Testing (10 minutes)

Test each site locally before deploying:

### Terminal 1: SwankyBoyz
```bash
npm run dev:swanky
```
Visit: http://localhost:4321

### Terminal 2: VaughnSterlingTours
```bash
npm run dev:tours
```
Visit: http://localhost:4322

### Terminal 3: VaughnSterling
```bash
npm run dev:personal
```
Visit: http://localhost:4323

**Check:**
- [ ] Home page loads correctly
- [ ] Navigation works
- [ ] Blog posts display (if generated)
- [ ] Design looks good on mobile
- [ ] No console errors

---

## PART 4: Cloudflare Setup (15 minutes)

### Step 1: Install Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

Follow browser prompts to authenticate.

### Step 2: Create Pages Projects

Create three projects in Cloudflare:

```bash
cd packages/swankyboyz
wrangler pages project create swankyboyz

cd ../vaughnsterlingtours
wrangler pages project create vaughnsterlingtours

cd ../vaughnsterling
wrangler pages project create vaughnsterling

cd ../..
```

### Step 3: Build All Sites

```bash
npm run build:all
```

This compiles all three sites into production-ready static files.

### Step 4: Deploy All Sites

```bash
npm run deploy:all
```

This will deploy all three sites to Cloudflare Pages.

**Expected Output:**
```
✅ SwankyBoyz deployed successfully!
   https://swankyboyz.pages.dev

✅ VaughnSterlingTours deployed successfully!
   https://vaughnsterlingtours.pages.dev

✅ VaughnSterling deployed successfully!
   https://vaughnsterling.pages.dev
```

---

## PART 5: Custom Domains (10 minutes)

For each site, add your custom domain:

### SwankyBoyz.com

1. Go to Cloudflare Dashboard → Pages
2. Click "swankyboyz" project
3. Go to "Custom domains" tab
4. Click "Set up a custom domain"
5. Enter: `swankyboyz.com`
6. Click "Activate domain"
7. Add DNS record (auto-configured if domain is on Cloudflare)

Repeat for:
- `www.swankyboyz.com`

### VaughnSterlingTours.com

Same process:
- `vaughnsterlingtours.com`
- `www.vaughnsterlingtours.com`

### VaughnSterling.com

Same process:
- `vaughnsterling.com`
- `www.vaughnsterling.com`

---

## PART 6: Database Setup (Optional, 5 minutes)

If you want comments, analytics, or newsletter features:

### Create D1 Database

```bash
wrangler d1 create vaughn-sites-db
```

Copy the database ID shown in output.

### Add to .env

```bash
D1_DATABASE_ID=the_database_id_from_above
```

### Initialize Database

```bash
npm run seed
wrangler d1 execute vaughn-sites-db --file=scripts/schema.sql
```

### Bind to Pages Projects

For each site:
1. Go to Pages project in dashboard
2. Settings → Functions
3. D1 Database Bindings
4. Add binding: `DB` → `vaughn-sites-db`

---

## PART 7: Analytics Setup (Optional, 5 minutes)

### Enable Cloudflare Web Analytics

1. Cloudflare Dashboard → Analytics → Web Analytics
2. Click "Add a site"
3. Enter site name (e.g., "SwankyBoyz")
4. Copy the token
5. Add to your site's HTML (already configured in layouts)

Repeat for all three sites.

---

## VERIFICATION CHECKLIST

### All Sites Working?

- [ ] SwankyBoyz.com loads (or .pages.dev URL)
- [ ] VaughnSterlingTours.com loads
- [ ] VaughnSterling.com loads
- [ ] All sites have HTTPS (green lock)
- [ ] Mobile responsive
- [ ] Fast page loads (<2 seconds)
- [ ] Navigation works
- [ ] Blog posts display

### SEO Basics?

- [ ] Each page has unique title
- [ ] Meta descriptions present
- [ ] Images have alt text
- [ ] URLs are clean (no .html)
- [ ] Sitemap.xml generated

---

## TROUBLESHOOTING

### Build Fails

```bash
# Clear everything and reinstall
rm -rf node_modules packages/*/node_modules
npm run setup
```

### Deployment Fails

```bash
# Check authentication
wrangler whoami

# Re-authenticate
wrangler logout
wrangler login
```

### Site Not Loading

1. Check build succeeded: `npm run build:swanky`
2. Check deployment status in Cloudflare dashboard
3. Wait 2-3 minutes for DNS propagation
4. Clear browser cache

### Content Not Showing

1. Verify markdown files exist in `src/content/blog/`
2. Check frontmatter format is correct
3. Rebuild: `npm run build:swanky`
4. Redeploy: `npm run deploy:swanky`

---

## DEPLOYMENT COMMANDS REFERENCE

```bash
# Setup (run once)
npm run setup

# Content
npm run generate-content

# Development
npm run dev:swanky        # SwankyBoyz local
npm run dev:tours         # Tours local
npm run dev:personal      # Personal local

# Build
npm run build:all         # Build all sites
npm run build:swanky      # Build SwankyBoyz only
npm run build:tours       # Build Tours only
npm run build:personal    # Build Personal only

# Deploy
npm run deploy:all        # Deploy all sites
npm run deploy:swanky     # Deploy SwankyBoyz only
npm run deploy:tours      # Deploy Tours only
npm run deploy:personal   # Deploy Personal only

# Database
npm run seed              # Create database schema
```

---

## COST BREAKDOWN (All Free Tier!)

### Cloudflare Pages (Free Tier)
- 500 builds/month (16 per site)
- Unlimited requests
- 100GB bandwidth
- **Cost: R0/month**

### Cloudflare D1 (Free Tier)
- 5GB storage
- 5M reads/day
- 100K writes/day
- **Cost: R0/month**

### Cloudflare Workers (Free Tier)
- 100K requests/day per site
- **Cost: R0/month**

### Domain Registration
- Already purchased (8 months remaining)
- **Cost: R0/month**

### OpenAI (One-time)
- Content generation: ~$1-2 one-time
- **Monthly cost: R0**

### TOTAL MONTHLY COST: **R0** (FREE!)

---

## POST-DEPLOYMENT CHECKLIST

### Week 1: Content & SEO

- [ ] Customize AI-generated content
- [ ] Add your personal touch to articles
- [ ] Insert affiliate links
- [ ] Submit sitemaps to Google Search Console
- [ ] Set up Google Analytics (optional)

### Week 2: Monetization

- [ ] Apply for Amazon Associates (if not done)
- [ ] Add affiliate links to relevant articles
- [ ] Set up newsletter (using D1 database)
- [ ] Create lead magnets

### Week 3: Promotion

- [ ] Share on social media
- [ ] Post in relevant Reddit communities
- [ ] Engage in Facebook groups
- [ ] Start email list building

### Week 4: Optimization

- [ ] Check analytics
- [ ] Optimize high-traffic pages
- [ ] Add more content
- [ ] Test conversion rates

---

## SCALING UP

When you exceed free tier limits (good problem to have!):

### Cloudflare Pages Pro ($20/month)
- 5,000 builds/month
- Priority support
- Only needed when building > 500x/month

### When to Upgrade?
- **Month 1-3:** Stay on free tier
- **Month 4+:** Evaluate based on traffic
- **Threshold:** >100K visits/day = consider upgrading

---

## SUPPORT & RESOURCES

- **Astro Docs:** https://docs.astro.build
- **Cloudflare Pages:** https://pages.cloudflare.com
- **Wrangler CLI:** https://developers.cloudflare.com/workers/wrangler/
- **This README:** Full feature documentation

---

## SUCCESS! 🎉

Your three sites are now live on Cloudflare's free tier!

**Next step:** Start creating content and promoting your sites to hit that R5,000-15,000/month target!

Good luck, Vaughn! 🚀
