import CodeGenerator from "./CodeGenerator";

export default class CodeGenHorizVertPoint extends CodeGenerator {
    generateCode(plotterGrid: Boolean[][]) {
        this.code.push(CodeGenHorizVertPoint.INS_START);
        this.code.push(CodeGenHorizVertPoint.INS_PEN_UP);

        let horizontalLines = this.findHorizontalLines(plotterGrid);
        let verticalLines = this.findVerticalLines(plotterGrid);
        let points = this.findPoints(plotterGrid);

        this.generateCodeForHorizontalLines(horizontalLines);
        this.generateCodeForVerticalLines(verticalLines, horizontalLines);
        this.generateCodeForPoints(points);

        this.code.push(CodeGenHorizVertPoint.INS_DONE);

        console.log(this.code);
        return this.code;
    }

    generateCodeForHorizontalLines(horizontalLines) {
        let pos = {x: 0, y: 0};

        this.code.push(CodeGenHorizVertPoint.INS_RST_VERTICAL);

        horizontalLines.forEach(horizontalLine => {
            //Move to next row if necessary
            //noinspection DuplicatedCode
            if (pos.y !== horizontalLine.y1) {
                if (pos.x !== 0) {
                    this.code.push(CodeGenHorizVertPoint.INS_RST_HORIZONTAL);
                }
                this.code.push(CodeGenHorizVertPoint.INS_MOV_DOWN);
                this.code.push(horizontalLine.y1 - pos.y);
                pos.x = 0;
                pos.y = horizontalLine.y1;
            }

            //Move to start of new line
            if (pos.x !== horizontalLine.x1) {
                this.code.push(CodeGenHorizVertPoint.INS_MOV_RIGHT);
                this.code.push(horizontalLine.x1 - pos.x);
                pos.x = horizontalLine.x1;
            }

            //Draw line
            this.code.push(CodeGenHorizVertPoint.INS_PEN_DOWN);
            this.code.push(CodeGenHorizVertPoint.INS_MOV_RIGHT);
            this.code.push(horizontalLine.x2 - pos.x);
            this.code.push(CodeGenHorizVertPoint.INS_PEN_UP);
            pos.x = horizontalLine.x2;
        });
    }

    generateCodeForVerticalLines(verticalLines, horizontalLines) {
        let pos = {x: 0, y: 0};

        this.code.push(CodeGenHorizVertPoint.INS_RST_HORIZONTAL);

        for (let i = 0; i < verticalLines.length; i++) {
            let verticalLine = verticalLines[i];
            let lineAlreadyDrawn = true;

            //Check if the lines are already drawn by searching for each pixel in horizontal lines
            for (let y = verticalLine.y1; y <= verticalLine.y2; y++) {
                let pixelFound = false;

                //Look in every horizontal line for that pixel
                for (let j = 0; j < horizontalLines.length; j++) {
                    let horizontalLine = horizontalLines[j];

                    if (horizontalLine.y1 === y && horizontalLine.x1 <= verticalLine.x1 && horizontalLine.x2 >= verticalLine.x1) {
                        pixelFound = true;
                        break;
                    }
                }

                if (!pixelFound) {
                    lineAlreadyDrawn = false;
                    break;
                }
            }

            if (lineAlreadyDrawn) {
                continue;
            }

            //Move to next column if necessary
            //noinspection DuplicatedCode
            if (pos.x !== verticalLine.x1) {
                if (pos.y !== 0) {
                    this.code.push(CodeGenHorizVertPoint.INS_RST_VERTICAL);
                }
                this.code.push(CodeGenHorizVertPoint.INS_MOV_RIGHT);
                this.code.push(verticalLine.x1 - pos.x);
                pos.x = verticalLine.x1;
                pos.y = 0;
            }

            //Move to start of new line
            if (pos.y !== verticalLine.y1) {
                this.code.push(CodeGenHorizVertPoint.INS_MOV_DOWN);
                this.code.push(verticalLine.y1 - pos.y);
                pos.y = verticalLine.y1;
            }

            //Draw line
            this.code.push(CodeGenHorizVertPoint.INS_PEN_DOWN);
            this.code.push(CodeGenHorizVertPoint.INS_MOV_DOWN);
            this.code.push(verticalLine.y2 - pos.y);
            this.code.push(CodeGenHorizVertPoint.INS_PEN_UP);
            pos.y = verticalLine.y2;
        }
    }

    generateCodeForPoints(points) {
        let pos = {x: 0, y: 0};

        this.code.push(CodeGenHorizVertPoint.INS_RST_HORIZONTAL);

        points.forEach(point => {
            //Move to next column if necessary
            //noinspection DuplicatedCode
            if (pos.x !== point.x) {
                if (pos.y !== 0) {
                    this.code.push(CodeGenHorizVertPoint.INS_RST_VERTICAL);
                }
                this.code.push(CodeGenHorizVertPoint.INS_MOV_RIGHT);
                this.code.push(point.x - pos.x);
                pos.x = point.x;
                pos.y = 0;
            }

            //Move to start of new line
            if (pos.y !== point.y) {
                this.code.push(CodeGenHorizVertPoint.INS_MOV_DOWN);
                this.code.push(point.y - pos.y);
                pos.y = point.y;
            }

            //Draw line
            this.code.push(CodeGenHorizVertPoint.INS_PEN_DOWN);
            this.code.push(CodeGenHorizVertPoint.INS_PEN_UP);
            pos.y = point.y;
        });
    }

    findHorizontalLines(plotterGrid) {
        let verticalLines = [];
        let lineLength = 0;

        for (let y = 0; y < plotterGrid[0].length; y++) {
            for (let x = 0; x <= plotterGrid.length; x++) {
                if (x !== plotterGrid.length && plotterGrid[x][y]) {
                    lineLength++;
                } else {
                    if (lineLength > 1) {
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

        console.log(verticalLines);
        return verticalLines;
    }

    findVerticalLines(plotterGrid) {
        let horizontalLines = [];
        let lineLength = 0;

        for (let x = 0; x < plotterGrid.length; x++) {
            for (let y = 0; y <= plotterGrid[0].length; y++) {
                if (y !== plotterGrid[0].length && plotterGrid[x][y]) {
                    lineLength++;
                } else {
                    if (lineLength > 1) {
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

        console.log(horizontalLines);
        return horizontalLines;
    }

    findPoints(plotterGrid) {
        let points = [];

        for (let x = 0; x < plotterGrid.length; x++) {
            for (let y = 0; y < plotterGrid[0].length; y++) {
                if (!plotterGrid[x][y]) {
                    continue;
                }

                //Left
                if (x !== 0 && plotterGrid[x - 1][y]) {
                    continue;
                }

                //Right
                if (x !== plotterGrid.length - 1 && plotterGrid[x + 1][y]) {
                    continue;
                }

                //Top
                if (y !== 0 && plotterGrid[x][y - 1]) {
                    continue;
                }

                //Bottom
                if (y !== plotterGrid[0].length - 1 && plotterGrid[x][y + 1]) {
                    continue;
                }

                points.push({
                    x: x,
                    y: y
                });
            }
        }

        console.log(points);
        return points;
    }
}