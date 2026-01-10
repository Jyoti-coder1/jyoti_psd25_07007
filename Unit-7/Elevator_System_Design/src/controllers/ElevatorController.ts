import { Elevator } from "../models/Elevator";
import { Request } from "../models/Request";

export class ElevatorController {
    private pendingRequests: Request[] = [];

    constructor(private elevators: Elevator[]) { }

    requestElevator(request: Request) {
        const availableElevator = this.elevators.find(
            e => e.isAvailable() &&
                (e.direction === "IDLE" ||
                    (e.direction === "UP" && request.sourceFloor >= e.currentFloor) ||
                    (e.direction === "DOWN" && request.sourceFloor <= e.currentFloor))
        );

        if (!availableElevator) {
            console.log("No elevator available. Request queued.");
            this.pendingRequests.push(request);
            return;
        }

        if (!availableElevator.addPassengers(request.passengers, request.totalWeight)) {
            console.log("Capacity exceeded. Waiting.");
            this.pendingRequests.push(request);
            return;
        }

        availableElevator.assignFloor(request.sourceFloor);
        availableElevator.assignFloor(request.destinationFloor);
    }

    monitor() {
        this.elevators.forEach(e => console.log(e.getStatus()));
    }
}