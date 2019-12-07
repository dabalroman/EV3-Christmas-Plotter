import CodeGenerator from "./CodeGenerator";
import PlotterGrid from "../PlotterGrid";
import Utils from "../../Utils/Utils";

export default class CodeGenLineByLineVert extends CodeGenerator {
    generateCode(plotterGrid: Boolean[][]): number[] {
        this.code = [];

        this.code.push(CodeGenLineByLineVert.INS_START);
        this.code.push(CodeGenLineByLineVert.INS_PEN_UP);

        let verticalLines = this.findVerticalLinesAndDots(plotterGrid);

        this.generateCodeForVerticalLinesAndDots(verticalLines);

        this.code.push(CodeGenLineByLineVert.INS_DONE);

        Utils.copyToClipboard(this.createLegoMindstormsDataBlock(this.code));

        return this.code;
    }

    generateCodeForVerticalLinesAndDots(verticalLines: {}[]): void {
        let pos = {x: 0, y: 0};
        let [start, end] = [0, 0];

        this.code.push(CodeGenLineByLineVert.INS_RST_VERTICAL);

        verticalLines.forEach(verticalLine => {
            start = verticalLine.y1;
            end = verticalLine.y2;

            //Move to next column if necessary
            if (pos.x !== verticalLine.x1) {
                this.code.push(CodeGenLineByLineVert.INS_MOV_RIGHT);
                this.code.push((verticalLine.x1 - pos.x) * PlotterGrid.EDITOR_TO_PLOTTER_RATIO);
                pos.x = verticalLine.x1;
            }

            // //Select DOWN or UP case
            // if (Math.abs(pos.y - verticalLine.y1) < Math.abs(pos.y - verticalLine.y2)) {
            //     start = verticalLine.y1;
            //     end = verticalLine.y2;
            // } else {
            //     start = verticalLine.y2;
            //     end = verticalLine.y1;
            // }

            //Move to start of new line
            if (pos.y !== start) {
                if (pos.y > start) {
                    this.code.push(CodeGenLineByLineVert.INS_MOV_UP);
                    this.code.push((pos.y - start) * PlotterGrid.EDITOR_TO_PLOTTER_RATIO);
                } else {
                    this.code.push(CodeGenLineByLineVert.INS_MOV_DOWN);
                    this.code.push(Math.abs(start - pos.y) * PlotterGrid.EDITOR_TO_PLOTTER_RATIO);
                }
                pos.y = start;
            }

            //Draw line
            this.code.push(CodeGenLineByLineVert.INS_PEN_DOWN);
            if (start !== end) {
                this.code.push((start > end) ? CodeGenLineByLineVert.INS_MOV_UP : CodeGenLineByLineVert.INS_MOV_DOWN);
                this.code.push(Math.abs(start - end) * PlotterGrid.EDITOR_TO_PLOTTER_RATIO);
            }
            this.code.push(CodeGenLineByLineVert.INS_PEN_UP);
            pos.y = end;
        });
    }

    findVerticalLinesAndDots(plotterGrid: boolean[]): {}[] {
        let horizontalLines = [];
        let lineLength = 0;

        for (let x = 0; x < plotterGrid.length; x++) {
            for (let y = 0; y <= plotterGrid[0].length; y++) {
                if (y !== plotterGrid[0].length && plotterGrid[x][y]) {
                    lineLength++;
                } else {
                    if (lineLength >= 1) {
                        horizontalLines.push({
                            x1: x,
                            y1: y - lineLength,
                            x2: x,
                            y2: y - 1
                        });
                    }

                    lineLength = 0;
                }
            }
        }

        return horizontalLines;
    }
}