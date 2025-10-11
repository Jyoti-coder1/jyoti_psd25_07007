function manageStudents() {
    let students = ["Alice", "Bob", "Charlie"];
    students.splice(1, 0, "David");
    console.log("Is 'Eve' in the list?", students.includes("Eve"));
    console.log("Is 'Bob' in the list?", students.includes("Bob"));
    console.log("Student list as string:", students.join(","));
}
manageStudents();
