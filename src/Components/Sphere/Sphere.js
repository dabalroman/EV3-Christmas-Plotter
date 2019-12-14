import React from 'react';
import SphereRendererP5 from "../../GridEditor/SphereRenderer.p5";
import P5Wrapper from "react-p5-wrapper";
import Styles from './Sphere.module.css';

const Sphere = (props) => {
    return (
        <div id="Sphere" className={Styles.sphere}>
            <div className={Styles.touchy}>
                <P5Wrapper
                    sketch={SphereRendererP5}
                    renderedPlotterGrid={props.renderedPlotterGrid}
                    enableRotation={props.rotation}
                    width={300}
                    height={300}
                />
            </div>
        </div>
    );
};

export default Sphere;
