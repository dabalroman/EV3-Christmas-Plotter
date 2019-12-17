/**
 * Preserve plotter grid reference between mounts
 * @type {PlotterGrid}
 */
let plotterGrid = null;

export default function FileRendererP5(p) {
    const IMG_WIDTH = 120;
    const IMG_HEIGHT = 28;

    /**
     * @type {Dimension} gridSize
     */
    let plotterGridSize;

    p.setup = () => {
        plotterGridSize = plotterGrid.getSize();

        p.noLoop();
        p.noFill();
    };

    const saveGraphics = () => {
        let saveGraphics = p.createGraphics(IMG_WIDTH, IMG_HEIGHT);

        saveGraphics.background(255);
        saveGraphics.stroke(0);

        for (let w = 0; w < plotterGridSize.width; w++) {
            for (let h = 0; h < plotterGridSize.height; h++) {
                if (!plotterGrid.getCellState(w, h)) {
                    continue;
                }

                saveGraphics.point(w, h);
            }
        }

        p.save(saveGraphics, 'christmass_ball', 'png');
        saveGraphics.remove();
        plotterGrid.save();
    };

    const loadGraphics = (path) => {
        let reader = new FileReader();

        reader.onload = function (e) {
            let img = p.createImg(e.target.result, '', '', () => {
                if (img.width < IMG_WIDTH || img.height < IMG_HEIGHT) {
                    img.remove();
                    return;
                }

                //Allow to load images with res scaled up by integer factor
                let scale = 1;
                if (img.width % IMG_WIDTH === 0 && img.height % IMG_HEIGHT === 0) {
                    scale = img.width / IMG_WIDTH;
                }

                let loadGraphics = p.createGraphics(img.width, img.height);
                loadGraphics.background(255);
                loadGraphics.image(img, 0, 0);

                for (let x = 0; x < plotterGridSize.width; x++) {
                    for (let y = 0; y < plotterGridSize.height; y++) {
                        plotterGrid.setCellState(x, y, loadGraphics.get(x * scale, y * scale)[0] <= 127);
                    }
                }

                img.remove();
                loadGraphics.remove();
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
                loadGraphics(path);
            }
        }

        if (props.saveCanvas !== undefined && props.saveCanvas() === true) {
            saveGraphics();
        }
    };
};