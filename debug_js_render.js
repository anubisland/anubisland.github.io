const fs = require('fs');
const content = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

// Find occurrences of 'tadabburList'
let idx = 0;
while ((idx = content.indexOf('tadabburList', idx)) !== -1) {
  console.log('Found at', idx);
  console.log(content.substring(Math.max(0, idx - 100), Math.min(content.length, idx + 400)));
  console.log('------------------------------------');
  idx += 12;
}
