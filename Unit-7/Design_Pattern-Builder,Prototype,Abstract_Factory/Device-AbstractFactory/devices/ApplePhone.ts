import Device from "../Device";

class ApplePhone implements Device {
    specifications(): void {
        console.log("Apple Phone");
        console.log("Model: iPhone 15");
        console.log("Chip: A17 Bionic");
        console.log("OS: iOS");
    }
}

export default ApplePhone;