// Abstract Beverage class
abstract class Beverage {
    abstract getDescription(): string;
    abstract getCost(): number;
}

// Concrete Beverage
class GreenTea extends Beverage {
    getDescription(): string {
        return "Green Tea";
    }

    getCost(): number {
        return 40;
    }
}

// Abstract Decorator
abstract class BeverageDecorator extends Beverage {
    constructor(protected beverage: Beverage) {
        super();
    }

    abstract getDescription(): string;
    abstract getCost(): number;
}

// Concrete Decorator: Sugar
class Sugar extends BeverageDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + " + Sugar";
    }

    getCost(): number {
        return this.beverage.getCost() + 10;
    }
}

// Testing the implementation
const tea = new Sugar(new GreenTea());
console.log(tea.getDescription()); // Green Tea + Sugar
console.log(tea.getCost());        // 50