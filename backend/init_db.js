import mysql from 'mysql2/promise';
import fs from 'fs';
import path from 'path';

async function run() {
  try {
    const connection = await mysql.createConnection({ host: 'localhost', user: 'root', password: '', multipleStatements: true });
    
    console.log('🔄 导入基础表结构...');
    await connection.query(fs.readFileSync(path.resolve('./database.sql'), 'utf-8'));
    
    const sqlPath = path.resolve('./generated_full_questions.sql');
    if (fs.existsSync(sqlPath)) {
       console.log('🔄 导入全量真实题库...');
       await connection.query(fs.readFileSync(sqlPath, 'utf-8'));
       console.log('✅ 导入成功！');
    }
    await connection.end();
  } catch (err) {
    console.error('❌ 初始化失败:', err.message);
  }
}
run();
