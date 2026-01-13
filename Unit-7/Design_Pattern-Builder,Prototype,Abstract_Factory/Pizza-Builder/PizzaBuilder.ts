import Pizza from "./Pizza";

class PizzaBuilder {
    private size: string = "medium";
    private cheese: boolean = false;
    private pepperoni: boolean = false;
    private mushrooms: boolean = false;

    setSize(size: "small" | "medium" | "large"): this {
        this.size = size;
        return this;
    }

    addCheese(): this {
        this.cheese = true;
        return this;
    }

    addPepperoni(): this {
        this.pepperoni = true;
        return this;
    }

    addMushrooms(): this {
        this.mushrooms = true;
        return this;
    }

    build(): Pizza {
        return new Pizza(
            this.size,
            this.cheese,
            this.pepperoni,
            this.mushrooms
        );
    }
}

export default PizzaBuilder;