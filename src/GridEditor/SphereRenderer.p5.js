export default function SphereRendererP5(p) {
    let renderedPlotterGrid = null;
    let texture = null;

    let canvas;

    /**
     * @type {number}
     */
    let lastTextureUpdateFrame = 0;

    /**
     * @type {number}
     */
    let height = 0;

    /**
     * @type {number}
     */
    let width = 0;

    /**
     * @type {boolean}
     */
    let enableRotation = true;

    /**
     * @type {number}
     */
    let currentRotation = 0;

    /**
     * @type {boolean}
     */
    let mouseRotationActive = false;

    /**
     * @type {number}
     */
    let mouseRotationOffset = 0;

    /**
     * @type {boolean}
     */
    let mouseRotationBase = 0;

    /**
     * @type {boolean}
     */
    let startMousePos = 0;


    p.setup = () => {
        p.setAttributes('antialias', true);
        canvas = p.createCanvas(width, height, p.WEBGL);
        canvas.mousePressed(mousePressed);
        canvas.mouseReleased(mouseReleased);
        canvas.mouseOut(mouseReleased);
        p.frameRate(30);

        p.noStroke();
        p.smooth();

        texture = p.createGraphics(960, 480);
    };

    p.draw = () => {
        if (p.frameCount - lastTextureUpdateFrame >= 3) {
            texture.background(240);
            texture.image(renderedPlotterGrid.graphics, 0, 120);

            lastTextureUpdateFrame = p.frameCount;
        }

        if (enableRotation) {
            currentRotation += 0.01;
        }

        if (mouseRotationActive) {
            mouseRotationOffset = mouseRotationBase + (getMousePosX() - startMousePos)
        }

        p.rotateY(currentRotation + mouseRotationOffset);
        p.texture(texture);
        p.sphere(120, 16, 16);
    };

    const mousePressed = () => {
        startMousePos = getMousePosX();
        mouseRotationActive = true;
    };

    const mouseReleased = () => {
        mouseRotationBase = mouseRotationOffset;
        mouseRotationActive = false;
    };

    const getMousePosX = () => {
        return p.mouseX / 100;
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        height = props.height;
        width = props.width;
        enableRotation = props.enableRotation;
        renderedPlotterGrid = props.renderedPlotterGrid();
    };
}