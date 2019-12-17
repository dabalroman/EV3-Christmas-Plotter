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
                    <i className='icon-trash-empty'/>
                    Wyczyść obraz
                </Button>

                <Button onClick={() => {
                    props.toggleSphereRotation();
                }}>
                    <i className='icon-toggle-on'/>
                    Włącz / Wyłącz obrót podglądu
                </Button>

                <Button onClick={() => {
                    props.showLoadModal();
                }}>
                    <i className='icon-upload'/>
                    Wczytaj obrazek
                </Button>

                <Button onClick={() => {
                    props.saveCanvas();
                }}>
                    <i className='icon-download'/>
                    Zapisz obrazek
                </Button>

                <Button onClick={() => {
                    props.plotterGrid().generatePlotterCode(PlotterGrid.GEN_VLBL);
                    props.showGetCodeModal();
                }}>
                    <i className='icon-code'/>
                    Pobierz kod dla EV3
                </Button>
            </ButtonBar>
        </div>
    );
};

export default bottomButtonBar;