// Book Constructor Function
function Book(title, author, isAvailable = true) {
    this.title = title;
    this.author = author;
    this.isAvailable = isAvailable;
}
// Export for modular code
module.exports = Book;