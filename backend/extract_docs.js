import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

const docsMap = {
  1: '../docs/1.【尚学堂】全新2022版WEB前端HTML5/1.第一章：HTML5/md文档/HTML5.md',
  2: '../docs/2.【尚学堂】全新2022版WEB前端CSS3/2.第二章：CSS3/md文档/CSS3.md',
  3: '../docs/3.【尚学堂】全新2022版WEB前端JavaScript/3.第三章：JavaScript/md文档/JavaScript.md',
  4: '../docs/4.【尚学堂】全新2022版WEB前端ES6/4.第四章：ES6/md文档/ES6.md',
  5: '../docs/5.【尚学堂】全新2022版WEB前端Vue/5.第五章：Vue/md文档/Vue3.md',
};

async function run() {
  console.log('🔄 开始连接数据库提炼文档...');
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
  await pool.query('TRUNCATE TABLE knowledge_docs');

  for (const [categoryId, relativePath] of Object.entries(docsMap)) {
    const fullPath = path.resolve(process.cwd(), relativePath);
    if (!fs.existsSync(fullPath)) continue;
    const content = fs.readFileSync(fullPath, 'utf8');
    const lines = content.split('\n');
    let currentParent = null; let currentPoint = null; let contentBuffer = [];
    
    const insertBlock = async () => {
      const text = contentBuffer.join('\n').trim();
      if (currentPoint && text.length > 5) {
         const ts = Math.floor(Date.now()/1000);
         try {
           await pool.query(
             'INSERT INTO knowledge_docs (category_id, parent_title, knowledge_point, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
             [categoryId, currentParent, currentPoint, text, ts, ts]
           );
         } catch(e) { console.error('INSERT ERROR:', e.message); }
      }
      contentBuffer = [];
    };

    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('## ')) {
        await insertBlock();
        currentParent = lines[i].replace('## ', '').trim();
        currentPoint = currentParent; 
      } else if (lines[i].startsWith('### ')) {
        await insertBlock();
        currentPoint = lines[i].replace('### ', '').trim();
      } else {
        contentBuffer.push(lines[i]);
      }
    }
    await insertBlock();
  }
  
  console.log('✅ 所有文档已成功提炼切片并入库！');
  process.exit(0);
}

run().catch(console.error);
