import React, {Component} from 'react';

import Styles from './App.module.css';
import PlotterGrid from "./PlotterGrid/PlotterGrid";

import Sphere from "./Components/Sphere/Sphere";
import Editor from "./Components/Editor/Editor";
import BottomButtonBar from "./Components/BottomButtonBar/BottomButtonBar";
import Modal from "./Components/UI/Modal/Modal";
import GetCodeModal from "./Components/GetCodeModal/GetCodeModal";

class App extends Component {
    state = {
        serializedPlotterGrid: "",
        sphereRotation: true,
        showGetCodeModal: false
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
                    rotation={this.state.sphereRotation}
                />
                <BottomButtonBar
                    plotterGrid={this.getPlotterGrid}
                    showGetCodeModal={() => this.setState({showGetCodeModal: true})}
                    toggleSphereRotation={() => this.setState({sphereRotation: !this.state.sphereRotation})}
                />
                <Modal
                    visible={this.state.showGetCodeModal}
                    hideModal={() => this.setState({showGetCodeModal: false})}
                >
                    <GetCodeModal
                        code={this.plotterGrid.plotterCodeBlock}
                    />
                </Modal>

                <div>
                    <textarea onChange={(e) => {
                        this.setState({
                            serializedPlotterGrid: e.target.value
                        });
                    }} value={this.state.serializedPlotterGrid}/>
                    <button onClick={() => {
                        this.setState({
                            serializedPlotterGrid: this.plotterGrid.save()
                        });
                    }}>Get
                    </button>
                    <button onClick={() => {
                        this.plotterGrid.load(this.state.serializedPlotterGrid);
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