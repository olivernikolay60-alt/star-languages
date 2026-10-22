const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const dotenv = require("dotenv");
const crypto = require("crypto");

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

function hashPassword(password) {
  const salt = crypto.randomBytes(16).toString("hex");
  const hash = crypto.scryptSync(password, salt, 32).toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored) {
  if (!stored || !stored.includes(":")) return false;
  const [salt, hash] = stored.split(":");
  const next = crypto.scryptSync(password, salt, 32);
  const storedBuf = Buffer.from(hash, "hex");
  if (storedBuf.length !== next.length) return false;
  return crypto.timingSafeEqual(storedBuf, next);
}

// ==================== RUTAS ====================

app.post("/register", (req, res) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");

  if (!username || !password) {
    return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
  }
  if (username.length > 50) {
    return res.status(400).json({ error: "El usuario no puede tener más de 50 caracteres" });
  }

  const passwordHash = hashPassword(password);
  db.query(
    "INSERT INTO users (username, password_hash) VALUES (?, ?)",
    [username, passwordHash],
    (err, result) => {
      if (err) {
        if (err.code === "ER_DUP_ENTRY") {
          return res.status(409).json({ error: "Este usuario ya existe" });
        }
        console.error(err);
        return res.status(500).json({ error: "No se pudo crear el usuario" });
      }
      res.status(201).json({ id: result.insertId, username });
    },
  );
});

app.post("/login", (req, res) => {
  const username = String(req.body.username || "").trim();
  const password = String(req.body.password || "");

  if (!username || !password) {
    return res.status(400).json({ error: "Usuario y contraseña son obligatorios" });
  }

  db.query(
    "SELECT id, username, password_hash FROM users WHERE username = ? LIMIT 1",
    [username],
    (err, rows) => {
      if (err) {
        console.error(err);
        return res.status(500).json({ error: "No se pudo iniciar sesión" });
      }
      const user = rows[0];
      if (!user || !verifyPassword(password, user.password_hash)) {
        return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
      }
      res.json({ id: user.id, username: user.username });
    },
  );
});

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
