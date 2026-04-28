const express = require('express');
const router = express.Router();
const { generarToken } = require('../middleware/auth');

router.post('/login', (req, res) => {
  const { username } = req.body;

  const user = {
    id: 1,
    username,
    rol: username === 'admin' ? 'ADMIN' : 'USER'
  };

  const token = generarToken(user);

  res.json({ token });
});

module.exports = router;