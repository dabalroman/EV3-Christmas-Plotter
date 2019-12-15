import Dimension from "../Utils/Dimension";
import CodeGenLineByLineHoriz from "./CodeGenerators/CodeGenLineByLineHoriz";
import CodeGenHorizVertPoint from "./CodeGenerators/CodeGenHorizVertPoint";
import CodeGenLineByLineVert from "./CodeGenerators/CodeGenLineByLineVert";
import CodeGenerator from "./CodeGenerators/CodeGenerator";
import Utils from "../Utils/Utils";

export default class PlotterGrid {
    static GEN_HLBL = 0;
    static GEN_VLBL = 1;
    static GEN_HVP = 2;

    //Cells to degree ratio. Real machine resolution is 1080 x 252 deg.
    static EDITOR_TO_PLOTTER_RATIO = 9;

    //Offset to '0' char
    static ENCODER_CHAR_OFFSET = 48;

    /**
     * @type {Dimension} size
     */
    size;

    /**
     * Data structure
     * @type {boolean[][]} grid
     */
    grid;

    /**
     * Generated plotter code
     * @type {number[]}
     */
    plotterCode;

    /**
     * Generated plotter code as block
     * @type {string}
     */
    plotterCodeBlock;

    /**
     * Integer for change tracking
     * @type {number}
     */
    stepTracker = 0;

    /**
     * Create PlotterGrid
     * @param {number} width
     * @param {number} height
     */
    constructor(width, height) {
        this.setSize(width, height);
        this.load();

        //Autosave drawing
        setInterval(() => {
            this.save()
        }, 1000 * 30);
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
        this.plotterCodeBlock = CodeGenerator.createLegoMindstormsDataBlock(this.plotterCode);
        Utils.copyToClipboard(this.plotterCodeBlock);
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

    save(): string {
        let s = '';

        let temp = 0;
        for (let y = 0; y < this.size.height; y++) {
            for (let x = 0; x < this.size.width; x++) {
                temp = (temp << 1) | this.grid[x][y];

                if (x % 6 === 5 || x === this.size.width - 1) {
                    temp += PlotterGrid.ENCODER_CHAR_OFFSET;
                    temp = (temp === 63) ? 120 : temp;

                    s += String.fromCharCode(temp);
                    temp = 0;
                }
            }
        }

        localStorage.setItem('grid', s);
        return s;
    }

    load(encoded = '') {
        if (encoded === '') {
            encoded = localStorage.getItem('grid');

            if (encoded === null || encoded === '') {
                return;
            }
        }

        let temp = 0;
        for (let y = 0; y < this.size.height; y++) {
            for (let x = 0; x < this.size.width; x++) {
                if (x % 6 === 0) {
                    temp = encoded.charCodeAt(0);
                    temp = (temp === 120) ? 63 : temp;
                    temp -= PlotterGrid.ENCODER_CHAR_OFFSET;

                    encoded = encoded.substr(1);
                }

                this.grid[x][y] = (temp & 32) && true;
                temp = temp << 1;
            }
        }

        this.registerStep();
    }
}