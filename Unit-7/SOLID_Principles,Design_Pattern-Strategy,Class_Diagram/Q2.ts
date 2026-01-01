// Open/Closed Principle (OCP)
// Shipping cost calculator using Strategy Pattern

// Strategy Interface
interface ShippingStrategy {
    calculate(): number;
}

// Concrete Strategies
class StandardShipping implements ShippingStrategy {
    calculate(): number {
        return 50;
    }
}

class ExpressShipping implements ShippingStrategy {
    calculate(): number {
        return 100;
    }
}

// Context Class
class Shipping {
    private strategy: ShippingStrategy;

    constructor(strategy: ShippingStrategy) {
        this.strategy = strategy;
    }

    calculate(): number {
        return this.strategy.calculate();
    }
}

// Usage
const standardShipping = new Shipping(new StandardShipping());
console.log(standardShipping.calculate()); // 50

const expressShipping = new Shipping(new ExpressShipping());
console.log(expressShipping.calculate()); // 100