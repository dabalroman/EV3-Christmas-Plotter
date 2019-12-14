import React, {Component} from 'react';

import Styles from './App.module.css';
import PlotterGrid from "./PlotterGrid/PlotterGrid";

import Sphere from "./Components/Sphere/Sphere";
import Editor from "./Components/Editor/Editor";
import BottomButtonBar from "./Components/BottomButtonBar/BottomButtonBar";

class App extends Component {
    state = {
        serializedPlotterGrid: "",
        sphereRotation: true
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
        this.toggleSphereRotation = this.toggleSphereRotation.bind(this);
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

    toggleSphereRotation() {
        this.setState({
            sphereRotation: !this.state.sphereRotation
        });
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
                    rotation={this.state.sphereRotation}
                />
                <BottomButtonBar
                    plotterGrid={this.getPlotterGrid}
                    toggleSphereRotation={this.toggleSphereRotation}
                />
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