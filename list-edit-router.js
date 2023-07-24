
const express = require('express');


// Crear una instancia  de Express
const router = express.Router();

// Parsear  las solicitudes como JSON
router.use(bodyParser.json());

// lista de tareas 
let tasks = [];

// Ruta para crear una nueva tarea (POST)
router.post('/tasks', (req, res) => {
  const newTask = req.body;
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Ruta para eliminar una tarea existente (DELETE)
router.delete('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  tasks = tasks.filter(task => task.id !== taskId);
  res.json({ message: 'Tarea eliminada con éxito' });
});

// Ruta para actualizar una tarea existente (UPDATE)
router.put('/tasks/:taskId', (req, res) => {
  const taskId = req.params.taskId;
  const updatedTask = req.body;
  tasks = tasks.map(task => (task.id === taskId ? { ...task, ...updatedTask } : task));
  res.json({ message: 'Tarea actualizada con éxito' });
});

module.exports = router;
