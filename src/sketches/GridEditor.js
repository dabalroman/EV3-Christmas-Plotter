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

    /**
     * @type {p5.Vector} lastClickVector
     */
    let lastClickVector;

    let sphereG, sphereTexture;

    p.setup = () => {
        p.createCanvas(960, 600);
        p.frameRate(30);

        printerGrid = new PrinterGrid(120, 21);
        printerGrid.random();

        printerGridRenderer = new PrinterGridInteractiveRenderer(p, printerGrid, 8, p.createVector(0, 300));

        lastClickVector = p.createVector(0, 0);

        sphereG = p.createGraphics(300, 300, p.WEBGL);
        sphereG.smooth();
        sphereG.noStroke();

        sphereTexture = p.createGraphics(600, 300);
    };

    p.draw = () => {
        p.background(255);
        p.fill(255);
        let img = printerGridRenderer.render();
        p.image(img, 0, 300);

        p.noFill();
        p.stroke(50);
        p.rect(0, 0, 600, 300);

        sphereTexture.background(240);
        sphereTexture.image(img, 0, 100, 600, 100);

        sphereG.background(255);
        sphereG.fill(255, 0, 255);
        sphereG.rotateY(0.01);
        sphereG.texture(sphereTexture);
        sphereG.sphere(120, 16, 16);
        p.image(sphereG, 660, 0);
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