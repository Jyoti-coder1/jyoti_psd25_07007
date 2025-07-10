// app.js
// Imports the array of book objects from books.js
const books = require('./Q7books'); 
// Use map to create an array of book summaries
const summaries = books.map(book => book.getSummary());
// Log each summary to the console
console.log("Book Summaries:");
summaries.forEach(summary => {
    console.log(summary)
});