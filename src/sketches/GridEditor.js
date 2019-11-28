import PrinterGrid from "./PrinterGrid";
import PrinterGridInteractiveRenderer from "./PrinterGridInteractiveRenderer";
import SphereRenderer from "./SphereRenderer";

export default function GridEditor(p) {
    /**
     * @type {PrinterGrid} printerGrid
     */
    let printerGrid;

    /**
     * @type {PrinterGridInteractiveRenderer} printerGridRenderer
     */
    let printerGridRenderer;

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

        printerGrid = new PrinterGrid(120, 19);
        printerGrid.random();

        printerGridRenderer = new PrinterGridInteractiveRenderer(p, printerGrid, 8, p.createVector(0, 300));
        sphereRenderer = new SphereRenderer(p, printerGridRenderer.getRenderedGrid());

        lastClickVector = p.createVector(0, 0);
    };

    p.draw = () => {
        p.image(printerGridRenderer.render(), 0, 300);
        p.image(sphereRenderer.render(), 660, 0);
    };

    p.mouseDragged = () => {
        p.mousePressed();
    };

    p.mousePressed = () => {
        lastClickVector.x = p.mouseX;
        lastClickVector.y = p.mouseY;

        printerGridRenderer.setCellAtPoint(lastClickVector, p.mouseButton === p.LEFT);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {

    }
};