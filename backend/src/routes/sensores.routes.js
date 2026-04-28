const express = require('express');
const router = express.Router();
const db = require('../db/db');
const { verificarToken } = require('../middleware/auth');
const { generarAlerta } = require('../services/sensores.service');

module.exports = (io) => {

  router.post('/', verificarToken, (req, res) => {
    const { dispositivo, lat, lng, combustible, temperatura, velocidad } = req.body;

    const alerta = generarAlerta(combustible);

    db.run(
      `INSERT INTO sensores (dispositivo, lat, lng, combustible, temperatura, velocidad)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [dispositivo, lat, lng, combustible, temperatura, velocidad]
    );

    // tiempo real
    io.emit('nuevoDato', { dispositivo, lat, lng, combustible, alerta });

    res.json({ ok: true, alerta });
  });

  return router;
};