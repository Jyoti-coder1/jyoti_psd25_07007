// Demonstrating Runtime Polymorphism in TypeScript

// Base Class
class Animal {
    makeSound(): void {
        console.log("Some sound");
    }
}

// Derived Class
class Dog extends Animal {
    makeSound(): void {
        console.log("Bark!");
    }
}

// Function that demonstrates polymorphism
function makeAnimalSound(animal: Animal): void {
    animal.makeSound();
}

// Usage Examples
const genericAnimal = new Animal();
makeAnimalSound(genericAnimal); // Output: Some sound

const dog = new Dog();
makeAnimalSound(dog); // Output: Bark! — demonstrates runtime polymorphism