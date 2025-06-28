function processData(students) {
    const filteredStudents = students.filter(student => {
       return student.name.trim().toLowerCase().includes('alice') && student.score >= 50;
    });
    const sortedStudents = filteredStudents.sort((a, b) => b.score - a.score);
    const rankedStudents = sortedStudents.map((student, index) => {
        return {
            name: student.name.trim().toUpperCase(),
            score: student.score,
            rank: index + 1
        };
    });
    const totalPassed = rankedStudents.reduce((acc) => acc + 1, 0);
    return {
        totalPassed,
        students: rankedStudents
    };
}
const students = [
    { name: ' Alice Cooper ', score: 85 },
    { name: 'bob alice', score: 42 },
    { name: 'Alice Wonderland', score: 70 },
    { name: 'david', score: 30 }
];
const result = processData(students);
console.log(result);