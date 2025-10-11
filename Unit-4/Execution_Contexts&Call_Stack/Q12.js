const library = {
  books: [
    { title: "The Hobbit", author: "J.R.R. Tolkien", year: 1937 }
  ],

  addBook(book) {
    const { title, author, year } = book;

    if (!title || !author || !year) {
      console.log("Book information is incomplete. ");
      return;
    }
    if (this.books.find(book => book.title === title)) {
      console.log("Book with this title already exists .");
      return;
    }

    this.books.push(book);
    console.log("Book added successfully: " + title);
  },

  findBookByTitle(title) {
    return this.books.find(book => book.title === title);
  },

  removeBook(title) {
    const index = this.books.findIndex(book => book.title === title);

if (index !== -1) {

this.books.splice(index, 1);

} else {

console.log("Book not found.");

} } };
library.addBook({ author: "George Orwell", year: 1949 });
library.addBook({ title: "1984", author: "George Orwell", year: 1949 });
library.addBook({ title: "1984", author: "George Orwell", year: 1949 });
const foundBook = library.findBookByTitle("1984");
console.log("Found Book:", foundBook);
library.removeBook("1984");
library.removeBook("1984");
console.log("Books in Library:", library.books.length);