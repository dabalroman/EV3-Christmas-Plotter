import Dimension from "../Utils/Dimension";
import CodeGenLineByLineHoriz from "./CodeGenerators/CodeGenLineByLineHoriz";
import CodeGenHorizVertPoint from "./CodeGenerators/CodeGenHorizVertPoint";
import CodeGenLineByLineVert from "./CodeGenerators/CodeGenLineByLineVert";

export default class PlotterGrid {
    static GEN_HLBL = 0;
    static GEN_VLBL = 1;
    static GEN_HVP = 2;

    //Cells to degree ratio. Real machine resolution is 1080 x 252 deg.
    static EDITOR_TO_PLOTTER_RATIO = 9;

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
     * Generated plotter code
     * @type {Number[]}
     */
    plotterCode;

    /**
     * Integer for change tracking
     * @type {number}
     */
    stepTracker = 0;

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
        this.setCellState(0, 27);
        this.setCellState(119, 27);
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
     * Register any changes to tracker
     */
    registerStep() {
        this.stepTracker++;
    }

    /**
     * Check if give step id is same as current
     */
    isUpToDate(step) {
        return step === this.stepTracker;
    }

    /**
     * Get current step id
     * @return {number}
     */
    getCurrentStep() {
        return this.stepTracker;
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

        this.registerStep();
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

        this.registerStep();
    }

    /**
     * Encode grid as plotter code
     * @param type
     */
    generatePlotterCode(type) {
        let plotterCodeGenerator;

        switch (type) {
            default:
            case PlotterGrid.GEN_HLBL:
                plotterCodeGenerator = new CodeGenLineByLineHoriz();
                break;

            case PlotterGrid.GEN_VLBL:
                plotterCodeGenerator = new CodeGenLineByLineVert();
                break;

            case PlotterGrid.GEN_HVP:
                plotterCodeGenerator = new CodeGenHorizVertPoint();
                break;
        }

        this.plotterCode = plotterCodeGenerator.generateCode(this.grid);
        console.log(this.plotterCode);
    }

    /**
     * Clear PlotterGrid
     */
    clear() {
        for (let w = 0; w < this.size.width; ++w) {
            this.grid[w].fill(false);
        }

        this.registerStep();
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
        if (this.grid[x][y] !== state) {
            this.grid[x][y] = state;
            this.registerStep();
        }
    }

    serialize(): string {
        let s = JSON.stringify(this.grid);
        localStorage.setItem('grid', s);
        return s;
    }

    deserialize(serialized: string) {
        if (serialized === '') {
            serialized = localStorage.getItem('grid');

            if (serialized === '') {
                return;
            }
        }

        let data = JSON.parse(serialized);

        for (let w = 0; w < this.size.width; ++w) {
            for (let h = 0; h < this.size.height; ++h) {
                this.grid[w][h] = data[w][h];
            }
        }

        this.registerStep();
    }
}