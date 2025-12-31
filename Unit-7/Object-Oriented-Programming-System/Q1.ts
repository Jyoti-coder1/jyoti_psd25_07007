class Duck {
    swim(): void {
        console.log("I know swimming");
    }
}

class MallardDuck extends Duck {
    // inherits swim() from Duck
}

const mallard = new MallardDuck();
mallard.swim();