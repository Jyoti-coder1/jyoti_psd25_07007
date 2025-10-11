// books.js
// This module defines and exports an array of Book instances
const Book = require('./Q7BookPrototype');
// Create multiple Book instances
const books = [
    new Book("To Kill a Mockingbird", "Harper Lee", 1960),
    new Book("1984", "George Orwell", 1949),
    new Book("The Great Gatsby", "F. Scott Fitzgerald", 1925),
    new Book("The Hobbit", "J.R.R. Tolkien", 1937),
];
// Export the array of book instances
module.exports = books;