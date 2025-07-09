function Animal() {
    this.type = "Animal";
}
Animal.prototype.sound = function () {
  console.log("Animal sound");
};
function Dog() {
  Animal.call(this);
  this.type = "Dog";
}
Dog.prototype = Object.create(Animal.prototype);
Dog.prototype.constructor = Dog;
Dog.prototype.sound = function () {
  console.log("Bark");
};
const myDog = new Dog();
console.log("Before deleting Dog.prototype.sound:");
myDog.sound();
delete Dog.prototype.sound;
console.log("After deleting Dog.prototype.sound:");
myDog.sound();