import AppleFactory from "./AppleFactory";
import SamsungFactory from "./SamsungFactory";

const appleFactory = new AppleFactory();
const samsungFactory = new SamsungFactory();

// Create devices
const appleLaptop = appleFactory.createDevice("laptop");
const samsungPhone = samsungFactory.createDevice("phone");

// Print specifications
appleLaptop.specifications();
console.log("----------------------");
samsungPhone.specifications();