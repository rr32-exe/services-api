#!/usr/bin/env node

/**
 * 💾 Database Seeding Script for Cloudflare D1
 */

require('dotenv').config();

const schema = `
-- Users table (for comments, newsletter, etc.)
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  subscribed BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Posts table (for blog posts)
CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site TEXT NOT NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  content TEXT,
  excerpt TEXT,
  category TEXT,
  keywords TEXT,
  author TEXT,
  published BOOLEAN DEFAULT 0,
  views INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Comments table
CREATE TABLE IF NOT EXISTS comments (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  post_id INTEGER NOT NULL,
  user_id INTEGER,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  content TEXT NOT NULL,
  approved BOOLEAN DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (post_id) REFERENCES posts(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);

-- Analytics table
CREATE TABLE IF NOT EXISTS analytics (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site TEXT NOT NULL,
  page TEXT NOT NULL,
  views INTEGER DEFAULT 1,
  date DATE NOT NULL,
  UNIQUE(site, page, date)
);

-- Affiliate links table
CREATE TABLE IF NOT EXISTS affiliate_links (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  site TEXT NOT NULL,
  product_name TEXT NOT NULL,
  product_url TEXT NOT NULL,
  affiliate_url TEXT NOT NULL,
  category TEXT,
  clicks INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Newsletter subscribers
CREATE TABLE IF NOT EXISTS newsletter (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT UNIQUE NOT NULL,
  site TEXT NOT NULL,
  subscribed BOOLEAN DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

console.log('💾 Database Schema for Cloudflare D1\n');
console.log('Copy and paste this SQL into your Cloudflare D1 database:\n');
console.log('Dashboard → Workers & Pages → D1 → Your Database → Console\n');
console.log('=' .repeat(60));
console.log(schema);
console.log('=' .repeat(60));
console.log('\n✅ Or use Wrangler CLI:');
console.log('wrangler d1 execute <DATABASE_NAME> --file=./scripts/schema.sql\n');

// Save schema to file
const fs = require('fs');
const path = require('path');
const schemaPath = path.join(__dirname, 'schema.sql');
fs.writeFileSync(schemaPath, schema);
console.log(`📄 Schema saved to: ${schemaPath}\n`);
