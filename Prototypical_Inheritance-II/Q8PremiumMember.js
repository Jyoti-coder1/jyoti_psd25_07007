const Member = require('./Q8MemberConstructor');
// PremiumMember Constructor inherits from Member
function PremiumMember(name) {
    Member.call(this, name); // Call the parent constructor
    this.specialCollectionAccess = true;
}
// Inherit prototype from Member
PremiumMember.prototype = Object.create(Member.prototype);
PremiumMember.prototype.constructor = PremiumMember;
// Override borrowBook method to allow borrowing up to 5 books
PremiumMember.prototype.borrowBook = function (book) {
    if (!book.isAvailable) {
        console.log(`${book.title} is already borrowed.`);
        return;
    }
    if (this.borrowedBooks.length >= 5) {
        console.log(`${this.name} has reached the borrowing limit (5 books).`);
        return;
    }
    // Reuse Member borrowBook method using call
    Member.prototype.borrowBook.call(this, book);
};
module.exports = PremiumMember;