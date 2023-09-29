// valid-methods-middleware.js
const express = require('express');
const appMiddleware = express();

// Middleware para manejar métodos HTTP válidos
appMiddleware.use((req, res, next) => {
  if (!['GET', 'POST', 'PUT', 'DELETE'].includes(req.method)) {
    return res.status(400).json({ error: 'Método HTTP no válido.' });
  }

  next();
});

module.exports = appMiddleware;