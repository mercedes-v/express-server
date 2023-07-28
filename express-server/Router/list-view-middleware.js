// list-view-middleware.js
const express = require('express');
const routerMiddleware = express.Router();

// Middleware para verificar parámetros correctos
routerMiddleware.use((req, res, next) => {
  const { param1, param2 } = req.params;

  // Agrega aquí la lógica para verificar que  sean correctos según tus requisitos
  // Puedes usar if-else, switch u otras validaciones según el escenario

  next();
});

module.exports = routerMiddleware;
