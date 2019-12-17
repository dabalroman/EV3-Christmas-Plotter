/**
 * Preserve plotter grid reference between mounts
 * @type {PlotterGrid}
 */
let plotterGrid = null;

export default function FileRendererP5(p) {
    /**
     * @type {Dimension} gridSize
     */
    let plotterGridSize;

    let canvas;

    p.setup = () => {
        plotterGridSize = plotterGrid.getSize();

        canvas = p.createCanvas(plotterGridSize.width, plotterGridSize.height);
        p.noLoop();
        p.noFill();
        drawCanvas();
    };

    const drawCanvas = () => {
        p.background(255);
        p.stroke(0);

        for (let w = 0; w < plotterGridSize.width; w++) {
            for (let h = 0; h < plotterGridSize.height; h++) {
                if (!plotterGrid.getCellState(w, h)) {
                    continue;
                }

                p.point(w, h);
            }
        }
        plotterGrid.save();
    };

    const loadCanvas = (path) => {
        let reader = new FileReader();

        reader.onload = function (e) {
            let img = p.createImg(e.target.result, '', '', () => {
                if (img.width < 120 || img.height < 28) {
                    img.remove();
                    return;
                }

                p.background(255);
                p.image(img, 0, 0);

                for (let x = 0; x < plotterGridSize.width; x++) {
                    for (let y = 0; y < plotterGridSize.height; y++) {
                        plotterGrid.setCellState(x, y, p.get(x, y)[0] <= 127);
                    }
                }

                img.remove();
                plotterGrid.save();
            });
        };
        reader.readAsDataURL(path);
    };

    p.myCustomRedrawAccordingToNewPropsHandler = (props) => {
        plotterGrid = props.plotterGrid();

        if (props.loadCanvas !== undefined) {
            let path = props.loadCanvas();

            if (path && path !== true) {
                loadCanvas(path);
            }
        }

        if (props.saveCanvas !== undefined && props.saveCanvas() === true) {
            drawCanvas();
            p.saveCanvas(canvas, 'christmass_ball', 'png');
        }
    };
};