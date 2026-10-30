const fs = require('fs');
const content = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

const targetIdx = 1096317;
console.log(content.substring(targetIdx - 1500, targetIdx + 1500));
