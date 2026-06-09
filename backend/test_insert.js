import mysql from 'mysql2/promise';
async function run() {
  try {
    const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible' });
    console.log("Connected");
    const [result] = await pool.query(
      'INSERT INTO knowledge_docs (category_id, parent_title, knowledge_point, content, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?)',
      [1, "Title", "Point", "Some text", 1000, 1000]
    );
    console.log("Inserted:", result);
  } catch (e) {
    console.error("ERROR:", e);
  }
  process.exit(0);
}
run();
