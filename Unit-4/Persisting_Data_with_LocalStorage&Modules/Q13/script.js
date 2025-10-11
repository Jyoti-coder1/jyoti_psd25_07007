let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

const taskInput = document.getElementById('taskInput');
const addTaskBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');
const search = document.getElementById('search');

function save() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function render(list) {
    taskList.innerHTML = '';
    list.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
      <span>${task.text}</span>
      <div>
        <button onclick="toggle('${task.id}')">✔</button>
        <button onclick="remove('${task.id}')">✖</button>
      </div>
    `;
        taskList.appendChild(li);
    });
}

function toggle(id) {
    tasks = tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t);
    save();
    render(tasks);
}

function remove(id) {
    tasks = tasks.filter(t => t.id !== id);
    save();
    render(tasks);
}

addTaskBtn.onclick = () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ id: Date.now().toString(), text, completed: false });
        save();
        render(tasks);
        taskInput.value = '';
    }
};

search.oninput = () => {
    const filtered = tasks.filter(t => t.text.toLowerCase().includes(search.value.toLowerCase()));
    render(filtered);
};

render(tasks);