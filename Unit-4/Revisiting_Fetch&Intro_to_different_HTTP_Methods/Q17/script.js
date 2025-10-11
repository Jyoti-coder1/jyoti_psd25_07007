const apiURL = 'https://6888d771adf0e59551bba17f.mockapi.io/students';
const studentList = document.getElementById('student-list');
const form = document.getElementById('student-form');
const loading = document.getElementById('loading');
const error = document.getElementById('error');

async function fetchStudents() {
    loading.style.display = 'block';
    error.textContent = '';
    try {
        const res = await fetch(apiURL);
        const students = await res.json();
        studentList.innerHTML = '';
        students.forEach(displayStudent);
    }
    catch (err) {
        error.textContent = 'Failed to load students';
    }
    finally {
        loading.style.display = 'none';
    }
}

function displayStudent(student) {
    const card = document.createElement('div');
    card.className = 'student-card';
    card.innerHTML = `
    <img src="${student.avatar}" alt="Avatar">
    <div>
      <strong>${student.name}</strong><br>
      Age: ${student.age}<br>
      Course: ${student.course}<br>
      <button onclick="editStudent('${student.id}')">Edit</button>
      <button onclick="deleteStudent('${student.id}')">Delete</button>
    </div>
  `;
    studentList.appendChild(card);
}

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const age = +document.getElementById('age').value;
    const course = document.getElementById('course').value.trim();

    if (!name || !course || isNaN(age)) {
        error.textContent = 'Please enter valid data.';
        return;
    }

    const newStudent = {
        name,
        age,
        course,
        avatar: `https://i.pravatar.cc/150?img=${Math.floor(Math.random() * 70)}`
    };

    try {
        await fetch(apiURL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newStudent)
        });
        form.reset();
        fetchStudents();
    }
    catch (err) {
        error.textContent = 'Failed to add student.';
    }
});

async function deleteStudent(id) {
    try {
        await fetch(`${apiURL}/${id}`, { method: 'DELETE' });
        fetchStudents();
    }
    catch {
        error.textContent = 'Failed to delete student.';
    }
}

async function editStudent(id) {
    const newName = prompt('Enter new name');
    const newAge = prompt('Enter new age');
    const newCourse = prompt('Enter new course');
    if (!newName || !newCourse || isNaN(+newAge)) {
        alert('Invalid input.');
        return;
    }

    const updatedStudent = {
        name: newName,
        age: +newAge,
        course: newCourse
    };

    try {
        await fetch(`${apiURL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedStudent)
        });
        fetchStudents();
    } catch {
        error.textContent = 'Failed to update student.';
    }
}

fetchStudents();