// Prototype Interface
interface Prototype<T> {
    clone(): T;
}

// Concrete Prototype
class GameCharacter implements Prototype<GameCharacter> {
    name: string;
    level: number;
    weapon: string;

    constructor(name: string, level: number, weapon: string) {
        this.name = name;
        this.level = level;
        this.weapon = weapon;
    }

    // Prototype Pattern: Clone Method
    clone(): GameCharacter {
        return Object.assign(
            Object.create(Object.getPrototypeOf(this)),
            this
        );
    }

    display(): void {
        console.log("🎮 Game Character Details");
        console.log(`Name: ${this.name}`);
        console.log(`Level: ${this.level}`);
        console.log(`Weapon: ${this.weapon}`);
        console.log("--------------------------");
    }
}

export default GameCharacter;