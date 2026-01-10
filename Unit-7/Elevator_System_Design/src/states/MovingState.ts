import { ElevatorState } from "./ElevatorState";
import { Elevator } from "../models/Elevator";

export class MovingState implements ElevatorState {
    handle(elevator: Elevator): void {
        console.log(`Elevator ${elevator.id} moving to floor ${elevator.targetFloor}`);
        elevator.moveOneFloor();
    }

    getName(): string {
        return "MOVING";
    }
}