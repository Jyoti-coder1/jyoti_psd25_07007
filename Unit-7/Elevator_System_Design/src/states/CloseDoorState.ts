import { ElevatorState } from "./ElevatorState";
import { Elevator } from "../models/Elevator";

export class CloseDoorState implements ElevatorState {
    handle(elevator: Elevator): void {
        console.log(`Elevator ${elevator.id} doors closed`);
    }

    getName(): string {
        return "CLOSE_DOOR";
    }
}