export default class SphereRenderer{
    p;
    canvas;
    texture;
    renderedPrinterGrid;

    /**
     * @type {Number}
     */
    lastTextureUpdateFrame = 0;

    constructor(p, renderedPrinterGrid){
        this.p = p;

        this.canvas = p.createGraphics(300, 300, p.WEBGL);
        this.canvas.noStroke();
        this.canvas.smooth();
        this.canvas.fill(255, 0, 255);

        this.texture = p.createGraphics(600, 300);

        this.renderedPrinterGrid = renderedPrinterGrid;
    }

    render(){
        //Update texture every second
        if(this.p.frameCount - this.lastTextureUpdateFrame >= 3){
            this.texture.background(240);
            this.texture.image(this.renderedPrinterGrid, 0, 100, 600, 100);

            this.lastTextureUpdateFrame = this.p.frameCount;
        }

        this.canvas.background(255);
        this.canvas.rotateY(0.01);
        this.canvas.texture(this.texture);
        this.canvas.sphere(120, 16, 16);

        return this.canvas;
    }
}