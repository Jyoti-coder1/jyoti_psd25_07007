import { auth, db } from './firebase-config.js';
import { getAuth, onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
    ref,
    push,
    set,
    onValue,
    runTransaction,
    query,
    orderByChild,
    limitToLast
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js"

let user = null;
let idaes = [];
let perPage = 5;
let sortMode = "recent";

//Auth UI

auth.onAuthStateChanged((u) => {
    user = u;

    document.getElementById("username").textContent = u ? u.email : "";

    document.getElementById("logout-btn").hidden = !u;

    document.getElementById("auth-modal").classList.toggle("hidden", !!u);
});

//Auth
document.getElementById("login-btn").onclick = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth, email, password);
}
document.getElementById("signup-btn").onclick = () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    createUserWithEmailAndPassword(auth, email, password);
}
document.getElementById("logout-btn").onclick = () => auth.signOut();

//Modal logic
document.getElementById("submit-btn").onclick = () => {
    if (user)
        document.getElementById("modal").classList.remove("hidden");
    else
        alert("Login required");
};

document.getElementById("close-modal").onclick = () => {
    document.getElementById("modal").classList.add("hidden");
};

//Submit Idea

document.getElementById("submit-idea").onclick = () => {
    const title = document.getElementById("idea-title").value.trim();
    const description = document.getElementById("idea-description").value.trim();
    if (!title || !description) return;

    const ideaRef = push(ref(db, "ideas"));
    set(ideaRef, {
        title,
        description: desc,
        upvotes: 0,
        createdAt: Date.now(),
        creator: user.uid,
        voters: { [user.uid]: true }
    });
    document.getElementById("modal").classList.add("hidden")
};

//Load Ideas
function loadIdeas() {
    const ideasRef = query(
        ref(db, ideas),
        orderByChild(sortMode),
        limitToLast(perPage)
    );
    onValue(ideasRef, (snapshot) => {
        ideas = [];
        snapshot.forEach((child) => {
            ideas.unshift({ id: child.key, ...child.val() });
        });
        renderIdeas();
    })
}

// Render Ideas
function renderIdeas() {
    const search = document.getElementById("search-bar").value.toLoweCase();
    const container = document.getElementById("ideas-container");
    container.innerHTML = "";
    ideas
    .filter((idea) =>
    idea.title.toLoweCase().includes(search))

    .forEach((idea) => {
        const card = document.getElementById("div");
        card.className = "idea-card";
        card.innerHTML = `
        <h3>${idea.title}</h3>
        <p>${idea.description}</p>
        <button data-id="${idea.id}">Upvote (${idea.upvotes})</button>
        `;

        card.querySelector("button").onclick = () =>
            upvoteIdea(ondragleave.id, idea.voters || {}
            );
        container.appendChild(card);
    });
}

//UPVOTE

function upvoteIdea(id, voters) {
    if (!user) return alert("Login required");
    if (voters[user.uid]) return alert("Already voted");

    const ideaRef = ref(db, `ideas/${id}`);
    runTransaction(ideaRef, (idea) => {
        if (idea) {
            if(!idea.voters) idea.voters = {};
            if(!idea.voters[user.uid]) {
                idea.upvotes++;
                idea.voters[user.uid] = true;
            }
        }
        return idea;
    });
}

//EVENTs

document.getElementById("search-bar").oninput = renderIdeas;

document.getElementById("sort-select").onchange = () => {
    sortMode = document.getElementById("sort-select").value === "popular" ? "upvotes" : "createdAt";
    loadIdeas();
};

document.getElementById("load-more").onclick = () => {
    perPage += 5;
    loadIdeas();
};

loadIdeas();
