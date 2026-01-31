# ❓ Frequently Asked Questions

## General Questions

### What is this project?

A complete monorepo setup for three production-ready websites optimized for Cloudflare's free tier:
- SwankyBoyz.com (men's lifestyle & affiliate marketing)
- VaughnSterlingTours.com (digital nomad travel blog)
- VaughnSterling.com (personal portfolio)

### How much does it cost to run?

**R0 per month!** Everything runs on Cloudflare's free tier:
- Cloudflare Pages: Free (500 builds/month)
- Cloudflare D1: Free (5GB storage)
- Cloudflare Workers: Free (100K requests/day per site)

Only one-time costs:
- Domain registration: ~R200-300/year per domain
- AI content generation: ~$1-2 one-time (optional)

### Do I need coding experience?

Basic familiarity with command line is helpful, but step-by-step guides are provided. If you can:
- Copy/paste commands
- Edit text files
- Follow instructions

You can get this running!

---

## Setup Questions

### Why won't `npm run setup` work?

Common issues:

**Node.js not installed:**
```bash
# Check if Node is installed
node --version

# Should show v18 or higher
# Download from: https://nodejs.org
```

**Wrong directory:**
```bash
# Make sure you're in the project root
cd services-api
npm run setup
```

**Permission errors:**
```bash
# On Linux/Mac, try:
sudo npm run setup
```

### How do I get an OpenAI API key?

1. Go to https://platform.openai.com
2. Sign up (free $5 credit for new users)
3. Click on API Keys
4. Create new secret key
5. Copy and add to `.env` file

**Note:** Content generation is optional. You can write posts manually.

### What if I don't have a Cloudflare account?

1. Go to https://cloudflare.com
2. Sign up (free, no credit card required)
3. Verify email
4. You're ready to deploy!

---

## Content Questions

### How do I add a new blog post?

Create a `.md` file in the appropriate folder:

**SwankyBoyz:**
`packages/swankyboyz/src/content/blog/your-post.md`

**VaughnSterlingTours:**
`packages/vaughnsterlingtours/src/content/blog/your-post.md`

**VaughnSterling:**
`packages/vaughnsterling/src/content/blog/your-post.md`

Use this format:
```markdown
---
title: "Your Title"
description: "Brief description"
category: "category-name"
keywords: ["keyword1", "keyword2"]
date: 2026-02-01
author: "Your Name"
---

Your content here...
```

### Can I customize the AI-generated content?

**Yes!** In fact, you should:
1. Run `npm run generate-content`
2. Review generated articles in `packages/*/src/content/blog/`
3. Edit to add your personal voice
4. Add specific product recommendations
5. Insert affiliate links
6. Add images (optional)

### How do I add images to posts?

1. Put images in `packages/[site]/public/images/`
2. Reference in markdown:
```markdown
![Alt text](/images/your-image.jpg)
```

---

## Deployment Questions

### How long does deployment take?

- **First deployment:** 5-10 minutes per site
- **Subsequent deploys:** 2-3 minutes per site
- **All three sites:** 15-30 minutes total

### Can I deploy from an internet café?

**Yes!** The setup is designed for this:
1. All work is local (no need to stay connected)
2. Deploy only when ready
3. Use `wrangler login` once, stays authenticated

Total time needed: ~1 hour

### What if deployment fails?

**Check authentication:**
```bash
wrangler whoami
```

**Re-authenticate:**
```bash
wrangler logout
wrangler login
```

**Rebuild and retry:**
```bash
npm run build:swanky
npm run deploy:swanky
```

### How do I add my custom domain?

1. Make sure your domain is added to Cloudflare
2. Go to Cloudflare Dashboard → Pages
3. Click your project
4. Custom Domains → Set up a custom domain
5. Enter your domain (e.g., `swankyboyz.com`)
6. Click "Activate domain"
7. DNS is auto-configured if domain is on Cloudflare

---

## Monetization Questions

### When can I start earning?

**Immediately after deployment!** Add affiliate links to your posts and start promoting.

**Realistic timeline:**
- Month 1: R500-2000 (building traffic)
- Month 2: R2000-5000 (traffic growing)
- Month 3+: R5000-15000+ (established traffic)

### How do I add affiliate links?

**Amazon Associates:**
1. Sign up at https://affiliate-program.amazon.com
2. Get your affiliate ID (e.g., `yourname-20`)
3. Add to `.env`:
```
AMAZON_ASSOCIATE_ID=yourname-20
```
4. Use in posts:
```markdown
Check out this [product](https://amazon.com/dp/B08XYZ?tag=yourname-20)
```

**Or use the helper:**
```javascript
import { generateAffiliateLink } from '@vaughn/shared/utils';
const link = generateAffiliateLink('https://amazon.com/dp/B08XYZ', 'yourname-20');
```

### What other monetization options exist?

- **Display ads:** Google AdSense, Ezoic
- **Sponsored posts:** R500-2000 per post
- **Digital products:** Ebooks, courses
- **Services:** Coaching, consulting
- **Email list:** Build and promote to subscribers

---

## Technical Questions

### Can I use a different framework?

The sites use Astro because it's:
- Fast (static generation)
- SEO-friendly (pre-rendered HTML)
- Easy to use (similar to HTML)
- Free to host (on Cloudflare)

You could rebuild with Next.js, Gatsby, etc., but Astro is optimal for this use case.

### Can I add a backend/database?

**Yes!** Cloudflare D1 is included:
1. Run `npm run seed` to see schema
2. Create D1 database: `wrangler d1 create mydb`
3. Initialize: `wrangler d1 execute mydb --file=scripts/schema.sql`
4. Bind to Pages in Cloudflare dashboard

Use for:
- Comments
- Newsletter signups
- Analytics
- User accounts

### How do I add a contact form?

Create an API endpoint using Cloudflare Workers:

`packages/swankyboyz/src/pages/api/contact.js`:
```javascript
export async function post({ request }) {
  const data = await request.formData();
  // Process form data
  // Send email via Cloudflare Workers
  return new Response(JSON.stringify({ success: true }));
}
```

---

## Traffic & SEO Questions

### How do I get traffic to my sites?

**SEO (Long-term, free):**
- Write 2-3 posts per week
- Target long-tail keywords
- Build backlinks
- Submit sitemap to Google

**Social Media (Short-term):**
- Share on Pinterest (best for traffic)
- Post on Instagram
- Engage on Twitter/X
- Join Facebook groups

**Paid (Fast, costs money):**
- Google Ads
- Facebook Ads
- Pinterest Ads

**Content Strategy:**
Start with 10-15 articles, then optimize based on analytics.

### How long until I rank on Google?

- **New site:** 3-6 months
- **With backlinks:** 1-3 months
- **Long-tail keywords:** 2-4 weeks

**Accelerate with:**
- Quality content
- Internal linking
- Guest posting
- Social signals

### What keywords should I target?

**SwankyBoyz:**
- "best [product] for men under $X"
- "how to [style/groom] guide"
- "[product] vs [product] comparison"

**VaughnSterlingTours:**
- "[city] digital nomad guide"
- "budget travel tips for [destination]"
- "remote work in [location]"

Use tools:
- Google Keyword Planner (free)
- Ahrefs (paid, but powerful)
- Answer The Public (free)

---

## Maintenance Questions

### How often should I update?

**Content:**
- 2-3 new posts per week (ideal)
- 1 post per week (minimum)

**Existing posts:**
- Update top 10 posts quarterly
- Check affiliate links monthly
- Fix broken links as found

**Technical:**
- Update dependencies monthly: `npm update`
- Redeploy after updates: `npm run deploy:all`

### How do I back up my content?

Content is in Git, so it's automatically backed up:
```bash
git push  # Backs up to GitHub
```

**Extra safety:**
- Clone to multiple computers
- Export markdown files to Dropbox/Drive
- Database: Export from Cloudflare D1 dashboard

---

## Scaling Questions

### What happens if I exceed free tier limits?

**Cloudflare Pages (500 builds/month):**
- You'll need Pages Pro ($20/month)
- Only happens if rebuilding 16+ times per day

**Cloudflare Workers (100K requests/day per site):**
- Upgrade to Workers Paid ($5/month)
- Covers 10M requests/month

**Cloudflare D1 (5M reads/day):**
- Very hard to exceed on blog site
- Upgrade available if needed

**Reality:** You'll likely make R10,000+/month before hitting limits!

### Can I add more sites?

**Yes!** Copy an existing package:
```bash
cp -r packages/swankyboyz packages/newsite
# Update package.json, astro.config.mjs
# Add scripts to root package.json
```

---

## Support & Resources

### Where can I get help?

1. **Documentation:** Read DEPLOYMENT.md and DOCUMENTATION.md
2. **Astro Discord:** https://astro.build/chat
3. **Cloudflare Discord:** https://discord.cloudflare.com
4. **GitHub Issues:** Open an issue in the repo

### Useful resources?

- **Astro Docs:** https://docs.astro.build
- **Cloudflare Docs:** https://developers.cloudflare.com
- **Affiliate Marketing:** https://www.authorityhacker.com
- **SEO Guide:** https://moz.com/beginners-guide-to-seo
- **Content Writing:** https://copyblogger.com

---

## Common Errors

### "Cannot find module"

```bash
# Reinstall dependencies
npm run setup
```

### "Build failed"

```bash
# Check for syntax errors in your files
# Look at the error message for file name
# Fix the error and rebuild
npm run build:swanky
```

### "Deployment authentication failed"

```bash
wrangler logout
wrangler login
```

### "Port already in use"

```bash
# Kill the process using the port
# On Mac/Linux:
lsof -ti:4321 | xargs kill

# Or use a different port:
cd packages/swankyboyz
astro dev --port 4325
```

---

**Still have questions? Open an issue on GitHub!**
