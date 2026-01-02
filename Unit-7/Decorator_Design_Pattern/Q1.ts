// Abstract Beverage class
abstract class Beverage {
    abstract getDescription(): string;
    abstract getCost(): number;
}

// Concrete Beverage class
class GreenTea extends Beverage {
    getDescription(): string {
        return "Green Tea";
    }

    getCost(): number {
        return 40;
    }
}

// Testing the implementation
const tea = new GreenTea();
console.log(tea.getDescription()); // Green Tea
console.log(tea.getCost());        // 40