const fs = require('fs');
const content = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

// Find surahSelect
const idx = content.indexOf('surahSelect');
console.log(content.substring(idx - 100, idx + 1000));
