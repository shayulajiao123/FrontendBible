import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

const pool = mysql.createPool({ host: 'localhost', user: 'root', password: '', database: 'frontend_bible', connectionLimit: 10 });

app.get('/api/categories', async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM categories');
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/knowledge-points', async (req, res) => {
  try {
    const { categoryId } = req.query;
    let query = 'SELECT DISTINCT knowledge_point FROM questions WHERE knowledge_point IS NOT NULL';
    let params = [];
    if (categoryId) {
        query += ' AND category_id = ?';
        params.push(categoryId);
    }
    const [rows] = await pool.query(query, params);
    res.json(rows.map(r => r.knowledge_point));
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/questions', async (req, res) => {
  try {
    const { categoryId, type, knowledgePoint } = req.query;
    let query = 'SELECT * FROM questions WHERE 1=1';
    let params = [];
    
    if (categoryId) { query += ' AND category_id = ?'; params.push(categoryId); }
    if (knowledgePoint) { query += ' AND knowledge_point = ?'; params.push(knowledgePoint); }
    
    if (type === 'objective') {
      query += ' AND type IN ("single", "multiple")';
    } else if (type === 'code') {
      query += ' AND type = "code"';
    }
    
    query += ' ORDER BY RAND() LIMIT 50'; 
    
    const [rows] = await pool.query(query, params);
    const formatted = rows.map(r => ({
      ...r,
      options: typeof r.options === 'string' ? JSON.parse(r.options) : r.options,
      answer: r.answer ? r.answer.split(',') : []
    }));
    res.json(formatted);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/mistakes/questions', async (req, res) => {
  try {
    const [rows] = await pool.query(`
      SELECT q.* FROM mistakes m 
      JOIN questions q ON m.question_id = q.id 
      WHERE m.is_resolved = 0 
      ORDER BY m.updated_at DESC LIMIT 50
    `);
    const formatted = rows.map(r => ({
      ...r,
      options: typeof r.options === 'string' ? JSON.parse(r.options) : r.options,
      answer: r.answer ? r.answer.split(',') : []
    }));
    res.json(formatted);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/mistakes', async (req, res) => {
  const { questionId, isCorrect } = req.body;
  try {
    if (!isCorrect) {
      // 答错永远记录/累加错题
      await pool.query('INSERT INTO mistakes (question_id, error_count, is_resolved) VALUES (?, 1, 0) ON DUPLICATE KEY UPDATE error_count = error_count + 1, is_resolved = 0', [questionId]);
    }
    // 答对了什么都不做，必须手动移除
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/docs/points', async (req, res) => {
  try {
    const { categoryId, search } = req.query;
    let query = 'SELECT id, parent_title, knowledge_point, category_id FROM knowledge_docs WHERE 1=1';
    let params = [];
    if (categoryId) {
      query += ' AND category_id = ?';
      params.push(categoryId);
    }
    if (search) {
      query += ' AND (knowledge_point LIKE ? OR content LIKE ?)';
      params.push(`%${search}%`, `%${search}%`);
    }
    query += ' ORDER BY id ASC';
    const [rows] = await pool.query(query, params);
    res.json(rows);
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.get('/api/docs/content', async (req, res) => {
  try {
    const { id } = req.query;
    const [rows] = await pool.query('SELECT content FROM knowledge_docs WHERE id = ?', [id]);
    if (rows.length > 0) res.json({ content: rows[0].content });
    else res.status(404).json({ error: 'Not found' });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.post('/api/mistakes/remove', async (req, res) => {
  const { questionId } = req.body;
  try {
    await pool.query('UPDATE mistakes SET is_resolved = 1 WHERE question_id = ?', [questionId]);
    res.json({ success: true });
  } catch (err) { res.status(500).json({ error: err.message }); }
});

app.listen(3000, () => { console.log('🚀 Backend running on port 3000'); });
