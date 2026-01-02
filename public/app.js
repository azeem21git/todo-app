const api = '/api/todos';
const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');

async function fetchTodos() {
  const res = await fetch(api);
  const todos = await res.json();
  render(todos);
}

function render(todos) {
  list.innerHTML = '';
  todos.forEach(t => {
    const li = document.createElement('li');
    li.className = t.completed ? 'done' : '';
    li.innerHTML = `<span class="text">${escapeHtml(t.text)}</span>
      <div class="actions">
        <button data-id="${t.id}" class="toggle">${t.completed ? 'Undo' : 'Done'}</button>
        <button data-id="${t.id}" class="delete">Delete</button>
      </div>`;
    list.appendChild(li);
  });
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

list.addEventListener('click', async e => {
  const id = e.target.dataset.id;
  if (!id) return;
  if (e.target.classList.contains('delete')) {
    await fetch(`${api}/${id}`, { method: 'DELETE' });
    fetchTodos();
  } else if (e.target.classList.contains('toggle')) {
    const res = await fetch(api);
    const todos = await res.json();
    const todo = todos.find(t => t.id === id);
    if (!todo) return;
    await fetch(`${api}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !todo.completed })
    });
    fetchTodos();
  }
});

form.addEventListener('submit', async e => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  await fetch(api, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ text }) });
  input.value = '';
  fetchTodos();
});

fetchTodos();
