import React, {Component} from 'react';

import Styles from './App.module.css';
import PlotterGrid from "./PlotterGrid/PlotterGrid";

import Sphere from "./Components/Sphere/Sphere";
import Editor from "./Components/Editor/Editor";
import BottomButtonBar from "./Components/BottomButtonBar/BottomButtonBar";
import Modal from "./Components/UI/Modal/Modal";
import GetCodeModal from "./Components/GetCodeModal/GetCodeModal";
import LoadSaveModal from "./Components/LoadSaveModal/LoadSaveModal";
import FileRenderer from "./Components/FileRenderer/FileRenderer";

class App extends Component {
    state = {
        serializedPlotterGrid: "",
        sphereRotation: true,
        showGetCodeModal: false,
        showLoadSaveModal: false,
        saveCanvas: false
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
                    modalActive={this.state.showGetCodeModal || this.state.showLoadSaveModal}
                />
                <Sphere
                    renderedPlotterGrid={this.getRenderedPlotterGrid}
                    rotation={this.state.sphereRotation}
                />
                <BottomButtonBar
                    plotterGrid={this.getPlotterGrid}
                    showGetCodeModal={() => this.setState({showGetCodeModal: true})}
                    showLoadSaveModal={() => this.setState({showLoadSaveModal: true})}
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
                <Modal
                    visible={this.state.showLoadSaveModal}
                    hideModal={() => this.setState({showLoadSaveModal: false})}
                >
                    <LoadSaveModal
                        plotterGrid={this.getPlotterGrid}
                        saveCanvas={() => {
                            this.setState({saveCanvas: true})
                        }}
                    />
                </Modal>
                <FileRenderer
                    plotterGrid={this.getPlotterGrid}
                    saveCanvas={() => {
                        let temp = this.state.saveCanvas;

                        if (temp) {
                            this.setState({saveCanvas: !temp});
                        }

                        return temp;
                    }}
                />
            </div>
        );
    }
}

export default App;