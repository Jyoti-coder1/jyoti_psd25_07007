// Abstract Beverage
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

// Sugar Decorator
class Sugar extends BeverageDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + " + Sugar";
    }

    getCost(): number {
        return this.beverage.getCost() + 10;
    }
}

// Honey Decorator
class Honey extends BeverageDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + " + Honey";
    }

    getCost(): number {
        return this.beverage.getCost() + 20;
    }
}

// Client Code: Sugar + Honey
const tea = new Honey(new Sugar(new GreenTea()));

console.log(tea.getDescription()); // Green Tea + Sugar + Honey
console.log(tea.getCost());        // 70