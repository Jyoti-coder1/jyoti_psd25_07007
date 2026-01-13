import Device from "../Device";

class AppleLaptop implements Device {
    specifications(): void {
        console.log("Apple Laptop");
        console.log("Model: MacBook Pro");
        console.log("Chip: M2");
        console.log("RAM: 16GB");
        console.log("OS: macOS");
    }
}

export default AppleLaptop;