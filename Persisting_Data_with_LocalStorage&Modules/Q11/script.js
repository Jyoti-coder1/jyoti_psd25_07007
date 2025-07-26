//Get Elements
const textarea = document.getElementById("notesArea");
const saveBtn = document.getElementById("saveBtn");
const loadBtn = document.getElementById("loadBtn");
const clearBtn = document.getElementById("clearBtn");

//Load notes automatically if they exist
let saved = localStorage.getItem("notes");
if(saved) {
    textarea.value = saved;
}

//Save button functionally
saveBtn.addEventListener("click", function () {
    if (textarea.value.trim() !== "") {
        localStorage.setItem("notes", textarea.value);
    }
    else {
        alert("Empty notes cannot be saved.");
    }
});

//Load button functionally
loadBtn.addEventListener("click", function () {
    let savedNotes = localStorage.getItem("notes");
    if(savedNotes) {
        textarea.value = savedNotes;
    }
    else {
        alert("No saved Notes.");
    }
});

//Clear button functionally
clearBtn.addEventListener("click", function() {
    localStorage.removeItem("notes");
    textarea.value = "";
});