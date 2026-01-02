// Abstract Beverage
abstract class Beverage {
    abstract getDescription(): string;
    abstract getCost(): number;
}

// Base Beverages
class Espresso extends Beverage {
    getDescription(): string {
        return "Espresso";
    }

    getCost(): number {
        return 80;
    }
}

class LemonTea extends Beverage {
    getDescription(): string {
        return "LemonTea";
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

// Sugar Topping
class Sugar extends BeverageDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + " + Sugar";
    }

    getCost(): number {
        return this.beverage.getCost() + 10;
    }
}

// Honey Topping
class Honey extends BeverageDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + " + Honey";
    }

    getCost(): number {
        return this.beverage.getCost() + 20;
    }
}

// WhippedCream Topping
class WhippedCream extends BeverageDecorator {
    getDescription(): string {
        return this.beverage.getDescription() + " + WhippedCream";
    }

    getCost(): number {
        return this.beverage.getCost() + 15;
    }
}

// Client Code
const order1 = new Honey(new WhippedCream(new Espresso()));
const order2 = new Sugar(new Sugar(new LemonTea()));

console.log("Order 1:", order1.getDescription());
// Espresso + WhippedCream + Honey
console.log("Cost 1: ₹", order1.getCost());
// ₹115

console.log("Order 2:", order2.getDescription());
// LemonTea + Sugar + Sugar
console.log("Cost 2: ₹", order2.getCost());
// ₹60