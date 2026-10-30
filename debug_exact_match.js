const fs = require('fs');
const content = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

const idx = content.indexOf('const tadabburList = document.getElementById');
console.log(content.substring(idx - 100, idx + 800));
