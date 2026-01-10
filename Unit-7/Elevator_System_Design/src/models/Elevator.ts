import { ElevatorState } from "../states/ElevatorState";
import { MovingState } from "../states/MovingState";
import { OpenDoorState } from "../states/OpenDoorState";
import { CloseDoorState } from "../states/CloseDoorState";
import { MAX_PEOPLE, MAX_WEIGHT } from "../constants";

export class Elevator {
    public currentFloor = 1;
    public targetFloor: number | null = null;
    public direction: "UP" | "DOWN" | "IDLE" = "IDLE";
    public state: ElevatorState = new CloseDoorState();

    private people = 0;
    private weight = 0;

    constructor(public id: number) { }

    isAvailable(): boolean {
        return this.people < MAX_PEOPLE && this.weight < MAX_WEIGHT;
    }

    addPassengers(count: number, totalWeight: number): boolean {
        if (
            this.people + count > MAX_PEOPLE ||
            this.weight + totalWeight > MAX_WEIGHT
        ) {
            console.log(`Elevator ${this.id} is full`);
            return false;
        }

        this.people += count;
        this.weight += totalWeight;
        return true;
    }

    removeAllPassengers() {
        this.people = 0;
        this.weight = 0;
    }

    assignFloor(floor: number) {
        this.targetFloor = floor;
        this.direction =
            floor > this.currentFloor ? "UP" :
                floor < this.currentFloor ? "DOWN" : "IDLE";

        this.state = new MovingState();
    }

    moveOneFloor() {
        if (this.targetFloor === null) return;

        if (this.currentFloor < this.targetFloor) this.currentFloor++;
        else if (this.currentFloor > this.targetFloor) this.currentFloor--;

        console.log(`Elevator ${this.id} at floor ${this.currentFloor}`);

        if (this.currentFloor === this.targetFloor) {
            this.state = new OpenDoorState();
            this.state.handle(this);

            this.removeAllPassengers();
            this.state = new CloseDoorState();
            this.direction = "IDLE";
            this.targetFloor = null;
        }
    }

    getStatus() {
        return {
            id: this.id,
            floor: this.currentFloor,
            direction: this.direction,
            people: this.people,
            weight: this.weight,
            state: this.state.getName()
        };
    }
}