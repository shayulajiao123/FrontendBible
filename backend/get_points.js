import mysql from 'mysql2/promise';
async function run() {
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
  const [rows] = await pool.query('SELECT id, knowledge_point FROM knowledge_docs WHERE category_id = 5 LIMIT 15');
  console.log('Category 5 Points:');
  rows.forEach(r => console.log(r.knowledge_point));
  process.exit(0);
}
run();
