import { ElevatorState } from "./ElevatorState";
import { Elevator } from "../models/Elevator";

export class OpenDoorState implements ElevatorState {
    handle(elevator: Elevator): void {
        console.log(`Elevator ${elevator.id} doors opened at floor ${elevator.currentFloor}`);
    }

    getName(): string {
        return "OPEN_DOOR";
    }
}