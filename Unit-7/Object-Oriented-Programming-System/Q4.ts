class PolyDuck {
    fly(): void {
        console.log("Duck is flying");
    }
}

class DesiDuck extends PolyDuck {
    fly(): void {
        console.log("DesiDuck flies at 10kmph");
    }
}

class VidesiDuck extends PolyDuck {
    fly(): void {
        console.log("VidesiDuck flies at 20kmph");
    }
}

class SmartDuck extends PolyDuck {
    fly(): void {
        console.log("SmartDuck flies at 50kmph");
    }
}

// Polymorphic function
function makeDuckFly(duck: PolyDuck): void {
    duck.fly();
}

// Testing
makeDuckFly(new DesiDuck());
makeDuckFly(new VidesiDuck());
makeDuckFly(new SmartDuck());