import React from 'react';
import Styles from './BottomButtonBar.module.css'
import Button from "../UI/Button/Button";
import ButtonBar from "../UI/ButtonBar/ButtonBar";
import PlotterGrid from "../../PlotterGrid/PlotterGrid";

const bottomButtonBar = (props) => {
    return (
        <div className={Styles.bottomButtonBar}>
            <ButtonBar>
                <Button onClick={() => {
                    props.plotterGrid().clear();
                }}
                        danger={true}
                >
                    Wyczyść obraz
                </Button>
                <Button onClick={() => {
                    props.toggleSphereRotation();
                }}>Włącz / Wyłącz obrót podglądu</Button>
                <Button onClick={() => {
                    props.plotterGrid().generatePlotterCode(PlotterGrid.GEN_VLBL);
                    props.showGetCodeModal();
                }}
                >
                    Pobierz kod dla EV3
                </Button>
            </ButtonBar>
        </div>
    );
};

export default bottomButtonBar;