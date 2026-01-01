// Strategy Pattern: Payment Processing System

// Step 1: Define the PaymentStrategy interface
interface PaymentStrategy {
    performPayment(amount: number): void;
}

// Step 2: Create concrete payment strategies
class CardPayment implements PaymentStrategy {
    performPayment(amount: number): void {
        console.log(`Rs.${amount} Payment performed using Card`);
    }
}

class UPIPayment implements PaymentStrategy {
    performPayment(amount: number): void {
        console.log(`Rs.${amount} Payment performed using UPI`);
    }
}

class BitcoinPayment implements PaymentStrategy {
    performPayment(amount: number): void {
        console.log(`Rs.${amount} Payment performed using Bitcoin`);
    }
}

// Step 3: Create the Payment context class
class Payment {
    private paymentStrategy: PaymentStrategy;

    constructor(paymentStrategy: PaymentStrategy) {
        this.paymentStrategy = paymentStrategy;
    }

    setStrategy(paymentStrategy: PaymentStrategy): void {
        this.paymentStrategy = paymentStrategy;
    }

    process(amount: number): void {
        this.paymentStrategy.performPayment(amount);
    }
}

// Step 4: Usage (Client Code)
const payment = new Payment(new CardPayment());
payment.process(1000); // Rs.1000 Payment performed using Card

payment.setStrategy(new BitcoinPayment());
payment.process(2000); // Rs.2000 Payment performed using Bitcoin

payment.setStrategy(new UPIPayment());
payment.process(500); // Rs.500 Payment performed using UPI