// Abstract Beverage
abstract class Beverage {
    abstract getDescription(): string;
    abstract getCost(): number;
}

// Concrete Beverages
class GreenTea extends Beverage {
    getDescription(): string {
        return "Green Tea";
    }

    getCost(): number {
        return 40;
    }
}

class Coffee extends Beverage {
    getDescription(): string {
        return "Coffee";
    }

    getCost(): number {
        return 50;
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

// WhippedCream Decorator
class WhippedCream extends BeverageDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + " + WhippedCream";
    }

    getCost(): number {
        return this.beverage.getCost() + 15;
    }
}

// Client Code
const myDrink = new WhippedCream(
    new Honey(
        new Sugar(
            new Coffee()
        )
    )
);

console.log(myDrink.getDescription()); // Coffee + Sugar + Honey + WhippedCream
console.log(myDrink.getCost());        // 95