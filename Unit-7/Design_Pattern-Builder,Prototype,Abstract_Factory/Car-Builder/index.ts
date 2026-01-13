import CarBuilder from "./CarBuilder";

const car = new CarBuilder()
    .setBrand("Tesla Model S")
    .setEngine("Electric")
    .setColor("Black")
    .addSunroof()
    .enableAutomaticTransmission()
    .build();

car.display();