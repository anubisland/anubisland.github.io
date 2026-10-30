const fs = require('fs');
const content = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

// Find occurrences of 'سر التفرقة بالسياق'
let idx = 0;
while ((idx = content.indexOf('سر التفرقة بالسياق', idx)) !== -1) {
  console.log('Found at', idx);
  console.log(content.substring(Math.max(0, idx - 150), Math.min(content.length, idx + 400)));
  console.log('------------------------------------');
  idx += 18;
}
