export default class VisualCodeDecoder {
    p;
    canvas;

    /**
     * @type {Dimension} gridSize
     */
    gridSize;

    /**
     * @type {number} cellSize
     */
    cellSize;

    /**
     * @param p p5 instance
     * @param {Dimension} gridSize
     * @param {number} cellSize
     */
    constructor(p, gridSize, cellSize) {
        this.p = p;
        this.gridSize = gridSize;
        this.cellSize = cellSize;

        this.canvas = p.createGraphics(this.gridSize.width * cellSize, this.gridSize.height * cellSize);
    }

    render() {
        return this.canvas;
    }

    /**
     * Decode plotter code array
     * @param {number[]}code
     */
    decode(code){
        this.canvas.clear();

        this.canvas.text(this.p.millis(), 20, 20);
    }
}