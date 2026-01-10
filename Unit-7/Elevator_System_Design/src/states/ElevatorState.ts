import { Elevator } from "../models/Elevator";

export interface ElevatorState {
    handle(elevator: Elevator): void;
    getName(): string;
}