import { Game } from "./Game";
import * as rl from "readline-sync";

const gameBuilder = new Game.Builder();

const player1Name = rl.question("Enter Player 1 name: ");
const player1Char = rl.question("Enter Player 1 symbol (X): ", { defaultInput: "X" });
gameBuilder.addPlayer1(player1Name, player1Char);

const player2Name = rl.question("Enter Player 2 name: ");
const player2Char = rl.question("Enter Player 2 symbol (O): ", { defaultInput: "O" });
gameBuilder.addPlayer2(player2Name, player2Char);

const game = gameBuilder.build();

while (game.state === "STARTED") {
    console.log(game.nextTurnPrompt());
    const box = rl.question("Enter Box (e.g., A1, B2): ");
    try {
        game.play(box);
    } catch (e: any) {
        console.log("Error:", e.message);
    }
}