export class Player {
    name: string;
    character: string;

    private constructor(name: string, character: string) {
        this.name = name;
        this.character = character;
    }

    static Builder = class PlayerBuilder {
        private name!: string;
        private character!: string;

        setName(name: string) {
            this.name = name;
            return this;
        }

        setCharacter(character: string) {
            if (character === "_") throw new Error("Underscore '_' is not allowed");
            this.character = character;
            return this;
        }

        build(): Player {
            return new Player(this.name, this.character);
        }
    }
}