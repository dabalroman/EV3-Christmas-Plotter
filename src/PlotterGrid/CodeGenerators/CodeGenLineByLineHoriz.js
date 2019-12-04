import CodeGenerator from "./CodeGenerator";
import PlotterGrid from "../PlotterGrid";

export default class CodeGenLineByLineHoriz extends CodeGenerator {
    generateCode(plotterGrid: Boolean[][]) {
        this.code = [];

        this.code.push(CodeGenLineByLineHoriz.INS_START);
        this.code.push(CodeGenLineByLineHoriz.INS_PEN_UP);

        let horizontalLines = this.findHorizontalLinesAndDots(plotterGrid);

        this.generateCodeForHorizontalLinesAndDots(horizontalLines);

        this.code.push(CodeGenLineByLineHoriz.INS_DONE);

        return this.code;
    }

    generateCodeForHorizontalLinesAndDots(horizontalLines) {
        let pos = {x: 0, y: 0};

        this.code.push(CodeGenLineByLineHoriz.INS_RST_VERTICAL);

        horizontalLines.forEach(horizontalLine => {
            //Move to next row if necessary
            //noinspection DuplicatedCode
            if (pos.y !== horizontalLine.y1) {
                if (pos.x !== 0) {
                    this.code.push(CodeGenLineByLineHoriz.INS_RST_HORIZONTAL);
                }
                this.code.push(CodeGenLineByLineHoriz.INS_MOV_DOWN);
                this.code.push((horizontalLine.y1 - pos.y) * PlotterGrid.EDITOR_TO_PLOTTER_RATIO);
                pos.x = 0;
                pos.y = horizontalLine.y1;
            }

            //Move to start of new line
            if (pos.x !== horizontalLine.x1) {
                this.code.push(CodeGenLineByLineHoriz.INS_MOV_RIGHT);
                this.code.push((horizontalLine.x1 - pos.x) * PlotterGrid.EDITOR_TO_PLOTTER_RATIO);
                pos.x = horizontalLine.x1;
            }

            //Draw line
            this.code.push(CodeGenLineByLineHoriz.INS_PEN_DOWN);
            if (horizontalLine.x1 !== horizontalLine.x2) {
                this.code.push(CodeGenLineByLineHoriz.INS_MOV_RIGHT);
                this.code.push((horizontalLine.x2 - pos.x) * PlotterGrid.EDITOR_TO_PLOTTER_RATIO);
            }
            this.code.push(CodeGenLineByLineHoriz.INS_PEN_UP);
            pos.x = horizontalLine.x2;
        });
    }

    findHorizontalLinesAndDots(plotterGrid) {
        let verticalLines = [];
        let lineLength = 0;

        for (let y = 0; y < plotterGrid[0].length; y++) {
            for (let x = 0; x <= plotterGrid.length; x++) {
                if (x !== plotterGrid.length && plotterGrid[x][y]) {
                    lineLength++;
                } else {
                    if (lineLength >= 1) {
                        verticalLines.push({
                            x1: x - lineLength,
                            y1: y,
                            x2: x - 1,
                            y2: y
                        });
                    }


                    lineLength = 0;
                }
            }
        }

        return verticalLines;
    }
}