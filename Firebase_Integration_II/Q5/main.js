import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import {
    getFirestore,
    collection,
    getDocs,
    query,
    where,
    orderBy
} from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyA7W1rgUYCQiis1QV5WMJM7J3IBF9FE9J0",
    authDomain: "novels-list.firebaseapp.com",
    projectId: "novels-list",
    storageBucket: "novels-list.firebasestorage.app",
    messagingSenderId: "954488564054",
    appId: "1:954488564054:web:b88bc10805f74f59354ef7"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const novelRef = collection(db, "novels");

const searchInput = document.getElementById("search");
const filterYear = document.getElementById("filter-year");
const sortPrice = document.getElementById("sort-price");
const novelList = document.getElementById("novel-list");

async function fetchNovels() {
    let q = novelRef;

    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        const allDocs = await getDocs(novelRef);
        const filteredDocs = allDocs.docs.filter(doc => {
            const data = doc.data();
            return data.title.toLowerCase().includes(searchTerm) ||
                data.author.toLowerCase().includes(searchTerm);
        });
        render(filteredDocs.map(doc => doc.data()));
        return;
    }

    if (filterYear.value) {
        q = query(q, where("release_year", "==", Number(filterYear.value)));
    }

    if (sortPrice.value === "asc") {
        q = query(q, orderBy("price", "asc"));
    } else if (sortPrice.value === "desc") {
        q = query(q, orderBy("price", "desc"));
    }

    const querySnapshot = await getDocs(q);
    const novels = querySnapshot.docs.map(doc => doc.data());
    console.log("Fetched novels");
    render(novels);
}

function render(data) {
    novelList.innerHTML = "";
    data.forEach(novel => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${novel.title}</td>
            <td>${novel.author}</td>
            <td>$${novel.price.toFixed(2)}</td>
            <td>${novel.release_year}</td>
            <td>${novel.genre}</td>
        `;
        novelList.appendChild(row);
    });
}

searchInput.addEventListener("input", fetchNovels);
filterYear.addEventListener("change", fetchNovels);
sortPrice.addEventListener("change", fetchNovels);

fetchNovels();