import React from 'react';
import Styles from './Modal.module.css';
import Button from "../Button/Button";

const Modal = (props) => {
    if (!props.visible) {
        return null;
    }

    return (
        <div className={Styles.background}>
            <div className={Styles.container}>
                <div className={Styles.childrenContainer}>
                    {props.children}
                </div>
                <div className={Styles.button}>
                    <Button onClick={props.hideModal}>Zamknij</Button>
                </div>
            </div>
        </div>
    )
};

export default Modal;