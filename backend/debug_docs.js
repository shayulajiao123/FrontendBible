import fs from 'fs';
import path from 'path';

const docsMap = {
  5: '../docs/5.【尚学堂】全新2022版WEB前端Vue/5.第五章：Vue/md文档/Vue3.md',
};

for (const [categoryId, relativePath] of Object.entries(docsMap)) {
  const fullPath = path.resolve(process.cwd(), relativePath);
  const content = fs.readFileSync(fullPath, 'utf8');
  const lines = content.split('\n');
  
  let currentParent = null;
  let currentPoint = null;
  let contentBuffer = [];
  
  const insertBlock = () => {
    const text = contentBuffer.join('\n').trim();
    console.log(`[Block] Parent: ${currentParent}, Point: ${currentPoint}, Text Length: ${text.length}`);
    contentBuffer = [];
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    if (line.startsWith('## ')) {
      insertBlock();
      currentParent = line.replace('## ', '').trim();
      currentPoint = currentParent; 
    } else if (line.startsWith('### ')) {
      insertBlock();
      currentPoint = line.replace('### ', '').trim();
    } else {
      contentBuffer.push(line);
    }
  }
  insertBlock();
}
