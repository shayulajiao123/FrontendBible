import mysql from 'mysql2/promise';

function extractSentences(text) {
   // 1. 移除 Markdown 图片
   text = text.replace(/!\[.*?\]\(.*?\)/g, '');
   // 2. 移除 HTML 标签 (如 <font>)
   text = text.replace(/<[^>]+>/g, '');
   // 3. 移除 Markdown 代码块
   text = text.replace(/```[\\s\\S]*?```/g, '');
   // 4. 移除 Markdown 表格 (包含 | 的行)
   text = text.replace(/^\\|.*\\|$/gm, '');
   // 5. 移除常见的 Markdown 标记
   text = text.replace(/^[>*\\-0-9]+\\.?\\s+/gm, '');

   return text.split(/[。！？\\n]+/)
              .map(s => s.trim())
              .filter(s => {
                 const hasChinese = /[\\u4e00-\\u9fa5]/.test(s);
                 return s.length >= 10 && s.length <= 150 && hasChinese && !s.includes('|') && !s.includes('imgs/');
              });
}

async function run() {
  console.log('🔄 准备清空假题库...');
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
  
  await pool.query('TRUNCATE TABLE questions');
  await pool.query('TRUNCATE TABLE mistakes');
  console.log('🗑️ 假数据与测试错题已清空！');
  
  const [docs] = await pool.query('SELECT * FROM knowledge_docs');
  console.log(`📚 成功读取了 ${docs.length} 个正式知识点，准备启发式出题...`);
  
  // 按照 category_id 缓存所有句子，作为“错误选项”的随机素材池
  const categorySentences = {};
  for (const doc of docs) {
     if (!categorySentences[doc.category_id]) categorySentences[doc.category_id] = [];
     const sentences = extractSentences(doc.content);
     categorySentences[doc.category_id].push(...sentences);
  }
  
  let count = 0;
  for (const doc of docs) {
     const sentences = extractSentences(doc.content);
     let correct = '';
     if (sentences.length > 0) {
        correct = sentences[0]; // 拿第一句像样的话作为正确答案
     } else {
        correct = doc.content.substring(0, 50).replace(/\\n/g, '') + '...'; 
     }
     if (correct.length < 5) correct = `关于【${doc.knowledge_point}】的核心定义。`;
     if (correct.length > 200) correct = correct.substring(0, 195) + '...';
     
     // 随机抽取同分类下的 3 个错误选项
     let wrongOpts = [];
     const poolSentences = categorySentences[doc.category_id] || [];
     const filteredPool = poolSentences.filter(s => s !== correct && s.length > 5);
     
     if (filteredPool.length >= 3) {
        // 打乱数组并截取前3个
        filteredPool.sort(() => 0.5 - Math.random());
        wrongOpts = filteredPool.slice(0, 3).map(s => s.length > 200 ? s.substring(0, 195) + '...' : s);
     } else {
        wrongOpts = [
           "这是一种过时的前端特性，目前主流浏览器已全面废弃并停止支持", 
           "它的主要作用是提高代码的执行速度，与页面的渲染和布局无关", 
           "它不能在现代浏览器中使用，只能为了兼容 IE8 等老旧浏览器而保留"
        ];
     }
     
     const options = [correct, ...wrongOpts];
     options.sort(() => 0.5 - Math.random()); // 打乱 ABCD
     
     const title = `下列关于【${doc.knowledge_point}】的描述，哪一项是正确的？`;
     const explanation = `> ${doc.parent_title ? doc.parent_title + ' > ' : ''}${doc.knowledge_point}\\n\\n${doc.content}`;
     
     await pool.query(
       'INSERT INTO questions (category_id, knowledge_point, type, title, options, answer, explanation) VALUES (?, ?, ?, ?, ?, ?, ?)',
       [doc.category_id, doc.knowledge_point, 'single', title, JSON.stringify(options), correct, explanation]
     );
     count++;
  }
  
  console.log(`✅ 出题完毕！成功根据真实文档生成并导入了 ${count} 道考题！`);
  process.exit(0);
}

run().catch(console.error);
