# 🚀 Vaughn Sites - Complete 3-Domain Setup

A monorepo containing three production-ready websites optimized for Cloudflare's free tier:

1. **SwankyBoyz.com** - Men's lifestyle & affiliate marketing site
2. **VaughnSterlingTours.com** - Digital nomad travel blog
3. **VaughnSterling.com** - Personal brand & portfolio

## ✨ Features

- **Astro Framework** - Fast, SEO-friendly static site generation
- **Cloudflare Pages** - Free hosting with global CDN
- **Cloudflare D1** - Serverless SQL database (free tier)
- **AI Content Generation** - OpenAI-powered article creation
- **Tailwind CSS** - Modern, responsive design
- **Affiliate Ready** - Amazon Associates integration
- **Newsletter** - Built-in email capture
- **Analytics** - Cloudflare Web Analytics

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Cloudflare account (free tier)
- OpenAI API key (optional, for content generation)

### Installation

1. **Clone and Install**
```bash
npm run setup
```

2. **Configure Environment**
```bash
# Copy .env.example to .env and edit with your API keys
cp .env.example .env
```

3. **Generate Content** (Optional)
```bash
npm run generate-content
```

4. **Development**
```bash
# Run individual sites
npm run dev:swanky      # http://localhost:4321
npm run dev:tours       # http://localhost:4322
npm run dev:personal    # http://localhost:4323
```

## 🌐 Deployment to Cloudflare

```bash
# Deploy all sites at once
npm run deploy:all

# Or deploy individually
npm run deploy:swanky
npm run deploy:tours
npm run deploy:personal
```

## 📚 Full Documentation

See the complete setup guide, deployment instructions, and troubleshooting in the inline documentation.

## 💰 Cloudflare Free Tier

All three sites fit comfortably within Cloudflare's free tier limits.

---

**Built with ❤️ for Vaughn Sterling** - Ready to launch! 🚀
