// Book.js
// Constructor function for creating Book objects
function Book(title, author, year) {
    this.title = title;
    this.author = author;
    this.year = year;
}
// Prototype method to get a summary of the book
Book.prototype.getSummary = function () {
    return `${this.title} by ${this.author}, published in ${this.year}`;
};
// Export the constructor function
module.exports = Book;