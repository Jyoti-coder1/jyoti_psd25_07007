// Array to store all tasks
let tasks = [];

// Current filter to determine what to show: 'all', 'completed', 'incomplete'
let currentFilter = "all";

// Get references to DOM elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const sortBtn = document.getElementById("sortBtn");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const completedCount = document.getElementById("completedCount");
const incompleteCount = document.getElementById("incompleteCount");

// ========== Add Task ==========
addTaskBtn.addEventListener("click", () => {
    const text = taskInput.value.trim(); // Remove spaces from input
    if (text === "") return; // Prevent adding empty task

    // Create a task object
    const newTask = {
        id: Date.now(), // Unique ID
        text,
        completed: false
    };
    tasks.push(newTask); // Add to task array
    taskInput.value = ""; // Clear input field
    renderTasks(); // Update UI
});

// ========== Event Delegation for Checkbox and Delete ==========
taskList.addEventListener("click", (e) => {
    const id = Number(e.target.closest("li")?.dataset.id); // Get task ID from <li>

    // Toggle completed checkbox
    if (e.target.classList.contains("task-checkbox")) {
        // Use HOF: map() to return new array with updated task
        tasks = tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        );
    }

    // Delete task
    if (e.target.classList.contains("delete-btn")) {
        // Use HOF: filter() to return all tasks except the one to delete
        tasks = tasks.filter(task => task.id !== id);
    }
    renderTasks(); // Update UI
});

// ========== Filter Buttons ==========
document.getElementById("showAll").addEventListener("click", () => {
    currentFilter = "all";
    renderTasks();
});
document.getElementById("showCompleted").addEventListener("click", () => {
    currentFilter = "completed";
    renderTasks();
});
document.getElementById("showIncomplete").addEventListener("click", () => {
    currentFilter = "incomplete";
    renderTasks();
});

// ========== Sort Button ==========
sortBtn.addEventListener("click", () => {
    // Use HOF: sort() to sort tasks alphabetically by text
    tasks.sort((a, b) => a.text.localeCompare(b.text));
    renderTasks();
});

// ========== Render Tasks (Main UI Function) ==========
function renderTasks() {
    let filtered = tasks;

    // Use HOF: filter() to create filtered task list
    if (currentFilter === "completed") {
        filtered = tasks.filter(t => t.completed); // only completed
    } else if (currentFilter === "incomplete") {
        filtered = tasks.filter(t => !t.completed); // only incomplete
    }
    taskList.innerHTML = ""; // Clear task list

    // Use HOF: map() to loop through filtered tasks and render them
    filtered.map(task => {
        const li = document.createElement("li");
        li.dataset.id = task.id; // store task ID in <li> for identification
        li.style.display = "block"; // ensures each task in new line

        // innerHTML includes checkbox, task text, and delete button
        li.innerHTML = `
      <input type="checkbox" class="task-checkbox" ${task.completed ? "checked" : ""}>
      <span style="text-decoration:${task.completed ? "line-through" : "none"}">${task.text}</span>
      <button class="delete-btn">Delete</button>
    `;
        taskList.appendChild(li); // Add to list
    });
    updateCounts(); // Update total/completed/incomplete counters
}

// ========== Update Task Counters ==========
function updateCounts() {
    totalCount.textContent = tasks.length;

    // Use HOF: filter() to count completed and incomplete tasks
    completedCount.textContent = tasks.filter(t => t.completed).length;
    incompleteCount.textContent = tasks.filter(t => !t.completed).length;
}