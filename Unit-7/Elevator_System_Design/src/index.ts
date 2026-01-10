import { Elevator } from "./models/Elevator";
import { ElevatorController } from "./controllers/ElevatorController";
import { Request } from "./models/Request";

const elevators = [
    new Elevator(1),
    new Elevator(2)
];

const controller = new ElevatorController(elevators);

controller.requestElevator(new Request(3, 7, 4, 260));
controller.requestElevator(new Request(5, 1, 6, 500));

setInterval(() => {
    elevators.forEach(e => e.state.handle(e));
    controller.monitor();
}, 1000);