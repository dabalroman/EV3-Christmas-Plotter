import React from 'react';
import Styles from "./FileRenderer.module.css";
import P5Wrapper from "react-p5-wrapper";
import FileRendererP5 from "../../GridEditor/FileRenderer.p5";

const fileRenderer = (props) => {
    return (
        <div className={Styles.fileSaveRenderer}>
            <P5Wrapper
                sketch={FileRendererP5}
                plotterGrid={props.plotterGrid}
                saveCanvas={props.saveCanvas}
            />
        </div>
    );
};

export default fileRenderer;