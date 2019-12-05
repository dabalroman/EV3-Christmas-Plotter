import CodeGenerator from "../CodeGenerators/CodeGenerator";
import PlotterGrid from "../PlotterGrid";

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
        this.canvas.strokeWeight(2);
    }

    render() {
        return this.canvas;
    }

    /**
     * Decode plotter code array
     * @param {number[]} code
     * @param {number}step
     */
    decode(code, step = code.length) {
        this.canvas.clear();

        let x = 0, y = 0, px = 0, py = 0, i = 0;
        let penDown = false, ppenDown = false;
        let lIns, lArg;

        for (; i < step; i++) {
            let instruction = code[i];
            [lIns, lArg] = [null, null];
            [px, py, ppenDown] = [x, y, penDown];

            if (i === 0 && instruction !== CodeGenerator.INS_START) {
                console.error("Code without START instruction!")
            }

            if (i === code.length - 1 && instruction !== CodeGenerator.INS_DONE) {
                console.error("Code without DONE instruction!");
            }

            switch (instruction) {
                case CodeGenerator.INS_START:
                    lIns = "START";
                    break;

                case CodeGenerator.INS_DONE:
                    lIns = "DONE";
                    break;

                case CodeGenerator.INS_PEN_DOWN:
                    lIns = "PEN_DOWN";
                    penDown = true;
                    break;

                case CodeGenerator.INS_PEN_UP:
                    lIns = "PEN_UP";
                    penDown = false;
                    break;

                case CodeGenerator.INS_MOV_RIGHT:
                    lIns = "MOV_RIGHT";
                    lArg = code[++i] / PlotterGrid.EDITOR_TO_PLOTTER_RATIO;
                    x += lArg;
                    break;

                case CodeGenerator.INS_MOV_LEFT:
                    lIns = "MOV_LEFT";
                    lArg = code[++i] / PlotterGrid.EDITOR_TO_PLOTTER_RATIO;
                    x -= lArg;
                    break;

                case CodeGenerator.INS_MOV_DOWN:
                    lIns = "MOV_DOWN";
                    lArg = code[++i] / PlotterGrid.EDITOR_TO_PLOTTER_RATIO;
                    y += lArg;
                    break;

                case CodeGenerator.INS_MOV_UP:
                    lIns = "MOV_UP";
                    lArg = code[++i] / PlotterGrid.EDITOR_TO_PLOTTER_RATIO;
                    y -= lArg;
                    break;

                case CodeGenerator.INS_RST_HORIZONTAL:
                    lIns = "RST_HORIZONTAL";
                    x = 0;
                    break;

                case CodeGenerator.INS_RST_VERTICAL:
                    lIns = "RST_VERTICAL";
                    y = 0;
                    break;

                default:
                    continue;
            }

            if (lIns === CodeGenerator.INS_RST_VERTICAL || lIns === CodeGenerator.INS_RST_HORIZONTAL) {
                this.canvas.stroke(255, 255, 0, 100);
            } else {
                this.canvas.stroke(penDown * 255, 255, !penDown * 255, 255);
            }

            this.canvas.line(
                x * this.cellSize + this.cellSize / 2,
                y * this.cellSize + this.cellSize / 2,
                px * this.cellSize + this.cellSize / 2,
                py * this.cellSize + this.cellSize / 2
            );

            if (ppenDown !== penDown) {
                this.canvas.noStroke();

                if (ppenDown === false) {
                    this.canvas.fill(255, 255, 255);
                } else {
                    if (code[i] === CodeGenerator.INS_PEN_UP && code[i - 1] === CodeGenerator.INS_PEN_DOWN) {
                        this.canvas.fill(0, 255, 0);
                    } else {
                        this.canvas.fill(255, 0, 0);
                    }
                }

                this.canvas.ellipse(
                    x * this.cellSize + this.cellSize / 2,
                    y * this.cellSize + this.cellSize / 2,
                    this.cellSize,
                    this.cellSize
                );
            }
        }

        this.canvas.fill(0);
        this.canvas.noStroke();
        this.canvas.text("Step " + step + "/" + code.length, 10, 230);
        this.canvas.text("Instruction: " + lIns + " / " + lArg, 10, 210);
        this.canvas.text("Path length: " + this.countPathLength(code, step), 100, 230);
    }

    countPathLength(code: number[], step: number): number {
        let pathLength = 0;
        let x = 0, y = 0, temp = 0;

        for (let i = 0; i < step; i++) {
            switch (code[i]) {
                case CodeGenerator.INS_MOV_RIGHT:
                    temp = code[++i] / PlotterGrid.EDITOR_TO_PLOTTER_RATIO;
                    pathLength += temp;
                    x += temp;
                    break;

                case CodeGenerator.INS_MOV_DOWN:
                    temp = code[++i] / PlotterGrid.EDITOR_TO_PLOTTER_RATIO;
                    pathLength += temp;
                    y += temp;
                    break;

                case CodeGenerator.INS_RST_HORIZONTAL:
                    pathLength += x;
                    x = 0;
                    break;

                case CodeGenerator.INS_RST_VERTICAL:
                    pathLength += y;
                    y = 0;
                    break;

                default:
                    break;
            }
        }

        return pathLength;
    }
}