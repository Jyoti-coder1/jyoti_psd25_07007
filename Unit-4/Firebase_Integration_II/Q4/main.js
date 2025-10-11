// main.js - Complete Library Management Logic with Filtering, Sorting, Pagination, and State Persistence

const baseURL = "https://library-management-syste-b80d9-default-rtdb.firebaseio.com/";


let bookFilters = JSON.parse(localStorage.getItem("bookFilters")) || { genre: "", author: "", available: "" };
let bookSort = JSON.parse(localStorage.getItem("bookSort")) || { key: "title", order: "asc" };
let bookPagination = JSON.parse(localStorage.getItem("bookPagination")) || { page: 1, limit: 5 };

let memberFilters = JSON.parse(localStorage.getItem("memberFilters")) || { active: "", joinedAfter: "" };
let memberSort = JSON.parse(localStorage.getItem("memberSort")) || { key: "name", order: "asc" };
let memberPagination = JSON.parse(localStorage.getItem("memberPagination")) || { page: 1, limit: 5 };

function saveState() {
  localStorage.setItem("bookFilters", JSON.stringify(bookFilters));
  localStorage.setItem("bookSort", JSON.stringify(bookSort));
  localStorage.setItem("bookPagination", JSON.stringify(bookPagination));
  localStorage.setItem("memberFilters", JSON.stringify(memberFilters));
  localStorage.setItem("memberSort", JSON.stringify(memberSort));
  localStorage.setItem("memberPagination", JSON.stringify(memberPagination));
}

//BOOK FUNCTIONS

function addBook(book) {
  return fetch(`${baseURL}/books.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(book)
  }).then(res => res.json());
}

function getAllBooks() {
  return fetch(`${baseURL}/books.json`)
    .then(res => res.json())
    .then(data => {
      if (!data) return [];
      return Object.entries(data).map(([id, book]) => ({ firebaseId: id, ...book }));
    });
}

function updateBook(firebaseId, data) {
  return fetch(`${baseURL}/books/${firebaseId}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function deleteBook(firebaseId) {
  return fetch(`${baseURL}/books/${firebaseId}.json`, {
    method: "DELETE"
  });
}

//MEMBER FUNCTIONS

function addMember(member) {
  return fetch(`${baseURL}/members.json`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(member)
  }).then(res => res.json());
}

function getAllMembers() {
  return fetch(`${baseURL}/members.json`)
    .then(res => res.json())
    .then(data => {
      if (!data) return [];
      return Object.entries(data).map(([id, member]) => ({ firebaseId: id, ...member }));
    });
}

function updateMember(firebaseId, data) {
  return fetch(`${baseURL}/members/${firebaseId}.json`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  }).then(res => res.json());
}

function deleteMember(firebaseId) {
  return fetch(`${baseURL}/members/${firebaseId}.json`, {
    method: "DELETE"
  });
}

//  FILTER, SORT, PAGINATE

function applyBookFilters(books) {
  return books.filter(book => {
    return (!bookFilters.genre || book.genre === bookFilters.genre) &&
           (!bookFilters.author || book.author.includes(bookFilters.author)) &&
           (bookFilters.available === "" || book.available === (bookFilters.available === "true"));
  });
}

function sortBooks(books) {
  return books.sort((a, b) => {
    let valA = a[bookSort.key], valB = b[bookSort.key];
    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }
    return bookSort.order === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });
}

function paginateBooks(books) {
  const start = (bookPagination.page - 1) * bookPagination.limit;
  return books.slice(start, start + bookPagination.limit);
}

function applyMemberFilters(members) {
  return members.filter(m => {
    return (memberFilters.active === "" || m.active === (memberFilters.active === "true")) &&
           (!memberFilters.joinedAfter || new Date(m.membershipDate) >= new Date(memberFilters.joinedAfter));
  });
}

function sortMembers(members) {
  return members.sort((a, b) => {
    let valA = a[memberSort.key], valB = b[memberSort.key];
    if (typeof valA === "string") {
      valA = valA.toLowerCase();
      valB = valB.toLowerCase();
    }
    return memberSort.order === "asc" ? (valA > valB ? 1 : -1) : (valA < valB ? 1 : -1);
  });
}

function paginateMembers(members) {
  const start = (memberPagination.page - 1) * memberPagination.limit;
  return members.slice(start, start + memberPagination.limit);
}

// ---------------------- FORM HANDLERS ----------------------

const bookForm = document.getElementById("book-form");
bookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const book = {
    title: document.getElementById("book-title").value,
    author: document.getElementById("book-author").value,
    genre: document.getElementById("book-genre").value,
    publishedYear: Number(document.getElementById("book-year").value),
    available: document.getElementById("book-available").value === "true"
  };

  addBook(book).then(() => {
    bookForm.reset();
    renderBooks();
  });
});

const memberForm = document.getElementById("member-form");
memberForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const member = {
    name: document.getElementById("member-name").value,
    membershipDate: document.getElementById("member-date").value,
    active: document.getElementById("member-active").value === "true"
  };

  addMember(member).then(() => {
    memberForm.reset();
    renderMembers();
  });
});

// ---------------------- RENDER FUNCTIONS ----------------------

function renderBooks() {
  const container = document.getElementById("book-list");
  container.innerHTML = "";

  getAllBooks().then(books => {
    saveState();
    let filtered = applyBookFilters(books);
    let sorted = sortBooks(filtered);
    let paginated = paginateBooks(sorted);

    paginated.forEach(book => {
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${book.title}</strong> by ${book.author} (${book.genre}, ${book.publishedYear})
        - ${book.available ? "Available" : "Not Available"}
        <button onclick="deleteBook('${book.firebaseId}').then(renderBooks)">Delete</button>
      `;
      container.appendChild(div);
    });
  });
}

function renderMembers() {
  const container = document.getElementById("member-list");
  container.innerHTML = "";

  getAllMembers().then(members => {
    saveState();
    let filtered = applyMemberFilters(members);
    let sorted = sortMembers(filtered);
    let paginated = paginateMembers(sorted);

    paginated.forEach(member => {
      const div = document.createElement("div");
      div.innerHTML = `
        <strong>${member.name}</strong> - Joined: ${member.membershipDate}
        - ${member.active ? "Active" : "Inactive"}
        <button onclick="deleteMember('${member.firebaseId}').then(renderMembers)">Delete</button>
      `;
      container.appendChild(div);
    });
  });
}

renderBooks();
renderMembers();