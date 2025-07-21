let studentScores = {
    John: 85,
    Emma: 92,
    Sam: 67,
    Bob: 45
};
for (let student in studentScores) {
    let score = studentScores[student];
    let grade;
    if (score >= 90) {
        grade = "A";
    }
    else if (score >= 80 && score < 90) {
        grade = "B";
    }
    else if (score >= 70 && score < 80) {
        grade = "C";
    }
    else if (score >= 60 && score < 70) {
        grade = "D";
    }
    else {
        grade = "F";
    }
    console.log(student + "-" + grade);
}

/*Title:Student Grades Based on Score

Problem Statement: Write a program that classifies students based on
their scores stored in an object. The object contains student names as
keys and their scores as values. You need to print each student's name
along with their grade based on the following conditions:

1. Score >= 90 → "A"
2. Score >= 80 and < 90 → "B"
3. Score >= 70 and < 80 → "C"
4. Score >= 60 and < 70 → "D"
5. Score 60 → "F"

You must use a for-in loop to iterate through the object.

Example:
let studentScores = {
    John: 85,
    Emma: 92,
    Sam: 67,
    Bob: 45
};

Output:
John - B
Emma - A
Sam - D
Bob - F
*/