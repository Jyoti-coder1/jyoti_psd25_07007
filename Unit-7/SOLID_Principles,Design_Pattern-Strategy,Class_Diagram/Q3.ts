// Liskov Substitution Principle (LSP)
// Fixing the violation by using behavior-based interfaces

interface Flyable {
    fly(): void;
}

class Sparrow implements Flyable {
    fly(): void {
        console.log("Flying...");
    }
}

class Ostrich {
    walk(): void {
        console.log("Ostrich is walking");
    }
}

// Usage
const flyingBird: Flyable = new Sparrow();
flyingBird.fly();

const ostrich = new Ostrich();
ostrich.walk();