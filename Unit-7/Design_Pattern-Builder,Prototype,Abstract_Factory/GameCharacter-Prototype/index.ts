import GameCharacter from "./GameCharacter";

const warrior = new GameCharacter("Warrior", 10, "Sword");
const warriorClone = warrior.clone();

warriorClone.name = "Warrior Clone";

warrior.display();
warriorClone.display();