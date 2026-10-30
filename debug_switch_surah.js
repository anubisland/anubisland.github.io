const fs = require('fs');
const content = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

const idx = content.indexOf('function switchSurah');
console.log(content.substring(idx, idx + 3000));
