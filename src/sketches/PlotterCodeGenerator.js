export default class PlotterCodeGenerator {
    static INS_START = 255;
    static INS_DONE = 256;
    static INS_PEN_DOWN = 0;
    static INS_PEN_UP = 1;
    static INS_MOV_RIGHT = 2;
    static INS_MOV_LEFT = 3;
    static INS_MOV_UP = 4;
    static INS_MOV_DOWN = 5;
    static INS_MOV_UP_RIGHT = 6;
    static INS_MOV_DOWN_LEFT = 7;
    static INS_MOV_UP_LEFT = 14;
    static INS_MOV_DOWN_RIGHT = 15;
    static INS_RST_VERTICAL = 16;
    static INS_RST_HORIZONTAL = 17;

    /**
     * @param {Boolean[][]} plotterGrid
     */
    generateCode(plotterGrid){
        /**
         * Array with numeric instructions
         * @type {[number]} code
         */
        let code = [PlotterCodeGenerator.INS_START];

        let verticalLines = this.findVerticalLines(plotterGrid);
        let horizontalLines = this.findHorizontalLines(plotterGrid);
    }

    findVerticalLines(plotterGrid){
        let verticalLines = [];
        let lineLength = 0;

        for(let y = 0; y < plotterGrid[0].length; y++){
            for(let x = 0; x < plotterGrid.length; x++){
                if(plotterGrid[x][y] && (x + 1 !== plotterGrid.length)){
                    lineLength++;
                } else {
                    if(lineLength > 1){
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

    findHorizontalLines(plotterGrid){
        let horizontalLines = [];
        let lineLength = 0;

        for(let x = 0; x < plotterGrid.length; x++){
            for(let y = 0; y < plotterGrid[0].length; y++){
                if(plotterGrid[x][y] && (y + 1 !== plotterGrid[0].length)){
                    lineLength++;
                } else {
                    if(lineLength > 1){
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

    findPoints(plotterGrid){

    }
}