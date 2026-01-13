class Car {
    brand: string;
    engine: string;
    color: string;
    sunroof: boolean;
    automaticTransmission: boolean;

    constructor(
        brand: string,
        engine: string,
        color: string,
        sunroof: boolean,
        automaticTransmission: boolean
    ) {
        this.brand = brand;
        this.engine = engine;
        this.color = color;
        this.sunroof = sunroof;
        this.automaticTransmission = automaticTransmission;
    }

    display(): void {
        console.log("🚗 Car Details");
        console.log(`Brand: ${this.brand}`);
        console.log(`Engine: ${this.engine}`);
        console.log(`Color: ${this.color}`);
        console.log(`Sunroof: ${this.sunroof ? "Yes" : "No"}`);
        console.log(
            `Automatic Transmission: ${this.automaticTransmission ? "Yes" : "No"}`
        );
    }
}

export default Car;