function getAccessMessage(user) {
    if (user.role === "admin") {
        return user.active ? "Admin Access Granted!" : "Admin Access Revoked";
    }
    else if (user.role === "user") {
        return user.active ? "User Access Granted!" : "User Access Revoked";
    }
    else {
        return "Access Denied";
    }
}
let user1 = { name: "Alice", role: "admin", active: false };
console.log(getAccessMessage(user1));
let user2 = { name: "Bob", role: "user", active: true };
console.log(getAccessMessage(user2));

/* Title:Dynamic User Role Message with Object Properties

Problem Statement: Write a program that dynamically generates a message
for different user roles stored in an object. The object contains a
user's name, role, and active status. Based on the role and active
status, print the following messages:

1. If the user is "admin" and is active, print "Admin Access Granted!".
2. If the user is "admin" and is not active, print "Admin Access Revoked".
3. If the user is "user" and is active, print "User Access Granted!".
4. If the user is "user" and is not active, print "User Access Revoked".
5. For any other role, print "Access Denied".

Use the ternary operator to handle this logic.

Example:
let user = { name: "Alice", role: "admin", active: false };
Output: "Admin Access Revoked"

let user = { name: "Bob", role: "user", active: true };
Output: "User Access Granted!"
*/