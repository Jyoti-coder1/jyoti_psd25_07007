import Device from "../Device";

class SamsungPhone implements Device {
    specifications(): void {
        console.log("Samsung Phone");
        console.log("Model: Galaxy S23");
        console.log("Processor: Snapdragon");
        console.log("OS: Android");
    }
}

export default SamsungPhone;