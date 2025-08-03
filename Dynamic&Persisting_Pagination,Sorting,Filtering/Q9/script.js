const todosContainer = document.getElementById("todos");
const paginationContainer = document.getElementById("pagination");
const fetchBtn = document.getElementById("fetch-btn");

let currentPage = 1;
const limit = 10;
const totalPages = 20;

fetchBtn.addEventListener("click", () => {
  fetchTodos(currentPage);
  createPagination();
});

function fetchTodos(page) {
  const url = `https://jsonplaceholder.typicode.com/todos?_page=2&_limit=10`;
  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      displayTodos(data);
    })
    .catch((err) => console.log("Error:", err));
}

function displayTodos(todos) {
  todosContainer.innerHTML = "";

  todos.forEach((todo, index) => {
    const div = document.createElement("div");
    div.className = "todo";

    const title = document.createElement("span");
    title.textContent = todo.title;

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    if (index === 3 || index === 7 || index === 9) {
      checkbox.checked = true;
    } else {
      checkbox.checked = false;
    }

    checkbox.disabled = true;

    div.appendChild(title);
    div.appendChild(checkbox);
    todosContainer.appendChild(div);
  });
}

function createPagination() {
  paginationContainer.innerHTML = "";

  for (let i = 1; i <= totalPages; i++) {
    const btn = document.createElement("button");
    btn.className = "page-btn";
    btn.textContent = i;
    btn.disabled = true;
    paginationContainer.appendChild(btn);
  }
}