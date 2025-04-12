import express from 'express';
import mysql from 'mysql2/promise';
import axios from 'axios';
const app = express();

app.get('/api/user_plants', async (req, res) => {
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'R!rich0wder',
      database: 'sprout'
    });

    const [rows] = await connection.execute('SELECT * FROM user_plants');
    await connection.end();

    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;

// Middleware (optional but helpful)
app.use(express.json());

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});