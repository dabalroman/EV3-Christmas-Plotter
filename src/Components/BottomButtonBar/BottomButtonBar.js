import React from 'react';
import Styles from './BottomButtonBar.module.css'
import Button from "../UI/Button/Button";
import ButtonBar from "../UI/ButtonBar/ButtonBar";

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
            </ButtonBar>
        </div>
    );
};

export default bottomButtonBar;