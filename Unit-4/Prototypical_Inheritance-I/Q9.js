// Constructor function for Person
function Person(name, age) {
  this.name = name;
  this.age = age;
}

// Adding introduce method to Person prototype
Person.prototype.introduce = function () {
  console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
};

// Constructor function for Employee
function Employee(name, age, jobTitle) {
  // Call the Person constructor to initialize name and age
  Person.call(this, name, age);
  this.jobTitle = jobTitle;
}
// Set up prototypical inheritance
Employee.prototype = Object.create(Person.prototype);
// Reset the constructor from Person to Employee
//Employee.prototype.constructor = Employee;

// Adding work method to Employee prototype
Employee.prototype.work = function () {
  console.log(`${this.name} is working as a ${this.jobTitle}.`);
};
// ------------------------------------------
// Demonstration
// 1. Create an instance of Person
const person1 = new Person("Nitin", 24);
// 2. Create an instance of Employee
const employee1 = new Employee("Jyoti", 24, "Software Developer");
// 3. Call introduce on both instances
person1.introduce();
employee1.introduce();
// 4. Call work on the Employee instance
employee1.work();