export default function SphereRenderer(p) {
    let renderedPlotterGrid = null;
    let texture = null;

    /**
     * @type {Number}
     */
    let lastTextureUpdateFrame = 0;

    /**
     * @type {Number}
     */
    let height = 0;

    /**
     * @type {Number}
     */
    let width = 0;

    p.setup = () => {
        p.setAttributes('antialias', true);
        p.createCanvas(width, height, p.WEBGL);
        p.frameRate(30);

        p.noStroke();
        p.smooth();

        texture = p.createGraphics(960, 720);
    };

    p.draw = () => {

        if (p.frameCount - lastTextureUpdateFrame >= 3) {
            texture.background(240);
            texture.image(renderedPlotterGrid.graphics, 0, 240);

            lastTextureUpdateFrame = p.frameCount;
        }

        p.background(255);
        p.rotateY(p.millis() / 5000);
        p.texture(texture);
        p.sphere(120, 16, 16);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        height = props.height;
        width = props.width;
        renderedPlotterGrid = props.renderedPlotterGrid();
    };
}