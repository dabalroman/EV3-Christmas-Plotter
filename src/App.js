import React, {Component} from 'react';

import Styles from './App.module.css';
import PlotterGrid from "./PlotterGrid/PlotterGrid";

import Sphere from "./Components/Sphere/Sphere";
import Editor from "./Components/Editor/Editor";
import BottomButtonBar from "./Components/BottomButtonBar/BottomButtonBar";

class App extends Component {
    state = {
        serializedPlotterGrid: ""
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

    render() {
        return (
            <div className={Styles.app} onContextMenu={(e) => {
                e.preventDefault();
            }}>
                <Editor
                    getPlotterGrid={this.getPlotterGrid}
                    getRenderedPlotterGrid={this.getRenderedPlotterGrid}
                />
                <Sphere
                    renderedPlotterGrid={this.getRenderedPlotterGrid}
                />
                <BottomButtonBar
                    plotterGrid={this.getPlotterGrid}
                />
                <div className={Styles.debuggerControls}>
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
                <div>
                    <textarea onChange={(e) => {
                        this.setState({
                            serializedPlotterGrid: e.target.value
                        });
                    }} value={this.state.serializedPlotterGrid}/>
                    <button onClick={() => {
                        this.setState({
                            serializedPlotterGrid: this.plotterGrid.serialize()
                        });
                    }}>Get
                    </button>
                    <button onClick={() => {
                        this.plotterGrid.deserialize(this.state.serializedPlotterGrid);
                        this.setState({
                            canvasUpdateNeeded: true
                        });
                    }}>Set
                    </button>
                </div>
            </div>
        );
    }
}

export default App;