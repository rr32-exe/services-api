# 🎯 Quick Start Guide - 5 Minutes to Local Development

## TL;DR - Get Running Fast

```bash
# 1. Install everything (2 min)
npm run setup

# 2. Pick a site and run it (30 sec)
npm run dev:swanky        # → http://localhost:4321
npm run dev:tours         # → http://localhost:4322
npm run dev:personal      # → http://localhost:4323
```

That's it! Your site is running locally.

---

## Full Setup (Internet Café Ready - 1 Hour Total)

### Phase 1: Local Setup (15 min)

```bash
# Clone repo (if not done)
cd services-api

# Install dependencies
npm run setup

# Create .env file (it's auto-created, just edit it)
nano .env
```

Add your OpenAI key to `.env` (optional, for content generation):
```
OPENAI_API_KEY=sk-your-key-here
```

### Phase 2: Generate Content (10 min)

```bash
# Generate 13 articles using AI
npm run generate-content

# Wait ~5-10 minutes (it generates one by one)
# Cost: ~$1-2 in OpenAI credits
```

**OR** skip AI and write your own posts in:
- `packages/swankyboyz/src/content/blog/`
- `packages/vaughnsterlingtours/src/content/blog/`
- `packages/vaughnsterling/src/content/blog/`

### Phase 3: Test Locally (10 min)

Open 3 terminals (or test one by one):

```bash
# Terminal 1
npm run dev:swanky

# Terminal 2  
npm run dev:tours

# Terminal 3
npm run dev:personal
```

Visit:
- SwankyBoyz: http://localhost:4321
- Tours: http://localhost:4322
- Personal: http://localhost:4323

Check everything looks good!

### Phase 4: Deploy to Cloudflare (25 min)

```bash
# Install Cloudflare CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login
# (Opens browser, click "Allow")

# Create projects
cd packages/swankyboyz
wrangler pages project create swankyboyz

cd ../vaughnsterlingtours  
wrangler pages project create vaughnsterlingtours

cd ../vaughnsterling
wrangler pages project create vaughnsterling

cd ../..

# Build and deploy ALL sites
npm run deploy:all
```

**Done!** Your sites are live at:
- `https://swankyboyz.pages.dev`
- `https://vaughnsterlingtours.pages.dev`
- `https://vaughnsterling.pages.dev`

### Phase 5: Add Custom Domains (Optional, 10 min)

1. Go to Cloudflare Dashboard → Pages
2. Click each project
3. Go to "Custom domains"
4. Add your domain (e.g., `swankyboyz.com`)
5. Follow DNS setup (auto if domain on Cloudflare)

---

## Troubleshooting

**"npm: command not found"**
```bash
# Install Node.js from https://nodejs.org
# Verify:
node --version  # Should show v18 or higher
```

**"wrangler: command not found"**
```bash
npm install -g wrangler
```

**Build errors**
```bash
# Clear and reinstall
rm -rf node_modules packages/*/node_modules
npm run setup
```

**Authentication error**
```bash
wrangler logout
wrangler login
```

---

## Commands Cheat Sheet

```bash
# Setup & Install
npm run setup                    # One-time setup

# Content Generation
npm run generate-content         # Generate AI articles

# Local Development  
npm run dev:swanky              # SwankyBoyz
npm run dev:tours               # VaughnSterlingTours
npm run dev:personal            # VaughnSterling

# Build
npm run build:all               # Build all sites
npm run build:swanky            # Build one site

# Deploy
npm run deploy:all              # Deploy all sites
npm run deploy:swanky           # Deploy one site

# Database
npm run seed                    # Show D1 schema
```

---

## What's Where?

```
📁 packages/
  📁 swankyboyz/              ← SwankyBoyz.com
    📁 src/
      📁 pages/               ← Add new pages here
        📄 index.astro        ← Home page
      📁 layouts/             ← Page templates
      📁 content/blog/        ← Blog posts (markdown)
  
  📁 vaughnsterlingtours/     ← VaughnSterlingTours.com
    [same structure]
  
  📁 vaughnsterling/          ← VaughnSterling.com
    [same structure]

📁 scripts/
  📄 setup.js                 ← Run this first
  📄 generate-content.js      ← AI content generator
  📄 deploy-all.js            ← Deploy everything

📄 .env                       ← Your API keys (create from .env.example)
📄 README.md                  ← Overview
📄 DEPLOYMENT.md              ← Detailed deploy guide
📄 DOCUMENTATION.md           ← Full docs
```

---

## Next Steps After Deployment

1. **Customize content**
   - Edit AI-generated articles
   - Add your personal touch
   - Insert affiliate links

2. **Set up analytics**
   - Cloudflare Web Analytics (free)
   - Google Analytics (optional)

3. **Apply for Amazon Associates**
   - Need 3 sales within 180 days
   - Add your affiliate ID to `.env`

4. **Promote your sites**
   - Social media
   - Reddit
   - Facebook groups
   - SEO optimization

5. **Create more content**
   - 2-3 posts per week
   - Focus on long-tail keywords
   - Build backlinks

---

## Support

- 📖 **Full docs**: DOCUMENTATION.md
- 🚀 **Deployment**: DEPLOYMENT.md
- 💬 **Astro help**: https://astro.build/chat
- ☁️ **Cloudflare help**: https://discord.cloudflare.com

---

**Ready to make R5,000-15,000/month? Let's go! 🚀**
