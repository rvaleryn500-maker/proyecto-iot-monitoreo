const jwt = require('jsonwebtoken');
const SECRET = "secreto123";

function generarToken(user) {
  return jwt.sign(user, SECRET, { expiresIn: '1h' });
}

function verificarToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) return res.status(401).send("Sin token");

  try {
    const decoded = jwt.verify(token, SECRET);
    req.user = decoded;
    next();
  } catch {
    res.status(401).send("Token inválido");
  }
}

module.exports = { generarToken, verificarToken };