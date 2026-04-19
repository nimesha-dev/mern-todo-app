const express = require('express');
const router = express.Router();
const Todo = require('../models/Todo');

// GET all todos
router.get('/', async (req, res) => {
  const todos = await Todo.find();
  res.json(todos);
});

// POST create a new todo
router.post('/', async (req, res) => {
  const todo = new Todo({ title: req.body.title });
  await todo.save();
  res.status(201).json(todo);
});

// PUT update todo (mark complete/incomplete or edit title)
router.put('/:id', async (req, res) => {
  console.log('PUT req.body:', JSON.stringify(req.body));
  console.log('PUT req.body.title:', req.body.title);
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    return res.status(404).json({ message: 'Todo not found' });
  }

  if (req.body.completed !== undefined) {
    todo.completed = req.body.completed;
  }

  if (req.body.title !== undefined) {
    todo.title = req.body.title;
  }

  await todo.save();
  res.json(todo);
});

// DELETE a todo
router.delete('/:id', async (req, res) => {
  await Todo.findByIdAndDelete(req.params.id);
  res.json({ message: 'Todo deleted' });
});

module.exports = router;