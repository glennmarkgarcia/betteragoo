#!/usr/bin/env node

/**
 * Cross-platform version bump script for BetterAgoo.
 *
 * Usage:
 *   node scripts/bump-version.js patch   (default)
 *   node scripts/bump-version.js minor
 *   node scripts/bump-version.js major
 *   node scripts/bump-version.js          (shows current version)
 */

const fs = require('fs');
const path = require('path');

const VERSION_FILE = path.join(__dirname, '..', 'version.json');
const PACKAGE_FILE = path.join(__dirname, '..', 'package.json');
const PACKAGE_LOCK_FILE = path.join(__dirname, '..', 'package-lock.json');
const README_FILE = path.join(__dirname, '..', 'README.md');

// Read current version
let versionData;
try {
  versionData = JSON.parse(fs.readFileSync(VERSION_FILE, 'utf8'));
} catch (e) {
  console.error('Error: version.json not found or invalid');
  process.exit(1);
}

const bumpType = process.argv[2] || '';

if (!bumpType) {
  console.log('Current version: ' + versionData.version);
  console.log('Usage: node scripts/bump-version.js [major|minor|patch]');
  process.exit(0);
}

let major = versionData.major;
let minor = versionData.minor;
let patch = versionData.patch;
const oldVersion = versionData.version;

switch (bumpType) {
  case 'major':
    major++;
    minor = 0;
    patch = 0;
    break;
  case 'minor':
    minor++;
    patch = 0;
    break;
  case 'patch':
    patch++;
    break;
  default:
    console.error('Invalid bump type: ' + bumpType);
    console.error('Use: major, minor, or patch');
    process.exit(1);
}

const newVersion = major + '.' + minor + '.' + patch;
const today = new Date().toISOString().split('T')[0];

console.log('Bumping: ' + oldVersion + ' -> ' + newVersion);

// Update version.json
versionData.version = newVersion;
versionData.major = major;
versionData.minor = minor;
versionData.patch = patch;
versionData.lastUpdated = today;
fs.writeFileSync(VERSION_FILE, JSON.stringify(versionData, null, 2) + '\n');

// Update package.json
try {
  const pkg = JSON.parse(fs.readFileSync(PACKAGE_FILE, 'utf8'));
  pkg.version = newVersion;
  fs.writeFileSync(PACKAGE_FILE, JSON.stringify(pkg, null, 2) + '\n');
} catch (e) {
  console.warn('Warning: Could not update package.json:', e.message);
}

// Keep the root npm lockfile synchronized without reinstalling dependencies.
try {
  if (fs.existsSync(PACKAGE_LOCK_FILE)) {
    const lock = JSON.parse(fs.readFileSync(PACKAGE_LOCK_FILE, 'utf8'));
    lock.version = newVersion;
    if (lock.packages && lock.packages['']) {
      lock.packages[''].version = newVersion;
    }
    fs.writeFileSync(PACKAGE_LOCK_FILE, JSON.stringify(lock, null, 2) + '\n');
  }
} catch (e) {
  console.warn('Warning: Could not update package-lock.json:', e.message);
}

// Keep the README version badge synchronized with the release version.
try {
  if (fs.existsSync(README_FILE)) {
    let readme = fs.readFileSync(README_FILE, 'utf8');
    readme = readme.replace(
      /img\.shields\.io\/badge\/version-\d+\.\d+\.\d+-green/g,
      'img.shields.io/badge/version-' + newVersion + '-green'
    );
    fs.writeFileSync(README_FILE, readme);
  }
} catch (e) {
  console.warn('Warning: Could not update README version badge:', e.message);
}

// Update all HTML files — replace hardcoded "Ver. X.X.X" in footer
const htmlDirs = [
  '.',
  'accessibility',
  'budget',
  'contact',
  'faq',
  'government',
  'legislative',
  'news',
  'privacy',
  'service-details',
  'services',
  'sitemap',
  'statistics',
  'terms',
  'transparency',
];

let filesUpdated = 0;
const versionPattern = new RegExp('Ver\\. ' + oldVersion.replace(/\./g, '\\.'), 'g');

htmlDirs.forEach(function (dir) {
  const dirPath = path.join(__dirname, '..', dir);
  if (!fs.existsSync(dirPath)) return;

  const files = fs.readdirSync(dirPath).filter(function (f) {
    return f.endsWith('.html');
  });

  files.forEach(function (file) {
    const filePath = path.join(dirPath, file);
    let content = fs.readFileSync(filePath, 'utf8');
    if (versionPattern.test(content)) {
      content = content.replace(versionPattern, 'Ver. ' + newVersion);
      fs.writeFileSync(filePath, content);
      filesUpdated++;
    }
    // Reset regex lastIndex
    versionPattern.lastIndex = 0;
  });
});

console.log('Updated ' + filesUpdated + ' HTML file(s)');

// Sync version.json to react-app/public/ (consumed by React Footer at runtime)
var reactPublicVersion = path.join(__dirname, '..', 'react-app', 'public', 'version.json');
if (fs.existsSync(path.dirname(reactPublicVersion))) {
  fs.copyFileSync(VERSION_FILE, reactPublicVersion);
  console.log('Synced version.json → react-app/public/version.json');
}

// Sync version field in react-app/package.json
var reactPkgFile = path.join(__dirname, '..', 'react-app', 'package.json');
try {
  if (fs.existsSync(reactPkgFile)) {
    var reactPkg = JSON.parse(fs.readFileSync(reactPkgFile, 'utf8'));
    reactPkg.version = newVersion;
    fs.writeFileSync(reactPkgFile, JSON.stringify(reactPkg, null, 2) + '\n');
    console.log('Synced version → react-app/package.json');
  }
} catch (e) {
  console.warn('Warning: Could not update react-app/package.json:', e.message);
}

// Sync the React npm lockfile as part of the same release transaction.
var reactLockFile = path.join(__dirname, '..', 'react-app', 'package-lock.json');
try {
  if (fs.existsSync(reactLockFile)) {
    var reactLock = JSON.parse(fs.readFileSync(reactLockFile, 'utf8'));
    reactLock.version = newVersion;
    if (reactLock.packages && reactLock.packages['']) {
      reactLock.packages[''].version = newVersion;
    }
    fs.writeFileSync(reactLockFile, JSON.stringify(reactLock, null, 2) + '\n');
    console.log('Synced version → react-app/package-lock.json');
  }
} catch (e) {
  console.warn('Warning: Could not update react-app/package-lock.json:', e.message);
}

console.log('Done! Version is now ' + newVersion);
