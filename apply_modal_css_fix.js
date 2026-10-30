const fs = require('fs');

let html = fs.readFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', 'utf8');

// 1. Clean up CSS in index.html
// First, find and remove the duplicate block at line ~801
const duplicateBlockStart = html.indexOf('/* تسليط الضوء على الآية المشتبهة في الصفحة مع وضوح تام للحروف والكلمات */\n        .target-ayah-spotlight {');
if (duplicateBlockStart !== -1) {
  const duplicateBlockEnd = html.indexOf('/* ضبط ألوان الكلمات المختلفة داخل ورقة المصحف الفاتحة لتكون داكنة ومقروءة بامتياز */', duplicateBlockStart);
  if (duplicateBlockEnd !== -1) {
    // Find end of that section
    const endSection = html.indexOf('.token-cyan, .token-teal, .diff-color-1 {', duplicateBlockEnd);
    // remove the first redundant definitions
    html = html.substring(0, duplicateBlockStart) + html.substring(duplicateBlockEnd);
    console.log('Removed redundant first CSS block');
  }
}

// 2. Add the ultimate #mushafModal high-contrast CSS block right before </style>
const styleEnd = html.indexOf('</style>');
const ultimateModalCSS = `
        /* =========================================================================
           السيادة المطلقة لوضوح نافذة المصحف الشريف في المودال (#mushafModal)
           يمنع أي تداخل أو بهتان للألوان ويضمن ظهور الآية باللون الأسود الفاحم والتظليل باللون الأصفر
           ========================================================================= */
        #mushafModal .mushaf-sheet-viewport,
        #mushafModal .mushaf-replica-sheet {
            background: #fffdf5 !important;
        }

        #mushafModal .sheet-border-frame {
            background: #fffdf5 !important;
            border: 2px solid #c5a059 !important;
        }

        #mushafModal .sheet-header-meta,
        #mushafModal .sheet-footer-meta {
            color: #5c4320 !important;
            font-weight: bold !important;
        }

        #mushafModal .target-ayah-spotlight {
            background: #fffcee !important;
            border-right: 6px solid #d97706 !important;
            border-left: 6px solid #059669 !important;
            border-top: 2px solid #d4c5a3 !important;
            border-bottom: 2px solid #d4c5a3 !important;
            padding: 1.15rem 1.35rem !important;
            border-radius: 9px !important;
            margin: 14px 0 !important;
            font-family: 'Amiri', 'Traditional Arabic', serif !important;
            font-size: 1.4rem !important;
            line-height: 2.4 !important;
            box-shadow: 0 4px 18px rgba(0, 0, 0, 0.12) !important;
            text-align: right !important;
        }

        /* كافة النصوص والكلمات العادية والمشتركة داخل نافذة المصحف سوداء فاحمة بالكامل */
        #mushafModal .target-ayah-spotlight,
        #mushafModal .target-ayah-spotlight *,
        #mushafModal .target-ayah-spotlight span,
        #mushafModal .target-ayah-spotlight .common-word,
        #mushafModal .target-ayah-spotlight .shared-token {
            color: #050a14 !important; /* أسود كربوني داكن صريح مقروء 100% */
            text-shadow: none !important;
        }

        /* الكلمة أو الموضع المظلل يظهر بتظليل أصفر هايلايتر ناصع مع خط عريض ولون بني داكن */
        #mushafModal .target-ayah-spotlight .diff-token,
        #mushafModal .target-ayah-spotlight .token-cyan,
        #mushafModal .target-ayah-spotlight .token-teal,
        #mushafModal .target-ayah-spotlight .token-emerald,
        #mushafModal .target-ayah-spotlight .token-green,
        #mushafModal .target-ayah-spotlight .token-amber,
        #mushafModal .target-ayah-spotlight .token-gold,
        #mushafModal .target-ayah-spotlight mark.diff-token {
            background: #fde047 !important; /* أصفر فسفوري هايلايتر بارز */
            color: #451a03 !important; /* بني فاحم داكن وواضح جداً */
            border-bottom: 2.5px solid #b45309 !important;
            padding: 0.15rem 0.55rem !important;
            border-radius: 5px !important;
            font-weight: 800 !important;
            box-shadow: none !important;
            text-shadow: none !important;
            display: inline-block !important;
        }
`;

html = html.substring(0, styleEnd) + ultimateModalCSS + html.substring(styleEnd);
fs.writeFileSync('C:/Users/melwa/.gemini/antigravity/scratch/mutashabihat-app/index.html', html, 'utf8');
console.log('CSS updated successfully in index.html');
