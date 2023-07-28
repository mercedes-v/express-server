const express = require("express");
const listViewRouter = express.Router();

module.exports = (tasklist) => {
  // Exporta una función tasklist 
  listViewRouter.get("/completed",(req, res) => {
    const completedTasks = tasklist.filter((task) => task.isCompleted === true);
    res.json(completedTasks);
  });

  listViewRouter.get("/incomplete", (req, res) => {
    const incompleteTasks = tasklist.filter(
      (task) => task.isCompleted === false
    );
    res.json(incompleteTasks);
  });

  return listViewRouter;
};

  listViewRouter.get("/completed", (req, res) => {
  const completedTasks = tasklist.filter((task) => task.isCompleted === true);
   res.json(completedTasks);
 });

 listViewRouter.get("/incomplete", (req, res) => {
  const incompleteTasks = tasklist.filter((task) => task.isCompleted === false);
  res.json(incompleteTasks);
 });

 module.exports = listViewRouter;