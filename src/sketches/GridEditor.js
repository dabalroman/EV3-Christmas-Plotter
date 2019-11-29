import PlotterGrid from "./PlotterGrid";
import PlotterGridInteractiveRenderer from "./PlotterGridInteractiveRenderer";
import SphereRenderer from "./SphereRenderer";

export default function GridEditor(p) {
    /**
     * @type {PlotterGrid} plotterGrid
     */
    let plotterGrid;

    /**
     * @type {PlotterGridInteractiveRenderer} plotterGridRenderer
     */
    let plotterGridRenderer;

    /**
     * @type {SphereRenderer} sphereRenderer
     */
    let sphereRenderer;

    /**
     * @type {p5.Vector} lastClickVector
     */
    let lastClickVector;

    p.setup = () => {
        p.setAttributes('antialias', true);
        p.createCanvas(960, 460);
        p.frameRate(30);

        plotterGrid = new PlotterGrid(120, 19);
        plotterGrid.setCellState(1, 0);
        plotterGrid.setCellState(2, 0);
        plotterGrid.setCellState(3, 0);
        plotterGrid.setCellState(7, 0);
        plotterGrid.setCellState(8, 0);
        plotterGrid.setCellState(9, 0);
        plotterGrid.setCellState(13, 0);
        plotterGrid.setCellState(14, 0);
        plotterGrid.setCellState(3, 1);
        plotterGrid.setCellState(4, 1);
        plotterGrid.setCellState(5, 1);
        plotterGrid.setCellState(9, 1);
        plotterGrid.setCellState(12, 1);
        plotterGrid.setCellState(13, 1);

        plotterGrid.generatePlotterCode();

        plotterGridRenderer = new PlotterGridInteractiveRenderer(p, plotterGrid, 8, p.createVector(0, 300));
        sphereRenderer = new SphereRenderer(p, plotterGridRenderer.getRenderedGrid());

        lastClickVector = p.createVector(0, 0);
    };

    p.draw = () => {
        p.image(plotterGridRenderer.render(), 0, 300);
        p.image(sphereRenderer.render(), 660, 0);
    };

    p.mouseDragged = () => {
        p.mousePressed();
    };

    p.mousePressed = () => {
        lastClickVector.x = p.mouseX;
        lastClickVector.y = p.mouseY;

        plotterGridRenderer.setCellAtPoint(lastClickVector, p.mouseButton === p.LEFT);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {

    }
};