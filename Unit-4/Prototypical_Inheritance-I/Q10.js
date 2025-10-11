// 1. Car Constructor Function
function Car(make, model, year, type, isAvailable = true) {
    this.make = make;
    this.model = model;
    this.year = year;
    this.type = type;
    this.isAvailable = isAvailable;
}
// 2. Customer Constructor Function
function Customer(name) {
    this.name = name;
    this.rentedCars = [];
}
// 3. Customer Prototype Method: Rent a Car
Customer.prototype.rentCar = function(car) {
    if (car.isAvailable) {
        car.isAvailable = false;
        this.rentedCars.push(car);
        console.log(`${this.name} successfully rented ${car.make} ${car.model}`);
    }
    else {
        console.log(`${car.make} ${car.model} is already rented.`);
    }
};
// 4. PremiumCustomer Constructor Function (Inherits from Customer)
function PremiumCustomer(name, discountRate) {
    Customer.call(this, name); // Call Customer constructor
    this.discountRate = discountRate; // e.g., 0.1 for 10%
}
// Inherit from Customer prototype
PremiumCustomer.prototype = Object.create(Customer.prototype);
PremiumCustomer.prototype.constructor = PremiumCustomer;
// 5. Rental Price Calculation Function
function calculateRentalPrice(car, days, customer) {
    const basePricePerDay = 50;
    let multiplier = 1;
    switch (car.type) {
        case 'SUV':
            multiplier = 1.5;
            break;
        case 'Sedan':
            multiplier = 1.2;
            break;
        case 'Hatchback':
            multiplier = 1.0;
            break;
        default:
            multiplier = 1.0;
    }
    let total = basePricePerDay * multiplier * days;
    // Apply discount if PremiumCustomer
    if (customer instanceof PremiumCustomer) {
        total *= (1 - customer.discountRate);
    }
    return total;
}
// 6. Return Car Method with Async Delay
Customer.prototype.returnCar = function(car) {
    const index = this.rentedCars.indexOf(car);
    if (index > -1) {
        console.log(`${this.name} is returning ${car.make} ${car.model}...`);
        setTimeout(() => {
            car.isAvailable = true;
            this.rentedCars.splice(index, 1);
            console.log(`${car.make} ${car.model} has been returned and is now available.`);
        }, 2000); // 2 seconds delay
    }
    else {
        console.log(`${this.name} did not rent this car.`);
  }
};

// 7. Maintenance Function with Delay
function Maintenance(car, delay) {
    console.log(`Car ${car.make} ${car.model} is under maintenance...`);
    setTimeout(() => {
       car.isAvailable = true;
       console.log(`Maintenance completed for ${car.make} ${car.model}. Car is now available.`);
    }, delay);
}
// Creating Car Objects
const car1 = new Car('Toyota', 'Corolla', 2020, 'Sedan');
const car2 = new Car('Honda', 'CR-V', 2021, 'SUV');
const car3 = new Car('Hyundai', 'i20', 2022, 'Hatchback');
// Creating Customers
const regularCustomer = new Customer('Nitin');
const premiumCustomer = new PremiumCustomer('Jyoti', 0.1);
// Renting Cars
regularCustomer.rentCar(car1);
regularCustomer.rentCar(car1);
premiumCustomer.rentCar(car2);
// Calculating Prices
console.log(`Rental price for Nitin (3 days): $${calculateRentalPrice(car1, 3, regularCustomer)}`);
console.log(`Rental price for Jyoti (3 days with discount): $${calculateRentalPrice(car2, 3, premiumCustomer)}`);
// Returning Cars
setTimeout(() => {
    regularCustomer.returnCar(car1); // Should process after 2 sec
}, 1000);
// Maintenance Simulation
setTimeout(() => {
  Maintenance(car3, 3000); // Will be available after 3 seconds
}, 500);
// Demonstrate call, apply, bind
function printCustomerInfo(extra) {
  console.log(`Customer Name: ${this.name}. ${extra}`);
}
printCustomerInfo.call(regularCustomer, "This is via call");
printCustomerInfo.apply(premiumCustomer, ["This is via apply"]);
const boundInfo = printCustomerInfo.bind(regularCustomer, "This is via bind");
boundInfo();