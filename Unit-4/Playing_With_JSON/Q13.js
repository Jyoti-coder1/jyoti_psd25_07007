function manageStudents() {
    let students = ["Alice", "Bob", "Charlie"];
    students.splice(1, 0, "David");
    console.log("Is Eve in the list?", students.includes("Eve"));
    console.log("Student list:", students.join(", "));
    students.splice(students.length, 0, "Eve");
    console.log("After adding Eve at end:", students.join(", "));
    console.log("Is Eve in the list?", students.includes("Eve"));
    students.splice(0, 0, "Frank");
    console.log("After adding Frank at start:", students.join(", "));
    console.log("Is Frank in the list?", students.includes("Frank"));
    students.splice(3, 0, "Grace");
    console.log("After adding Grace at index 3:", students.join(", "));
    console.log("Is Grace in the list?", students.includes("Grace"));
    console.log("Final student array:", students);
}
manageStudents();