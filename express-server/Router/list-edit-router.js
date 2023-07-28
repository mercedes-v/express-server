// list-edit-router.js
const express = require('express');
const listEditRouter = express.Router();
const listEditMiddleware = require('./list-edit-middleware');

// Asociar el middleware listEditMiddleware con el router list-edit-router
listEditRouter.use(listEditMiddleware);

// Definir  rutas para el router list-edit-router

listEditRouter.post('/tasks', (req, res) => {
  // Agrega aquí para crear una nueva tarea
  // ...

  res.status(201).json({ message: 'Tarea creada con éxito.' });
});

// Más rutas para otras operaciones CRUD
// ...

module.exports = listEditRouter;
