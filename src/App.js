import React, {Component} from 'react';
import P5Wrapper from 'react-p5-wrapper';

import Classes from './App.module.css';

import GridEditorP5 from "./GridEditor/GridEditor.p5";
import GridEditorStyles from "./GridEditor/GridEditor.module.css";
import PlotterGrid from "./PlotterGrid/PlotterGrid";
import SphereRendererP5 from "./GridEditor/SphereRenderer.p5";

class App extends Component {
    state = {
        visualCodeDecoderUpdateNeeded: false,
        visualCodeDecoderStep: 50,
        enableSphereRotation: true,
    };

    /**
     * @type {PlotterGrid}
     */
    plotterGrid = {};

    renderedPlotterGrid = {};

    constructor() {
        super();
        this.plotterGrid = new PlotterGrid(120, 28);
        this.getPlotterGrid = this.getPlotterGrid.bind(this);
        this.getRenderedPlotterGrid = this.getRenderedPlotterGrid.bind(this);
        this.isVisualCodeDecoderUpdateNeeded = this.isVisualCodeDecoderUpdateNeeded.bind(this);
    }

    /**
     * A way to provide realtime data to p5.js sketches without state changing
     * @return {PlotterGrid}
     */
    getPlotterGrid() {
        return this.plotterGrid;
    }

    /**
     * A way to provide realtime data to p5.js sketches without state changing
     */
    getRenderedPlotterGrid() {
        return this.renderedPlotterGrid;
    }

    isVisualCodeDecoderUpdateNeeded() {
        let currentVCDUNState = this.state.visualCodeDecoderUpdateNeeded;

        if (currentVCDUNState !== false) {
            this.setState({
                visualCodeDecoderUpdateNeeded: false
            });
        }

        return currentVCDUNState;
    }


    render() {
        return (
            <div className={GridEditorStyles.editorCanvas} onContextMenu={(e) => {
                e.preventDefault();
            }}>
                <P5Wrapper
                    sketch={GridEditorP5}
                    plotterGrid={this.getPlotterGrid}
                    renderedPlotterGrid={this.getRenderedPlotterGrid}
                    cellSize={8}
                    isVisualCodeDecoderUpdateNeeded={this.isVisualCodeDecoderUpdateNeeded}
                    visualCodeDecoderStep={this.state.visualCodeDecoderStep}
                />
                <P5Wrapper
                    sketch={SphereRendererP5}
                    renderedPlotterGrid={this.getRenderedPlotterGrid}
                    enableRotation={this.state.enableSphereRotation}
                    width={300}
                    height={300}
                />
                <button onClick={() => {
                    console.log(this.plotterGrid);
                    console.log(this.renderedPlotterGrid);
                }}>
                    Log plotter grid
                </button>
                <button onClick={() => {
                    this.plotterGrid.generatePlotterCode(PlotterGrid.GEN_HLBL);
                    this.setState({
                        visualCodeDecoderUpdateNeeded: true
                    });
                }}>
                    Generate HLBL code
                </button>
                <button onClick={() => {
                    this.plotterGrid.generatePlotterCode(PlotterGrid.GEN_VLBL);
                    this.setState({
                        visualCodeDecoderUpdateNeeded: true
                    });
                }}>
                    Generate VLBL code
                </button>
                <button onClick={() => {
                    this.plotterGrid.generatePlotterCode(PlotterGrid.GEN_HVP);
                    this.setState({
                        visualCodeDecoderUpdateNeeded: true
                    });
                }}>
                    Generate HVP code
                </button>
                <div className={Classes.debuggerControls}>
                    <button onClick={() => {
                        this.setState({
                            visualCodeDecoderUpdateNeeded: true,
                            visualCodeDecoderStep: this.state.visualCodeDecoderStep + 1
                        });
                    }}>
                        +
                    </button>
                    <span onWheel={(e) => {
                        this.setState({
                            visualCodeDecoderUpdateNeeded: true,
                            visualCodeDecoderStep: this.state.visualCodeDecoderStep - e.deltaY / 100
                        });
                    }}> Step {this.state.visualCodeDecoderStep} </span>
                    <button onClick={() => {
                        this.setState({
                            visualCodeDecoderUpdateNeeded: true,
                            visualCodeDecoderStep: this.state.visualCodeDecoderStep - 1
                        });
                    }}>
                        -
                    </button>
                </div>
                <button onClick={() => {
                    this.setState({
                        enableSphereRotation: !this.state.enableSphereRotation
                    });
                }}>
                    Toggle sphere rotation
                </button>
            </div>
        );
    }
}

export default App;