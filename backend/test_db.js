import mysql from 'mysql2/promise';
async function run() {
  const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
  const [rows] = await pool.query('SELECT COUNT(*) as cnt FROM knowledge_docs');
  console.log('Count:', rows[0].cnt);
  process.exit(0);
}
run();
