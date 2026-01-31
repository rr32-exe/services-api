#!/usr/bin/env node

/**
 * 🤖 AI Content Generation Script
 * 
 * Generates articles for all three sites using OpenAI API
 */

require('dotenv').config();
const fs = require('fs');
const path = require('path');

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

if (!OPENAI_API_KEY) {
  console.error('❌ Error: OPENAI_API_KEY not found in .env file');
  process.exit(1);
}

// Content templates for each site
const contentTemplates = {
  swankyboyz: [
    {
      title: 'Best Men\'s Grooming Products for 2026',
      category: 'grooming',
      keywords: ['mens grooming', 'skincare', 'beard care', 'styling products']
    },
    {
      title: 'Top 10 Watches Under $500',
      category: 'fashion',
      keywords: ['mens watches', 'affordable watches', 'style', 'accessories']
    },
    {
      title: 'Ultimate Guide to Building a Capsule Wardrobe',
      category: 'fashion',
      keywords: ['mens fashion', 'wardrobe essentials', 'style guide', 'minimalism']
    },
    {
      title: 'Best Fitness Supplements for Men',
      category: 'fitness',
      keywords: ['supplements', 'fitness', 'nutrition', 'muscle building']
    },
    {
      title: 'Top EDC Items Every Man Should Carry',
      category: 'lifestyle',
      keywords: ['EDC', 'everyday carry', 'gear', 'mens accessories']
    }
  ],
  vaughnsterlingtours: [
    {
      title: 'Digital Nomad Guide: Cape Town, South Africa',
      category: 'travel',
      keywords: ['digital nomad', 'cape town', 'south africa', 'remote work']
    },
    {
      title: 'Budget Travel Tips for Solo Travelers',
      category: 'travel',
      keywords: ['budget travel', 'solo travel', 'travel tips', 'backpacking']
    },
    {
      title: 'Best Co-Working Spaces in Africa',
      category: 'remote-work',
      keywords: ['coworking', 'remote work', 'africa', 'digital nomad']
    },
    {
      title: 'How to Make Money While Traveling',
      category: 'remote-work',
      keywords: ['remote work', 'travel income', 'online business', 'freelancing']
    },
    {
      title: 'My Journey: From Corporate to Digital Nomad',
      category: 'personal',
      keywords: ['digital nomad', 'career change', 'lifestyle', 'personal story']
    }
  ],
  vaughnsterling: [
    {
      title: 'About Vaughn Sterling',
      category: 'about',
      keywords: ['personal brand', 'biography', 'professional', 'portfolio']
    },
    {
      title: 'My Services',
      category: 'services',
      keywords: ['consulting', 'services', 'expertise', 'professional']
    },
    {
      title: 'Portfolio Showcase',
      category: 'portfolio',
      keywords: ['projects', 'work', 'portfolio', 'achievements']
    }
  ]
};

async function generateArticle(site, template) {
  console.log(`\n📝 Generating: ${template.title} for ${site}...`);
  
  const prompt = `Write a comprehensive, SEO-optimized blog post about "${template.title}".

Guidelines:
- Write in an engaging, conversational tone
- Include practical tips and actionable advice
- Aim for 800-1200 words
- Include product recommendations where appropriate (for affiliate links)
- Use proper markdown formatting with headings (##, ###)
- Include a compelling introduction and conclusion
- Keywords to naturally include: ${template.keywords.join(', ')}

Format the output as valid markdown.`;

  try {
    // Using fetch API (Node 18+)
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are an expert content writer who creates engaging, SEO-optimized blog posts.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 2000,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    const content = data.choices[0].message.content;

    // Create frontmatter
    const frontmatter = `---
title: "${template.title}"
description: "${template.title}"
category: "${template.category}"
keywords: [${template.keywords.map(k => `"${k}"`).join(', ')}]
date: ${new Date().toISOString().split('T')[0]}
author: "Vaughn Sterling"
---

`;

    const fullContent = frontmatter + content;

    // Save to file
    const contentDir = path.join(__dirname, '..', 'packages', site, 'src', 'content', 'blog');
    if (!fs.existsSync(contentDir)) {
      fs.mkdirSync(contentDir, { recursive: true });
    }

    const filename = template.title.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
    
    const filepath = path.join(contentDir, `${filename}.md`);
    fs.writeFileSync(filepath, fullContent);

    console.log(`✅ Saved to: ${filepath}`);
    
    // Add delay to respect rate limits
    await new Promise(resolve => setTimeout(resolve, 2000));
    
  } catch (error) {
    console.error(`❌ Error generating article: ${error.message}`);
  }
}

async function main() {
  console.log('🤖 Starting AI Content Generation...\n');
  console.log('⚠️  Note: This will use OpenAI API credits');
  console.log('Estimated cost: $0.50-$2.00 depending on content length\n');

  for (const [site, templates] of Object.entries(contentTemplates)) {
    console.log(`\n🌐 Generating content for ${site}...`);
    
    for (const template of templates) {
      await generateArticle(site, template);
    }
  }

  console.log('\n\n✅ Content generation complete!');
  console.log('\n📚 Next steps:');
  console.log('1. Review generated content in packages/*/src/content/blog/');
  console.log('2. Edit articles to add your personal touch');
  console.log('3. Add affiliate links where appropriate');
  console.log('4. Build and preview sites: npm run dev:*');
}

main().catch(console.error);
