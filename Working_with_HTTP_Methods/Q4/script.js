const API_URL = 'https://YOUR_PROJECT_ID.mockapi.io/tasks'; // Replace YOUR_PROJECT_ID

const taskList = document.getElementById('task-list');
const taskTemplate = document.getElementById('task-template');

async function fetchTasks() {
    try {
        const res = await fetch(API_URL);
        const tasks = await res.json();
        taskList.innerHTML = '';
        tasks.forEach(task => renderTask(task));
    } catch (err) {
        alert("Failed to fetch tasks.");
    }
}

function renderTask(task) {
    const clone = taskTemplate.content.cloneNode(true);
    const taskEl = clone.querySelector('.task');
    const titleInput = clone.querySelector('.task-title');
    const statusSelect = clone.querySelector('.task-status');
    const editBtn = clone.querySelector('.edit-btn');
    const saveBtn = clone.querySelector('.save-btn');
    const deleteBtn = clone.querySelector('.delete-btn');

    titleInput.value = task.title;
    statusSelect.value = task.status;

    // Enable editing
    editBtn.addEventListener('click', () => {
        titleInput.disabled = false;
        statusSelect.disabled = false;
        editBtn.classList.add('hidden');
        saveBtn.classList.remove('hidden');
    });

    // Save changes (PATCH)
    saveBtn.addEventListener('click', async () => {
        try {
            const updated = {
                title: titleInput.value,
                status: statusSelect.value,
            };

            const res = await fetch(`${API_URL}/${task.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updated),
            });

            if (!res.ok) throw new Error("Update failed");

            titleInput.disabled = true;
            statusSelect.disabled = true;
            editBtn.classList.remove('hidden');
            saveBtn.classList.add('hidden');
        } catch (err) {
            alert("Failed to update task.");
        }
    });

    // Delete task
    deleteBtn.addEventListener('click', async () => {
        if (!confirm("Are you sure you want to delete this task?")) return;
        try {
            const res = await fetch(`${API_URL}/${task.id}`, {
                method: 'DELETE',
            });
            if (!res.ok) throw new Error("Delete failed");
            taskEl.remove();
        }
        catch (err) {
            alert("Failed to delete task.");
        }
    });

    taskList.appendChild(clone);
}
fetchTasks();