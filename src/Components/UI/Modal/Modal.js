import React from 'react';
import Styles from './Modal.module.css';
import Button from "../Button/Button";

const Modal = (props) => {
    return (
        <div className={Styles.background}>
            <div className={Styles.container}>
                <div className={Styles.childrenContainer}>
                    {props.children}
                </div>
                <div className={Styles.button}>
                    <Button>Zamknij</Button>
                </div>
            </div>
        </div>
    )
};

export default Modal;