const express = require('express');
const router = express.Router();
const { createTask, getTasks, updateTask, deleteTasks } = require('../controllers/task.controller');
const { validateTask } = require('../middleware/task.middleware');

router.post('/tasks', validateTask, createTask);
router.get('/tasks', getTasks);
router.patch('/tasks/:id', validateTask, updateTask);
router.delete('/tasks', deleteTasks);

module.exports = router;