const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./iot.db');

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS sensores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      dispositivo TEXT,
      lat REAL,
      lng REAL,
      combustible REAL,
      temperatura REAL,
      velocidad REAL,
      fecha DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
});

module.exports = db;