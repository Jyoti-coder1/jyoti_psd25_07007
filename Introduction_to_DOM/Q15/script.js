const input = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

addBtn.addEventListener('click', () => {
    const task = input.value;
    if (task === '') return;

    taskList.innerHTML += `
    <li>
      ${task}
      <button class="complete">Complete</button>
      <button class="delete">Delete</button>
    </li>
  `;
    input.value = '';
});

taskList.addEventListener('click', (e) => {
    if (e.target.className === 'delete') {
        e.target.parentElement.remove();
    }
    if (e.target.className === 'complete') {
        e.target.parentElement.style.textDecoration = 'line-through';
    }
});