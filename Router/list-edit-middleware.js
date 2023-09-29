// list-edit-middleware.js
const express = require('express');
const routerMiddleware = express.Router();

// Middleware para manejar errores en solicitudes POST y PUT
routerMiddleware.use((req, res, next) => {
  if (req.method === 'POST' || req.method === 'PUT') {
    if (!req.body) {
      return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío.' });
    }

    // Agrega aquí la la información de la solicitud sea válida
    // y que no falten atributos  para crear las tareas
    // Puedes implementar tus propias validaciones según tus requisitos
  }

  next();
});

module.exports = routerMiddleware;