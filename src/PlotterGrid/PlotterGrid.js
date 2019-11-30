import Dimension from "../Utils/Dimension";
import CodeGenHorizVertPoint from "./CodeGenerators/CodeGenHorizVertPoint";

export default class PlotterGrid {
    /**
     * @type {Dimension} size
     */
    size;

    /**
     * Data structure
     * @type {Boolean[][]} grid
     */
    grid;

    /**
     * @type {CodeGenerator} plotterCodeGenerator
     */
    plotterCodeGenerator;

    /**
     * Create PlotterGrid
     * @param {Number} width
     * @param {Number} height
     */
    constructor(width, height) {
        this.setSize(width, height);

        this.setCellState(1, 0);
        this.setCellState(2, 0);
        this.setCellState(3, 0);
        this.setCellState(7, 0);
        this.setCellState(8, 0);
        this.setCellState(9, 0);
        this.setCellState(13, 0);
        this.setCellState(14, 0);
        this.setCellState(3, 1);
        this.setCellState(4, 1);
        this.setCellState(5, 1);
        this.setCellState(9, 1);
        this.setCellState(12, 1);
        this.setCellState(13, 1);

        //Control points
        this.setCellState(0, 0);
        this.setCellState(119, 0);
        this.setCellState(0, 29);
        this.setCellState(119, 29);

        this.plotterCodeGenerator = new CodeGenHorizVertPoint();
    }

    /**
     * Create string from data
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

    /**
     * Fill grid with random data
     */
    random() {
        for (let j = 0; j < this.size.height; j++) {
            for (let i = 0; i < this.size.width; i++) {
                this.grid[i][j] = (Math.random() * 2) >= 1;
            }
        }
    }

    /**
     * Set grid size
     * @param {Number} width
     * @param {Number} height
     */
    setSize(width, height) {
        this.size = new Dimension(width, height);
        this.createDataStructure();
    }

    /**
     * Create grid data structure
     */
    createDataStructure() {
        this.grid = new Array(this.size.width);

        for (let w = 0; w < this.size.width; ++w) {
            this.grid[w] = new Array(this.size.height).fill(false);
        }
    }

    generatePlotterCode() {
        this.plotterCodeGenerator.generateCode(this.grid);
    }

    /**
     * Clear PlotterGrid
     */
    clear() {
        for (let w = 0; w < this.size.width; ++w) {
            this.grid[w].fill(false);
        }
    }

    /**
     * Get grid size
     * @returns {Dimension}
     */
    getSize() {
        return this.size;
    }

    /**
     * Get cell state
     * @param {Number} x
     * @param {Number} y
     * @returns {Boolean}
     */
    getCellState(x, y) {
        return this.grid[x][y];
    }

    /**
     * Set cell state
     * @param {Number} x
     * @param {Number} y
     * @param {Boolean} state
     */
    setCellState(x, y, state = true) {
        this.grid[x][y] = state;
    }
}