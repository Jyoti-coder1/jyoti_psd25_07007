class Pizza {
    constructor(
        public size: string,
        public cheese: boolean,
        public pepperoni: boolean,
        public mushrooms: boolean
    ) { }

    display(): void {
        console.log("🍕 Pizza Details");
        console.log(`Size: ${this.size}`);
        console.log(`Cheese: ${this.cheese}`);
        console.log(`Pepperoni: ${this.pepperoni}`);
        console.log(`Mushrooms: ${this.mushrooms}`);
    }
}

export default Pizza;