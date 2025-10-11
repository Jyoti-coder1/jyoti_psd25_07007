
// main.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  set,
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
import {
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  signOut
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

// Firebase Config
const firebaseConfig = {
    apiKey: "AIzaSyAzE5ipE75Msqyy0UojOwLBh8we9H72FuU",
    authDomain: "ideahub-f54f3.firebaseapp.com",
    databaseURL: "https://ideahub-f54f3-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "ideahub-f54f3",
    storageBucket: "ideahub-f54f3.firebasestorage.app",
    messagingSenderId: "345806477888",
    appId: "1:345806477888:web:4352d07f7524a46269dda5"
  };

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

// DOM Elements
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");
const submitBtn = document.getElementById("submitBtn");
const modal = document.getElementById("ideaModal");
const ideaForm = document.getElementById("ideaForm");
const ideaFeed = document.getElementById("ideaFeed");
const searchInput = document.getElementById("searchInput");
const sortSelect = document.getElementById("sortSelect");
const loadMoreBtn = document.getElementById("loadMoreBtn");

let currentUser = null;
let ideasList = [];
let renderLimit = 5;

// Auth Handling
onAuthStateChanged(auth, (user) => {
  currentUser = user;
  if (user) {
    userInfo.textContent = `Welcome, ${user.displayName}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
    submitBtn.style.display = "inline-block";
  }
  else {
    userInfo.textContent = "Not logged in";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
    submitBtn.style.display = "none";
  }
});

//Auth Events
loginBtn.onclick = () => signInWithPopup(auth, provider);
logoutBtn.onclick = () => signOut(auth);

//Submit Idea Modal
submitBtn.onclick = () => {
  modal.style.display = "block";
};

document.getElementById("closeModal").onclick = () => {
  modal.style.display = "none";
};

ideaForm.onsubmit = async (e) => {
  e.preventDefault();
  const title = e.target.elements.title.value.trim();
  const description = e.target.elements.description.value.trim();

  if (!title || !description || !currentUser) return;

  const newIdea = {
    title,
    description,
    upvotes: 0,
    createdAt: Date.now(),
    creator: currentUser.uid,
    upvoters: {}
  };

  await push(ref(db, "ideas"), newIdea);
  ideaForm.reset();
  modal.style.display = "none";
};

// Fetch & Render Ideas
onValue(ref(db, "ideas"), (snapshot) => {
  const data = snapshot.val();
  const search = searchInput.value.toLowerCase();
  const sort = sortSelect.value;

  if (!data) {
    ideaFeed.innerHTML = "<p>No ideas found.</p>";
    loadMoreBtn.style.display = "none";
    return;
  }

  ideasList = Object.entries(data).map(([id, val]) => ({ id, ...val }));

  // Filter
  if (search) {
    ideasList = ideasList.filter(idea =>
      idea.title.toLowerCase().includes(search)
    );
  }

  // Sort
  if (sort === "popular") {
    ideasList.sort((a, b) => b.upvotes - a.upvotes);
  }
  else {
    ideasList.sort((a, b) => b.createdAt - a.createdAt);
  }

  renderLimit = 5; // Reset render limit on reload
  renderIdeas();
});

//Render Ideas
function renderIdeas() {
  ideaFeed.innerHTML = "";

  const toRender = ideasList.slice(0, renderLimit);
  toRender.forEach(idea => {
    const div = document.createElement("div");
    div.className = "idea-card";
    div.innerHTML = `
      <h3>${idea.title}</h3>
      <p>${idea.description}</p>
      <p><span id="votes-${idea.id}">${idea.upvotes}</span></p>
      ${currentUser && !idea.upvoters?.[currentUser.uid]
        ? `<button onclick="upvote('${idea.id}')">Upvote</button>`
        : ""}
    `;
    ideaFeed.appendChild(div);
  });

  loadMoreBtn.style.display = renderLimit < ideasList.length ? "block" : "none";
}

//Upvote Logic
window.upvote = async (id) => {
  if (!currentUser) return;
  const idea = ideasList.find(i => i.id === id);
  if (!idea || idea.upvoters?.[currentUser.uid]) return;

  const updates = {
    upvotes: idea.upvotes + 1,
    [`upvoters/${currentUser.uid}`]: true
  };

  await update(ref(db, `ideas/${id}`), updates);
};

// Search & Sort
searchInput.oninput = () => {
  renderLimit = 5;
  renderIdeas();
};

sortSelect.onchange = () => {
  renderLimit = 5;
  renderIdeas();
};

//Load More
loadMoreBtn.onclick = () => {
  renderLimit += 5;
  renderIdeas();
};