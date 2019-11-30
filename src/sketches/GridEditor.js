import PlotterGridInteractiveRenderer from "./PlotterGridInteractiveRenderer";

export default function GridEditor(p) {
    let renderedPlotterGrid = null;

    /**
     * @type {PlotterGrid} plotterGrid
     */
    let plotterGrid = null;

    /**
     * @type {PlotterGridInteractiveRenderer} plotterGridInteractiveRenderer
     */
    let plotterGridInteractiveRenderer = null;

    /**
     * @type {Number} cellSize
     */
    let cellSize = 8;

    /**
     * @type {p5.Vector} lastClickVector
     */
    let lastClickVector;

    p.setup = () => {
        p.setAttributes('antialias', true);
        p.createCanvas(plotterGrid.getSize().width * cellSize, plotterGrid.getSize().height * cellSize);
        p.frameRate(30);

        plotterGridInteractiveRenderer = new PlotterGridInteractiveRenderer(p, plotterGrid, cellSize, p.createVector(0, 0));

        lastClickVector = p.createVector(0, 0);
    };

    p.draw = () => {
        p.image(plotterGridInteractiveRenderer.render(), 0, 0);
        renderedPlotterGrid.graphics = plotterGridInteractiveRenderer.getRenderedGrid();
    };

    p.mouseDragged = () => {
        p.mousePressed();
    };

    p.mousePressed = () => {
        lastClickVector.x = p.mouseX;
        lastClickVector.y = p.mouseY;

        plotterGridInteractiveRenderer.setCellAtPoint(lastClickVector, p.mouseButton === p.LEFT);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        plotterGrid = props.plotterGrid();
        renderedPlotterGrid = props.renderedPlotterGrid();
        cellSize = props.cellSize;
    };
};