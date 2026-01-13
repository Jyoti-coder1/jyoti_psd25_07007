import Car from "./Car";

class CarBuilder {
    private brand: string = "Generic";
    private engine: string = "Petrol";
    private color: string = "White";
    private sunroof: boolean = false;
    private automaticTransmission: boolean = false;

    setBrand(brand: string): this {
        this.brand = brand;
        return this;
    }

    setEngine(engine: string): this {
        this.engine = engine;
        return this;
    }

    setColor(color: string): this {
        this.color = color;
        return this;
    }

    addSunroof(): this {
        this.sunroof = true;
        return this;
    }

    enableAutomaticTransmission(): this {
        this.automaticTransmission = true;
        return this;
    }

    build(): Car {
        return new Car(
            this.brand,
            this.engine,
            this.color,
            this.sunroof,
            this.automaticTransmission
        );
    }
}

export default CarBuilder;