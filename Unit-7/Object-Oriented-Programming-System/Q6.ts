// Strategy Interface
interface FlyStrategy {
  fly(): void;
}

// Concrete Strategy 1
class FastFly implements FlyStrategy {
  fly(): void {
    console.log("Flying fast like a rocket!");
  }
}

// Concrete Strategy 2
class NoFly implements FlyStrategy {
  fly(): void {
    console.log("I cannot fly");
  }
}

// Context Class
class Duck {
  private flyStrategy: FlyStrategy;

  constructor(flyStrategy: FlyStrategy) {
    this.flyStrategy = flyStrategy;
  }

  performFly(): void {
    this.flyStrategy.fly();
  }

  setFlyStrategy(flyStrategy: FlyStrategy): void {
    this.flyStrategy = flyStrategy;
  }
}

// Testing dynamic behavior
const duck = new Duck(new FastFly());
duck.performFly();

duck.setFlyStrategy(new NoFly());
duck.performFly();