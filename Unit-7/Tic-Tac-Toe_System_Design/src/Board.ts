export class InvalidBoxNameError extends Error {
    message = 'Invalid box identifier';
}

const BOARD_DEFAULT_SIZE = 3;
const ROWS = "ABC";

export class Board {
    size: number;
    grid: string[][];

    constructor(size: number = BOARD_DEFAULT_SIZE) {
        this.size = size;
        this.grid = [];
        for (let i = 0; i < size; i++) {
            this.grid.push(new Array(size).fill("_"));
        }
    }

    getBoardForDisplay(): string {
        return this.grid.map(row => row.join("\t")).join("\n");
    }

    markBoard(box: string, character: string): boolean {
        if (box.length !== 2) throw new InvalidBoxNameError();
        const row = ROWS.indexOf(box.charAt(0).toUpperCase());
        const col = Number(box.charAt(1)) - 1;

        if (row < 0 || row >= this.size || col < 0 || col >= this.size)
            throw new InvalidBoxNameError();

        if (this.grid[row][col] !== "_") return false;

        this.grid[row][col] = character;
        return true;
    }

    getRowAsString(rowName: string): string {
        const row = ROWS.indexOf(rowName.toUpperCase());
        if (row === -1 || row >= this.size) throw new Error("Invalid row");
        return this.grid[row].join("");
    }

    getColAsString(col: number): string {
        if (col < 0 || col >= this.size) throw new Error("Column out of range");
        return this.grid.map(row => row[col]).join("");
    }

    getDiagAsString(diagNo: number): string {
        if (diagNo === 0) return this.grid.map((row, i) => row[i]).join("");
        if (diagNo === 1) return this.grid.map((row, i) => row[this.size - 1 - i]).join("");
        throw new Error("Invalid diagonal number");
    }

    getCell(row: string, col: number): string {
        const r = ROWS.indexOf(row.toUpperCase());
        if (r < 0 || col < 0 || col >= this.size) throw new Error("Invalid cell");
        return this.grid[r][col];
    }

    isFull(): boolean {
        return this.grid.every(row => row.every(cell => cell !== "_"));
    }
}