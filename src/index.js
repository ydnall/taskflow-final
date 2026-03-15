const express = require('express');
const { randomUUID } = require('crypto');

const app = express();
app.use(express.json());

// In-memory store
const tasks = new Map();

// List all tasks
app.get('/tasks', (req, res) => {
  const allTasks = Array.from(tasks.values());
  const status = req.query.status;
  if (status) {
    return res.json(allTasks.filter(t => t.status === status));
  }
  res.json(allTasks);
});

// Get single task
app.get('/tasks/:id', (req, res) => {
  const task = tasks.get(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  res.json(task);
});

// Create task
app.post('/tasks', (req, res) => {
  const { title, description, assignee } = req.body;
  const task = {
    id: randomUUID(),
    title,
    description: description || '',
    assignee: assignee || null,
    status: 'open',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  tasks.set(task.id, task);
  res.status(201).json(task);
});

// Update task
app.patch('/tasks/:id', (req, res) => {
  const task = tasks.get(req.params.id);
  if (!task) return res.status(404).json({ error: 'Task not found' });
  const { title, description, assignee, status } = req.body;
  if (title) task.title = title;
  if (description) task.description = description;
  if (assignee) task.assignee = assignee;
  if (status) task.status = status;
  task.updatedAt = new Date().toISOString();
  tasks.set(task.id, task);
  res.json(task);
});

// Delete task
app.delete('/tasks/:id', (req, res) => {
  if (!tasks.delete(req.params.id)) {
    return res.status(404).json({ error: 'Task not found' });
  }
  res.status(204).end();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`TaskFlow API running on port ${PORT}`));

module.exports = app;
