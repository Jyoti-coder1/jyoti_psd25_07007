export class Request {
    constructor(
        public sourceFloor: number,
        public destinationFloor: number,
        public passengers: number,
        public totalWeight: number
    ) {}
}