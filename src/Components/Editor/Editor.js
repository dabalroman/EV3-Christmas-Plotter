import React, {Component} from 'react';
import P5Wrapper from "react-p5-wrapper";
import Styles from './Editor.module.css';
import GridEditorP5 from "../../GridEditor/GridEditor.p5";

export default class Editor extends Component {
    state = {
        visualCodeDecoderUpdateNeeded: false,
        visualCodeDecoderStep: 1000,
        serializedPlotterGrid: ""
    };

    constructor() {
        super();
        this.isVisualCodeDecoderUpdateNeeded = this.isVisualCodeDecoderUpdateNeeded.bind(this);
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
            <div id="Editor" className={Styles.editor}>
                <div className={Styles.container}>
                    <P5Wrapper
                        sketch={GridEditorP5}
                        plotterGrid={this.props.getPlotterGrid}
                        renderedPlotterGrid={this.props.getRenderedPlotterGrid}
                        cellSize={8}
                        isVisualCodeDecoderUpdateNeeded={this.isVisualCodeDecoderUpdateNeeded}
                        visualCodeDecoderStep={this.state.visualCodeDecoderStep}
                        ignoreInput={this.props.modalActive}
                    />
                </div>
            </div>
        );
    }
}