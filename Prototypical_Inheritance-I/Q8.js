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
myDog.sound();
console.log(myDog instanceof Dog);
console.log(myDog instanceof Animal);
console.log(Object.getPrototypeOf(myDog) === Dog.prototype);
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype);