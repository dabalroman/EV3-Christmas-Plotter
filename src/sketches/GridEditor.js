import PrinterGrid from "./PrinterGrid";
import PrinterGridInteractiveRenderer from "./PrinterGridInteractiveRenderer";

export default function GridEditor(p) {
    /**
     * @type {PrinterGrid} printerGrid
     */
    let printerGrid;

    /**
     * @type {PrinterGridInteractiveRenderer} printerGridRenderer
     */
    let printerGridRenderer;

    p.setup = () => {
        p.createCanvas(300, 300);
        p.frameRate(60);

        printerGrid = new PrinterGrid(15, 15);
        printerGrid.setCell(0, 1);
        printerGrid.setCell(8, 4);
        console.log(printerGrid.toString());

        printerGridRenderer = new PrinterGridInteractiveRenderer(p, printerGrid, 25, p.createVector(0, 0));
    };

    p.draw = () => {
        p.background(255);
        p.fill(255);
        p.image(printerGridRenderer.render(), 0, 0);
        printerGrid.setCell(Math.floor(p.random(0, 15)), Math.floor(p.random(0, 15)), Math.floor(p.random(0, 2)));
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (newProps) => {

    }
};