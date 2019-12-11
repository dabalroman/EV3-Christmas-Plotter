import React, {Component} from 'react';
import SphereRendererP5 from "../../GridEditor/SphereRenderer.p5";
import Button from '../UI/Button/Button';
import P5Wrapper from "react-p5-wrapper";
import Styles from './Sphere.module.css';

export default class Sphere extends Component {
    state = {
        enableSphereRotation: true
    };

    constructor() {
        super();
        this.toggleSphereRotation = this.toggleSphereRotation.bind(this);
    }

    toggleSphereRotation() {
        this.setState({
            enableSphereRotation: !this.state.enableSphereRotation
        });
    }

    render() {
        return (
            <div id="Sphere" className={Styles.sphere}>
                <div className={Styles.touchy}>
                    <P5Wrapper
                        sketch={SphereRendererP5}
                        renderedPlotterGrid={this.props.renderedPlotterGrid}
                        enableRotation={this.state.enableSphereRotation}
                        width={300}
                        height={300}
                    />
                </div>
                <Button onClick={this.toggleSphereRotation}>Włącz/wyłącz obrót</Button>
            </div>
        );
    }
}