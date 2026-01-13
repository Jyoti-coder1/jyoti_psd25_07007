import Device from "../Device";

class SamsungLaptop implements Device {
    specifications(): void {
        console.log("Samsung Laptop");
        console.log("Model: Galaxy Book");
        console.log("Processor: Intel i7");
        console.log("RAM: 16GB");
        console.log("OS: Windows");
    }
}

export default SamsungLaptop;