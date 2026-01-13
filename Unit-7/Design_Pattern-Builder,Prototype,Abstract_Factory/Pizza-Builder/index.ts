import PizzaBuilder from "./PizzaBuilder";

const pizza = new PizzaBuilder()
    .setSize("large")
    .addCheese()
    .addMushrooms()
    .build();

pizza.display();