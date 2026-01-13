import { Player } from "./Player";
import { Board } from "./Board";

type GameState = "STARTED" | "END_WINNER" | "END_DRAW";

export class Game {
    p1: Player;
    p2: Player;
    board: Board;
    turn = 0;
    state: GameState = "STARTED";

    private lockedCenterBy: Player | null = null;

    private constructor(p1: Player, p2: Player, board: Board) {
        this.p1 = p1;
        this.p2 = p2;
        this.board = board;
    }

    private checkWinner(player: Player): boolean {
        const c = player.character;
        const winningLine = `${c}${c}${c}`;

        for (let row of ["A", "B", "C"]) if (this.board.getRowAsString(row) === winningLine) return true;
        for (let col of [0,1,2]) if (this.board.getColAsString(col) === winningLine) return true;
        for (let diag of [0,1]) if (this.board.getDiagAsString(diag) === winningLine) return true;

        return false;
    }

    private checkDiagonalLock(player: Player) {
        const b2 = this.board.getCell("B", 1); // 0-indexed col
        if (b2 !== "_") return; // center already taken, lock cannot apply

        const corners: [string, number, string, number] [] = [
            ["A", 0, "C", 2], // main diag A1 & C3
            ["A", 2, "C", 0]  // anti diag A3 & C1
        ];

        for (const [r1, c1, r2, c2] of corners) {
            if (this.board.getCell(r1, c1) === player.character && this.board.getCell(r2, c2) === player.character) {
                this.lockedCenterBy = player;
                return;
            }
        }
    }

    nextTurnPrompt(): string {
        const player = this.turn % 2 === 0 ? this.p1 : this.p2;
        return '\n' + this.board.getBoardForDisplay() +
               `\nTurn: ${this.turn+1} | Player: ${player.name} (${player.character})`;
    }

    play(box: string) {
        if (this.state !== "STARTED") {
            console.log("Game has ended!");
            return;
        }

        const player = this.turn % 2 === 0 ? this.p1 : this.p2;

        // Check diagonal lock for B2
        if (box.toUpperCase() === "B2" && this.lockedCenterBy && this.lockedCenterBy !== player) {
            console.log(`Error: Center B2 is locked for ${this.lockedCenterBy.name}`);
            return;
        }

        const success = this.board.markBoard(box, player.character);
        if (!success) {
            console.log("Cell already occupied! Try again.");
            return;
        }

        // Check if diagonal lock should apply
        this.checkDiagonalLock(player);

        if (this.checkWinner(player)) {
            this.state = "END_WINNER";
            console.log(`Game Over! ${player.name} has won!`);
            return;
        }

        this.turn++;
        if (this.turn === 9 && this.state === "STARTED") {
            this.state = "END_DRAW";
            console.log("Game ended in DRAW");
        }
    }

    static Builder = class GameBuilder {
        p1!: Player;
        p2!: Player;

        addPlayer1(name: string, character: string) {
            this.p1 = new Player.Builder().setName(name).setCharacter(character).build();
            return this;
        }

        addPlayer2(name: string, character: string) {
            this.p2 = new Player.Builder().setName(name).setCharacter(character).build();
            return this;
        }

        build(): Game {
            if (!this.p1 || !this.p2) throw new Error("Both players must be created");
            if (this.p1.character === this.p2.character) throw new Error("Players must have different symbols");
            return new Game(this.p1, this.p2, new Board());
        }
    }
}