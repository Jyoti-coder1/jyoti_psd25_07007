import Device from "./Device";

interface DeviceFactory {
    createDevice(type: "laptop" | "phone"): Device;
}

export default DeviceFactory;