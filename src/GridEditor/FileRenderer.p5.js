/**
 * Preserve plotter grid reference between mounts
 * @type {PlotterGrid}
 */
let plotterGrid = null;

export default function FileRendererP5(p) {
    /**
     * @type {Dimension} gridSize
     */
    let plotterGridSize;


    p.setup = () => {
        plotterGridSize = plotterGrid.getSize();

        p.createCanvas(plotterGridSize.width, plotterGridSize.height);
        p.noLoop();
        p.noFill();
    };

    p.draw = () => {
        p.background(255);
        p.stroke(0);

        for (let w = 0; w < plotterGridSize.width; w++) {
            for (let h = 0; h < plotterGridSize.height; h++) {
                if (!plotterGrid.getCellState(w, h)) {
                    continue;
                }

                p.point(w, h);
            }
        }
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        plotterGrid = props.plotterGrid();
    };
};