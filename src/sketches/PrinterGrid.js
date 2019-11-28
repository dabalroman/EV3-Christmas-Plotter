import Dimension from "./Dimension";

export default class PrinterGrid {
    /**
     * @type {Dimension} size
     */
    size;

    /**
     * @type {Boolean[][]} grid
     */
    grid;

    /**
     * @param {Number} width
     * @param {Number} height
     */
    constructor(width, height) {
        this.setSize(width, height);
    }

    /**
     * @returns {string}
     */
    toString() {
        let output = "";

        for (let j = 0; j < this.size.height; j++) {
            for (let i = 0; i < this.size.width; i++) {
                output += (this.grid[i][j] ? "1" : "0");
            }
            output += '\n';
        }

        return output;
    }

    random() {
        for (let j = 0; j < this.size.height; j++) {
            for (let i = 0; i < this.size.width; i++) {
                this.grid[i][j] = (Math.random() * 2) >= 1;
            }
        }
    }

    /**
     * @param {Number} width
     * @param {Number} height
     */
    setSize(width, height) {
        this.size = new Dimension(width, height);
        this.createGridArray();
    }

    createGridArray() {
        this.grid = new Array(this.size.width);

        for (let w = 0; w < this.size.width; ++w) {
            this.grid[w] = new Array(this.size.height).fill(false);
        }
    }

    /**
     * @returns {Dimension}
     */
    getSize() {
        return this.size;
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @returns {Boolean}
     */
    getCell(x, y) {
        return this.grid[x][y];
    }

    /**
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} state
     */
    setCell(x, y, state = true) {
        this.grid[x][y] = state;
    }
}