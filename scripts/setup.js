#!/usr/bin/env node

/**
 * 🚀 One-Time Setup Wizard for Vaughn Sites
 * 
 * This script helps you configure all three sites:
 * - SwankyBoyz.com
 * - VaughnSterlingTours.com
 * - VaughnSterling.com
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 Welcome to Vaughn Sites Setup Wizard!\n');

// Check if .env exists
const envPath = path.join(__dirname, '..', '.env');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('📋 Creating .env file from .env.example...');
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ .env file created! Please edit it with your API keys.\n');
} else {
  console.log('✅ .env file already exists.\n');
}

console.log('📦 Installing dependencies...\n');

try {
  // Install root dependencies
  console.log('Installing root dependencies...');
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });

  // Install each package
  const packages = ['swankyboyz', 'vaughnsterlingtours', 'vaughnsterling', 'shared'];
  
  for (const pkg of packages) {
    const pkgPath = path.join(__dirname, '..', 'packages', pkg);
    if (fs.existsSync(pkgPath)) {
      console.log(`\nInstalling dependencies for ${pkg}...`);
      execSync('npm install', { stdio: 'inherit', cwd: pkgPath });
    }
  }

  console.log('\n✅ All dependencies installed!\n');
  
  console.log('📚 Next Steps:\n');
  console.log('1. Edit .env file with your API keys:');
  console.log('   - OpenAI API key (for content generation)');
  console.log('   - Cloudflare credentials (for deployment)');
  console.log('   - Amazon Associate ID (for affiliate links)\n');
  console.log('2. Generate initial content:');
  console.log('   npm run generate-content\n');
  console.log('3. Start development server:');
  console.log('   npm run dev:swanky (for SwankyBoyz)');
  console.log('   npm run dev:tours (for VaughnSterlingTours)');
  console.log('   npm run dev:personal (for VaughnSterling)\n');
  console.log('4. Deploy to Cloudflare:');
  console.log('   npm run deploy:all\n');

} catch (error) {
  console.error('❌ Error during setup:', error.message);
  process.exit(1);
}
