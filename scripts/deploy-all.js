#!/usr/bin/env node

/**
 * 🚀 Deploy All Sites to Cloudflare Pages
 */

require('dotenv').config();
const { execSync } = require('child_process');
const path = require('path');

const sites = [
  { name: 'SwankyBoyz', package: 'swankyboyz', domain: process.env.SWANKYBOYZ_DOMAIN },
  { name: 'VaughnSterlingTours', package: 'vaughnsterlingtours', domain: process.env.VAUGHNSTERLINGTOURS_DOMAIN },
  { name: 'VaughnSterling', package: 'vaughnsterling', domain: process.env.VAUGHNSTERLING_DOMAIN }
];

console.log('🚀 Deploying all sites to Cloudflare Pages...\n');

for (const site of sites) {
  console.log(`\n📦 Deploying ${site.name} (${site.domain})...`);
  
  try {
    const pkgPath = path.join(__dirname, '..', 'packages', site.package);
    
    // Build the site
    console.log(`Building ${site.name}...`);
    execSync('npm run build', { stdio: 'inherit', cwd: pkgPath });
    
    // Deploy to Cloudflare Pages
    console.log(`Deploying ${site.name} to Cloudflare...`);
    execSync('npm run deploy', { stdio: 'inherit', cwd: pkgPath });
    
    console.log(`✅ ${site.name} deployed successfully!`);
    
  } catch (error) {
    console.error(`❌ Error deploying ${site.name}:`, error.message);
  }
}

console.log('\n\n🎉 All sites deployed!\n');
console.log('📊 Check your Cloudflare Pages dashboard for deployment status.');
console.log('🌐 Your sites will be live at:');
sites.forEach(site => {
  console.log(`   - https://${site.domain}`);
});
