import PlotterGridInteractiveRenderer from "./PlotterGridInteractiveRenderer";
import VisualCodeDecoder from "../PlotterGrid/CodeDecoder/VisualCodeDecoder";

export default function GridEditorP5(p) {
    let renderedPlotterGrid = null;

    /**
     * @type {PlotterGrid}
     */
    let plotterGrid = null;

    /**
     * @type {PlotterGridInteractiveRenderer}
     */
    let plotterGridInteractiveRenderer = null;

    /**
     * @type {VisualCodeDecoder}
     */
    let visualCodeDecoder = null;

    /**
     * @type {Number}
     */
    let cellSize = 8;

    /**
     * @type {p5.Vector}
     */
    let lastClickVector;

    /**
     * @type {boolean}
     */
    let showCodeDecoder = true;

    /**
     * @type {boolean}
     */
    let isVisualCodeDecoderUpdateNeeded = false;

    p.setup = () => {
        p.setAttributes('antialias', true);
        p.createCanvas(plotterGrid.getSize().width * cellSize, plotterGrid.getSize().height * cellSize);
        p.frameRate(30);

        plotterGridInteractiveRenderer = new PlotterGridInteractiveRenderer(p, plotterGrid, cellSize, p.createVector(0, 0));
        visualCodeDecoder = new VisualCodeDecoder(p, plotterGrid.getSize(), cellSize);

        lastClickVector = p.createVector(0, 0);
    };

    p.draw = () => {
        p.image(plotterGridInteractiveRenderer.render(), 0, 0);

        if (showCodeDecoder) {
            if(isVisualCodeDecoderUpdateNeeded){
                visualCodeDecoder.decode(plotterGrid.plotterCode);
                isVisualCodeDecoderUpdateNeeded = false;
            }

            p.image(visualCodeDecoder.render(), 0, 0);
        }

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

        if(isVisualCodeDecoderUpdateNeeded === false){
            isVisualCodeDecoderUpdateNeeded = props.isVisualCodeDecoderUpdateNeeded();
        }
    };
};