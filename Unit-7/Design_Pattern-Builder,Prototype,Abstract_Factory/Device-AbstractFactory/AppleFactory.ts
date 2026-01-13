import DeviceFactory from "./DeviceFactory";
import Device from "./Device";
import AppleLaptop from "./devices/AppleLaptop";
import ApplePhone from "./devices/ApplePhone";

class AppleFactory implements DeviceFactory {
    createDevice(type: "laptop" | "phone"): Device {
        if (type === "laptop") {
            return new AppleLaptop();
        }
        if (type === "phone") {
            return new ApplePhone();
        }
        throw new Error("Invalid device type");
    }
}

export default AppleFactory;