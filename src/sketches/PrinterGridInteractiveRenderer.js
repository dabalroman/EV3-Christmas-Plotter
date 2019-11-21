export default class PrinterGridInteractiveRenderer{
    p;
    canvas;

    /**
     * @type {PrinterGrid} printerGrid
     */
    printerGrid;

    /**
     * @type {Dimension} printerGridSize
     */
    printerGridSize;

    /**
     * @type {number} cellSize
     */
    cellSize;

    /**
     * @type {p5.Vector} position
     */
    position;

    /**
     * @param p p5 instance
     * @param {PrinterGrid} printerGrid
     * @param {Number} cellSize
     * @param {p5.Vector} position
     */
    constructor(p, printerGrid, cellSize, position) {
        this.p = p;
        this.printerGrid = printerGrid;
        this.printerGridSize = this.printerGrid.getSize();
        this.canvas = p.createGraphics(this.printerGridSize.width * cellSize, this.printerGridSize.height * cellSize);
        this.cellSize = cellSize;
        this.position = position;
    }

    render() {
        /**
         * @type {p5.Vector} mouse
         */
        let mouse = this.p.createVector(this.p.mouseX - this.position.x, this.p.mouseY - this.position.y);
        this.canvas.stroke(255);

        let p1 = this.p.createVector(0, 0);
        let p2 = this.p.createVector(0, 0);

        for (let w = 0; w < this.printerGridSize.width; w++) {
            for (let h = 0; h < this.printerGridSize.height; h++) {
                let fillColor = this.p.color(255);

                p1.set(w * this.cellSize, h * this.cellSize);
                p2.set((w + 1) * this.cellSize, (h + 1) * this.cellSize);

                if(this.isInside(mouse, p1, p2)){
                    fillColor = this.p.color(255, 0, 0);
                }

                this.canvas.fill(fillColor);
                this.canvas.rect(w * this.cellSize, h * this.cellSize, this.cellSize, this.cellSize);
            }
        }

        return this.canvas;
    }

    /**
     * @param {p5.Vector} q Vector to test
     * @param {p5.Vector} p1 Rectangle corner 1
     * @param {p5.Vector} p2 Rectangle corner 2
     * @return {boolean}
     */
    isInside(q, p1, p2){
        return (q.x >= p1.x && q.x < p2.x && q.y >= p1.y && q.y < p2.y);
    }
}