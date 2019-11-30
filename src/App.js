import React, {Component} from 'react';
import P5Wrapper from 'react-p5-wrapper';
import './App.css';

import GridEditor from "./P5Sketches/GridEditor";
import GridEditorStyles from "./P5Sketches/GridEditor.module.css";
import PlotterGrid from "./PlotterGrid/PlotterGrid";
import SphereRenderer from "./P5Sketches/SphereRenderer";

class App extends Component {
    /**
     * @type {PlotterGrid}
     */
    plotterGrid = {};

    renderedPlotterGrid = {};

    constructor() {
        super();
        this.plotterGrid = new PlotterGrid(120, 30);
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

    getRenderedPlotterGrid() {
        return this.renderedPlotterGrid;
    }

    render() {
        return (
            <div className={GridEditorStyles.editorCanvas} onContextMenu={(e) => {
                e.preventDefault();
            }}>
                <P5Wrapper
                    sketch={GridEditor}
                    plotterGrid={this.getPlotterGrid}
                    renderedPlotterGrid={this.getRenderedPlotterGrid}
                    cellSize={8}/>
                <P5Wrapper
                    sketch={SphereRenderer}
                    renderedPlotterGrid={this.getRenderedPlotterGrid}
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
                    this.plotterGrid.generatePlotterCode()
                }}>
                    Generate code
                </button>
            </div>
        );
    }
}

export default App;