const fs = require('fs');
const path = require('path');

const quizRoot = path.resolve(__dirname, '..');
const srcDir = path.join(quizRoot, 'src');
const publicDir = path.join(quizRoot, 'public');
const distDir = path.join(quizRoot, 'dist');

console.log('Building betteragoo-quiz static dist for Cloudflare Pages...');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach((childItemName) => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.copyFileSync(src, dest);
  }
}

// 1. Clean dist
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true, force: true });
}
fs.mkdirSync(distDir, { recursive: true });

// 2. Copy src to dist
if (fs.existsSync(srcDir)) {
  copyRecursiveSync(srcDir, distDir);
  console.log('[COPIED] src/ → dist/');
}

// 3. Copy public to dist
if (fs.existsSync(publicDir)) {
  copyRecursiveSync(publicDir, distDir);
  console.log('[COPIED] public/ → dist/');
}

console.log('Build complete! Output ready in others/quiz/dist/');
