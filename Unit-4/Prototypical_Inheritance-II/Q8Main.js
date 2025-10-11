const Book = require('./Q8BookConstructor');
const Member = require('./Q8MemberConstructor');
const PremiumMember = require('./Q8PremiumMember');
// Create book objects
const book1 = new Book("Think and Grow Rich", "Napolean Hill");
const book2 = new Book("You Can win", "Shiv Khera");
const book3 = new Book("The Power of Now", "Eckhart Tolle");
const book4 = new Book("Start With Why", "Simon Sinek");
const book5 = new Book("Man's Search For Meaning", "Viktor E. Frankl");
const book6 = new Book("Atomic Habits", "James Clear");
// Create members
const nitin = new Member("Nitin"); // Regular member
const jyoti = new PremiumMember("Jyoti"); // Premium member
// Regular member borrowing books
nitin.borrowBook(book1);
nitin.borrowBook(book2);
nitin.borrowBook(book3);
nitin.borrowBook(book4);
console.log(nitin.borrowedBooks); // Should list 3 titles
// Premium member borrowing books
jyoti.borrowBook(book4); 
jyoti.borrowBook(book5);
jyoti.borrowBook(book6);
jyoti.borrowBook(book2);
jyoti.borrowBook(book3);
jyoti.borrowBook(book1);
console.log(jyoti.borrowedBooks);
// Using bind to create a bound function
const boundBorrow = nitin.borrowBook.bind(nitin, book5);
boundBorrow(); // Alice should not be allowed to borrow (limit exceeded)
console.log(nitin.borrowedBooks);