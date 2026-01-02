const express = require('express');
const path = require('path');
const fs = require('fs');

const DATA_FILE = path.join(__dirname, 'data.json');

let todos = [];
try {
  const raw = fs.readFileSync(DATA_FILE, 'utf8');
  todos = JSON.parse(raw);
} catch (e) {
  todos = [];
}

function save() {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(todos, null, 2));
  } catch (e) {
    console.error('Failed to save data', e);
  }
}

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/todos', (req, res) => res.json(todos));

app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) return res.status(400).json({ error: 'text required' });
  const todo = { id: Date.now().toString(), text: text.trim(), completed: false };
  todos.push(todo);
  save();
  res.status(201).json(todo);
});

app.put('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const update = req.body;
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  todos[idx] = Object.assign({}, todos[idx], update);
  save();
  res.json(todos[idx]);
});

app.delete('/api/todos/:id', (req, res) => {
  const id = req.params.id;
  const idx = todos.findIndex(t => t.id === id);
  if (idx === -1) return res.status(404).json({ error: 'not found' });
  const removed = todos.splice(idx, 1)[0];
  save();
  res.json(removed);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Todo app listening on http://localhost:${port}`));
