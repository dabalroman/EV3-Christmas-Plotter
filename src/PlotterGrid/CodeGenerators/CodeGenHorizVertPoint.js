import CodeGenerator from "./CodeGenerator";

export default class CodeGenHorizVertPoint extends CodeGenerator {
    generateCode(plotterGrid: Boolean[][]) {
        this.code.push(CodeGenHorizVertPoint.INS_START);
        this.code.push(CodeGenHorizVertPoint.INS_PEN_UP);

        let horizontalLines = this.findHorizontalLines(plotterGrid);
        let verticalLines = this.findVerticalLines(plotterGrid);
        let points = this.findPoints(plotterGrid);

        this.generateCodeForHorizontalLines(horizontalLines);
        this.generateCodeForVerticalLines(verticalLines);
        this.generateCodeForPoints(points);

        this.code.push(CodeGenHorizVertPoint.INS_DONE);

        console.log(this.code);
        return this.code;
    }

    generateCodeForHorizontalLines(horizontalLines) {
        let pos = {x: 0, y: 0};

        this.code.push(CodeGenHorizVertPoint.INS_RST_VERTICAL);

        horizontalLines.forEach(e => {
            //Move to next row if necessary
            //noinspection DuplicatedCode
            if (pos.y !== e.y1) {
                if (pos.x !== 0) {
                    this.code.push(CodeGenHorizVertPoint.INS_RST_HORIZONTAL);
                }
                this.code.push(CodeGenHorizVertPoint.INS_MOV_DOWN);
                this.code.push(e.y1 - pos.y);
                pos.x = 0;
                pos.y = e.y1;
            }

            //Move to start of new line
            if (pos.x !== e.x1) {
                this.code.push(CodeGenHorizVertPoint.INS_MOV_RIGHT);
                this.code.push(e.x1 - pos.x);
                pos.x = e.x1;
            }

            //Draw line
            this.code.push(CodeGenHorizVertPoint.INS_PEN_DOWN);
            this.code.push(CodeGenHorizVertPoint.INS_MOV_RIGHT);
            this.code.push(e.x2 - pos.x);
            this.code.push(CodeGenHorizVertPoint.INS_PEN_UP);
            pos.x = e.x2;
        });
    }

    generateCodeForVerticalLines(verticalLines) {
        let pos = {x: 0, y: 0};

        this.code.push(CodeGenHorizVertPoint.INS_RST_HORIZONTAL);

        verticalLines.forEach(e => {
            //Move to next column if necessary
            //noinspection DuplicatedCode
            if (pos.x !== e.x1) {
                if (pos.y !== 0) {
                    this.code.push(CodeGenHorizVertPoint.INS_RST_VERTICAL);
                }
                this.code.push(CodeGenHorizVertPoint.INS_MOV_RIGHT);
                this.code.push(e.x1 - pos.x);
                pos.x = e.x1;
                pos.y = 0;
            }

            //Move to start of new line
            if (pos.y !== e.y1) {
                this.code.push(CodeGenHorizVertPoint.INS_MOV_DOWN);
                this.code.push(e.y1 - pos.y);
                pos.y = e.y1;
            }

            //Draw line
            this.code.push(CodeGenHorizVertPoint.INS_PEN_DOWN);
            this.code.push(CodeGenHorizVertPoint.INS_MOV_DOWN);
            this.code.push(e.y2 - pos.y);
            this.code.push(CodeGenHorizVertPoint.INS_PEN_UP);
            pos.y = e.y2;
        });
    }

    generateCodeForPoints(points) {
        let pos = {x: 0, y: 0};

        this.code.push(CodeGenHorizVertPoint.INS_RST_HORIZONTAL);

        points.forEach(e => {
            //Move to next column if necessary
            //noinspection DuplicatedCode
            if (pos.x !== e.x) {
                if (pos.y !== 0) {
                    this.code.push(CodeGenHorizVertPoint.INS_RST_VERTICAL);
                }
                this.code.push(CodeGenHorizVertPoint.INS_MOV_RIGHT);
                this.code.push(e.x - pos.x);
                pos.x = e.x;
                pos.y = 0;
            }

            //Move to start of new line
            if (pos.y !== e.y) {
                this.code.push(CodeGenHorizVertPoint.INS_MOV_DOWN);
                this.code.push(e.y - pos.y);
                pos.y = e.y;
            }

            //Draw line
            this.code.push(CodeGenHorizVertPoint.INS_PEN_DOWN);
            this.code.push(CodeGenHorizVertPoint.INS_PEN_UP);
            pos.y = e.y;
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