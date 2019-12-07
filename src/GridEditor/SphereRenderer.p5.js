export default function SphereRendererP5(p) {
    let renderedPlotterGrid = null;
    let texture = null;

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

    p.setup = () => {
        p.setAttributes('antialias', true);
        p.createCanvas(width, height, p.WEBGL);
        p.frameRate(30);

        p.noStroke();
        p.smooth();

        texture = p.createGraphics(960, 480);
    };

    p.draw = () => {

        p.orbitControl(2, 2, 2);

        if (p.frameCount - lastTextureUpdateFrame >= 3) {
            texture.background(240);
            texture.image(renderedPlotterGrid.graphics, 0, 120);

            lastTextureUpdateFrame = p.frameCount;
        }

        if (enableRotation) {
            currentRotation += 0.01;
        }

        p.rotateY(currentRotation);
        p.texture(texture);
        p.sphere(120, 16, 16);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        height = props.height;
        width = props.width;
        enableRotation = props.enableRotation;
        renderedPlotterGrid = props.renderedPlotterGrid();
    };
}