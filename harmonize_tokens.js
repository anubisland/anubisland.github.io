const fs = require('fs');

const htmlPath = 'C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html';
let html = fs.readFileSync(htmlPath, 'utf8');

let countA = 0, countB = 0, countC = 0, countD = 0, countE = 0;

// Match both with and without backslash
html = html.replace(/class=\\?"diff-token token-a\\?"/g, (m) => {
    countA++;
    const q = m.includes('\\"') ? '\\"' : '"';
    return `class=${q}diff-token token-cyan token-a${q}`;
});

html = html.replace(/class=\\?"diff-token token-b\\?"/g, (m) => {
    countB++;
    const q = m.includes('\\"') ? '\\"' : '"';
    return `class=${q}diff-token token-emerald token-b${q}`;
});

html = html.replace(/class=\\?"diff-token token-c\\?"/g, (m) => {
    countC++;
    const q = m.includes('\\"') ? '\\"' : '"';
    return `class=${q}diff-token token-amber token-c${q}`;
});

html = html.replace(/class=\\?"diff-token token-d\\?"/g, (m) => {
    countD++;
    const q = m.includes('\\"') ? '\\"' : '"';
    return `class=${q}diff-token token-purple token-d${q}`;
});

html = html.replace(/class=\\?"diff-token token-e\\?"/g, (m) => {
    countE++;
    const q = m.includes('\\"') ? '\\"' : '"';
    return `class=${q}diff-token token-rose token-e${q}`;
});

fs.writeFileSync(htmlPath, html, 'utf8');
console.log(`Harmonized tokens: A=${countA}, B=${countB}, C=${countC}, D=${countD}, E=${countE}`);
