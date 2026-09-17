const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conexión a MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

db.connect((err) => {
  if (err) {
    console.error("❌ Error conectando a MySQL:", err);
    return;
  }
  console.log("✅ Conectado a MySQL correctamente");
});

// ==================== RUTAS ====================

// Guardar progreso al terminar nivel
app.post("/save-progress", (req, res) => {
  const { user_id, level, cefr_level, score, words_learned } = req.body;

  if (!user_id || !level || !cefr_level) {
    return res.status(400).json({ error: "Faltan datos obligatorios" });
  }

  const sql = `
        INSERT INTO progress (user_id, level, cefr_level, score, words_learned)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE 
            score = GREATEST(score, VALUES(score)),
            words_learned = GREATEST(words_learned, VALUES(words_learned))
    `;

  db.query(
    sql,
    [user_id, level, cefr_level, score || 0, words_learned || 0],
    (err, result) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "Error al guardar progreso" });
      }
      res.json({ success: true, message: "Progreso guardado correctamente" });
    },
  );
});

// Obtener todo el progreso de un jugador
app.get("/get-progress/:user_id", (req, res) => {
  const sql = `
        SELECT level, cefr_level, score, words_learned, completed_at 
        FROM progress 
        WHERE user_id = ? 
        ORDER BY level ASC
    `;

  db.query(sql, [req.params.user_id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Error al obtener progreso" });
    }
    res.json(results);
  });
});

// Obtener el nivel más alto completado
app.get("/max-level/:user_id", (req, res) => {
  db.query(
    `
        SELECT MAX(level) as max_level, cefr_level 
        FROM progress 
        WHERE user_id = ?
    `,
    [req.params.user_id],
    (err, result) => {
      if (err) return res.status(500).json({ error: err });
      res.json(result[0] || { max_level: 0, cefr_level: "A0" });
    },
  );
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
