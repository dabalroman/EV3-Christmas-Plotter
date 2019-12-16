import React, {Component} from 'react';

import Styles from './App.module.css';
import PlotterGrid from "./PlotterGrid/PlotterGrid";

import Sphere from "./Components/Sphere/Sphere";
import Editor from "./Components/Editor/Editor";
import BottomButtonBar from "./Components/BottomButtonBar/BottomButtonBar";
import Modal from "./Components/UI/Modal/Modal";
import GetCodeModal from "./Components/GetCodeModal/GetCodeModal";
import LoadModal from "./Components/LoadModal/LoadModal";
import FileRenderer from "./Components/FileRenderer/FileRenderer";
import StartupModal from "./Components/StartupModal/StartupModal";

class App extends Component {
    state = {
        sphereRotation: true,
        showGetCodeModal: false,
        showLoadModal: false,
        showStartupModal: true,
        saveCanvas: false,
        loadCanvas: false
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
                <div className={Styles.version}>v 1.0.1 - 16/12/2019</div>
                <Editor
                    getPlotterGrid={this.getPlotterGrid}
                    getRenderedPlotterGrid={this.getRenderedPlotterGrid}
                    modalActive={this.state.showGetCodeModal || this.state.showLoadModal || this.state.showStartupModal}
                />

                <Sphere
                    renderedPlotterGrid={this.getRenderedPlotterGrid}
                    rotation={this.state.sphereRotation}
                />

                <BottomButtonBar
                    plotterGrid={this.getPlotterGrid}
                    showGetCodeModal={() => this.setState({showGetCodeModal: true})}
                    showLoadModal={() => this.setState({showLoadModal: true})}
                    toggleSphereRotation={() => this.setState({sphereRotation: !this.state.sphereRotation})}
                    saveCanvas={() => {
                        this.setState({saveCanvas: true})
                    }}
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
                    visible={this.state.showLoadModal}
                    hideModal={() => this.setState({showLoadModal: false})}
                >
                    <LoadModal
                        loadCanvas={(path) => {
                            this.setState({loadCanvas: path})
                        }}
                        hideModal={() => this.setState({showLoadModal: false})}
                    />
                </Modal>

                <Modal
                    visible={this.state.showStartupModal}
                    hideModal={() => this.setState({showStartupModal: false})}
                >
                    <StartupModal/>
                </Modal>

                <FileRenderer
                    plotterGrid={this.getPlotterGrid}

                    saveCanvas={() => {
                        let temp = this.state.saveCanvas;

                        if (temp) {
                            this.setState({saveCanvas: false});
                        }

                        return temp;
                    }}

                    loadCanvas={() => {
                        let temp = this.state.loadCanvas;

                        if (temp) {
                            this.setState({loadCanvas: false});
                        }

                        return temp;
                    }}
                />
            </div>
        );
    }
}

export default App;