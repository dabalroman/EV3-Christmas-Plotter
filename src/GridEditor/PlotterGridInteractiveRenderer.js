import Utils from "../Utils/Utils";

export default class PlotterGridInteractiveRenderer {
    p;
    gridCanvas;
    canvas;

    /**
     * @type {PlotterGrid} plotterGrid
     */
    plotterGrid;

    /**
     * @type {Dimension} gridSize
     */
    plotterGridSize;

    /**
     * @type {number} cellSize
     */
    cellSize;

    /**
     * @type {p5.Vector} position
     */
    position;

    /**
     * @type {number}
     */
    lastRenderedCanvasStep = 0;

    /**
     * @type {boolean} canvasUpdateRequired
     */
    canvasUpdateRequired = true;

    /**
     * @param p p5 instance
     * @param {PlotterGrid} plotterGrid
     * @param {Number} cellSize
     * @param {p5.Vector} position
     */
    constructor(p, plotterGrid, cellSize, position) {
        this.p = p;
        this.plotterGrid = plotterGrid;
        this.plotterGridSize = this.plotterGrid.getSize();
        this.cellSize = cellSize;
        this.position = position;

        this.canvas = p.createGraphics(this.plotterGridSize.width * cellSize, this.plotterGridSize.height * cellSize);
        this.canvas.noStroke();

        this.gridCanvas = p.createGraphics(this.plotterGridSize.width * cellSize, this.plotterGridSize.height * cellSize);
        this.gridCanvas.noStroke();
    }

    render() {
        if (!this.plotterGrid.isUpToDate(this.lastRenderedCanvasStep)) {
            this.renderGrid();
            this.canvasUpdateRequired = true;
        }

        if (this.canvasUpdateRequired || this.p.mouseX !== this.p.pmouseX || this.p.mouseY !== this.p.pmouseY) {
            this.renderCanvas();
        }

        return this.canvas;
    }

    /**
     * Render canvas from mouse position and grid canvas
     */
    renderCanvas() {
        /**
         * @type {p5.Vector} mouse
         */
        let mouse = this.p.createVector(this.p.mouseX - this.position.x, this.p.mouseY - this.position.y);
        mouse.x = Math.floor(mouse.x / this.cellSize) * this.cellSize;
        mouse.y = Math.floor(mouse.y / this.cellSize) * this.cellSize;

        this.canvas.image(this.gridCanvas, 0, 0);
        this.canvas.fill(255, 120, 0, 120);
        this.canvas.rect(mouse.x, mouse.y, this.cellSize, this.cellSize);

        this.canvasUpdateRequired = false;
    }

    /**
     * Render grid to internal canvas.
     */
    renderGrid() {
        this.gridCanvas.background(240);
        this.gridCanvas.fill(70, 70, 200);
        
        for (let w = 0; w < this.plotterGridSize.width; w++) {
            for (let h = 0; h < this.plotterGridSize.height; h++) {
                if (!this.plotterGrid.getCellState(w, h)) {
                    continue;
                }

                this.gridCanvas.rect(w * this.cellSize, h * this.cellSize, this.cellSize, this.cellSize);
            }
        }

        this.lastRenderedCanvasStep = this.plotterGrid.getCurrentStep();
    }

    /**
     * Update only one cell; no need to re-render whole canvas
     * @type {Number} x
     * @type {Number} y
     */
    renderCell(x, y) {
        if (this.plotterGrid.getCellState(x, y)) {
            this.gridCanvas.fill(70, 70, 200);
        } else {
            this.gridCanvas.fill(240);
        }

        this.gridCanvas.rect(x * this.cellSize, y * this.cellSize, this.cellSize, this.cellSize);
        this.canvasUpdateRequired = true;
    }

    /**
     * Get rendered grid object
     * @return {*}
     */
    getRenderedGrid() {
        if (!this.plotterGrid.isUpToDate(this.lastRenderedCanvasStep)) {
            this.renderGrid();
        }

        return this.gridCanvas;
    }

    /**
     * @param {p5.Vector} point
     * @param {boolean} state
     */
    setCellAtPoint(point, state = true) {
        point.x = Math.floor((point.x - this.position.x) / this.cellSize);
        point.y = Math.floor((point.y - this.position.y) / this.cellSize);

        if (!Utils.isInside(point, this.p.createVector(0, 0), this.p.createVector(this.plotterGridSize.width, this.plotterGridSize.height))) {
            return;
        }

        this.plotterGrid.setCellState(point.x, point.y, state);
        this.renderCell(point.x, point.y);

        //Update last rendered step value to prevent re-rendering
        this.lastRenderedCanvasStep = this.plotterGrid.getCurrentStep();
    }
}