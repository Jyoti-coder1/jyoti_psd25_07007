// Member Constructor Function
function Member(name) {
    this.name = name;
    this.borrowedBooks = [];
}
// Method to borrow a book (for regular members)
Member.prototype.borrowBook = function (book) {
    if (!book.isAvailable) {
        console.log(`${book.title} is already borrowed.`);
        return;
    }
    if (this.borrowedBooks.length >= 3) {
        console.log(`${this.name} has reached the borrowing limit (3 books).`);
        return;
    }
    book.isAvailable = false;
    this.borrowedBooks.push(book.title);
    console.log(`${this.name} successfully borrowed "${book.title}".`);
};
module.exports = Member;