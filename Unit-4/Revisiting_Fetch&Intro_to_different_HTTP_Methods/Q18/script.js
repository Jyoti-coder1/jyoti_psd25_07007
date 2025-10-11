import { db, ref, push, set, onValue, remove } from './firebase-config.js';

// DOM Elements
const nameInput = document.getElementById("name");
const ageInput = document.getElementById("age");
const gradeInput = document.getElementById("grade");
const enrolledInput = document.getElementById("enrolled");
const addBtn = document.getElementById("add-student");
const studentList = document.getElementById("student-list");
const searchInput = document.getElementById("search");
const filterEnrolled = document.getElementById("filter-enrolled");
const filterGrade = document.getElementById("filter-grade");
const sortOption = document.getElementById("sort-option");
const themeToggle = document.getElementById("theme-toggle");

// Theme setup
document.body.classList.toggle("dark", localStorage.getItem("theme") === "dark");
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
});

// Add Student
addBtn.addEventListener("click", () => {
    const student = {
        name: nameInput.value.trim(),
        age: Number(ageInput.value),
        grade: gradeInput.value,
        enrolled: enrolledInput.checked
    };

    if (!student.name || !student.age) return alert("Please enter name and age");

    const studentRef = push(ref(db, 'students'));
    set(studentRef, student);

    nameInput.value = ageInput.value = '';
    enrolledInput.checked = false;
});

// Display Students with filtering, sorting, search
onValue(ref(db, 'students'), snapshot => {
    const data = snapshot.val();
    let students = [];
    for (let id in data) {
        students.push({ id, ...data[id] });
    }

    const searchVal = searchInput.value.toLowerCase();
    const enrolledVal = filterEnrolled.value;
    const gradeVal = filterGrade.value;
    const sortVal = sortOption.value;

    // Apply filters
    students = students.filter(s =>
        (enrolledVal === "all" || String(s.enrolled) === enrolledVal) &&
        (gradeVal === "all" || s.grade === gradeVal) &&
        s.name.toLowerCase().includes(searchVal)
    );

    // Sort
    if (sortVal === "name-asc") students.sort((a, b) => a.name.localeCompare(b.name));
    else if (sortVal === "age-asc") students.sort((a, b) => a.age - b.age);
    else if (sortVal === "age-desc") students.sort((a, b) => b.age - a.age);

    // Save filter/sort in localStorage
    localStorage.setItem("sort", sortVal);
    localStorage.setItem("enrolled", enrolledVal);
    localStorage.setItem("grade", gradeVal);

    // Render
    studentList.innerHTML = '';
    students.forEach(({ id, name, age, grade, enrolled }) => {
        const li = document.createElement('li');
        li.innerHTML = `
      <strong>${name}</strong> (Age: ${age}, Grade: ${grade}, Enrolled: ${enrolled})
      <button onclick="deleteStudent('${id}')">Delete</button>
    `;
        studentList.appendChild(li);
    });
});

// Delete student
window.deleteStudent = (id) => {
    remove(ref(db, 'students/' + id));
};

// Restore filter/sort options from localStorage
sortOption.value = localStorage.getItem("sort") || "name-asc";
filterEnrolled.value = localStorage.getItem("enrolled") || "all";
filterGrade.value = localStorage.getItem("grade") || "all";

// Re-fetch data on filter/search change
[searchInput, filterEnrolled, filterGrade, sortOption].forEach(input => {
    input.addEventListener("input", () => onValue(ref(db, 'students'), () => { }));
});