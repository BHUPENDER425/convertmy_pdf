const fs = require('fs');
const path = require('path');

const srcCandidates = [
  path.join(__dirname, '..', 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.min.mjs'),
  path.join(__dirname, '..', 'node_modules', 'pdfjs-dist', 'build', 'pdf.worker.mjs'),
];

const dest = path.join(__dirname, '..', 'public', 'pdf.worker.min.mjs');

function copyIfExists(srcPath) {
  if (fs.existsSync(srcPath)) {
    fs.copyFileSync(srcPath, dest);
    console.log(`Copied pdf.worker from ${srcPath} to ${dest}`);
    return true;
  }
  return false;
}

let copied = false;
for (const src of srcCandidates) {
  try {
    if (copyIfExists(src)) {
      copied = true;
      break;
    }
  } catch (err) {
    // continue trying other candidates
  }
}

if (!copied) {
  console.warn('Warning: Could not find pdf.worker file in node_modules/pdfjs-dist/build. Please ensure pdfjs-dist is installed.');
} else {
  // ensure the dest file has world readable permissions
  try {
    fs.chmodSync(dest, 0o644);
  } catch (e) {}
}
