import DeviceFactory from "./DeviceFactory";
import Device from "./Device";
import SamsungLaptop from "./devices/SamsungLaptop";
import SamsungPhone from "./devices/SamsungPhone";

class SamsungFactory implements DeviceFactory {
    createDevice(type: "laptop" | "phone"): Device {
        if (type === "laptop") {
            return new SamsungLaptop();
        }
        if (type === "phone") {
            return new SamsungPhone();
        }
        throw new Error("Invalid device type");
    }
}

export default SamsungFactory;