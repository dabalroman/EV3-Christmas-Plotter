import React from 'react';
import Styles from './Button.module.css'

const button = (props) => {
    let styles = [Styles.button];

    if (props.danger) {
        styles.push(Styles.danger);
    }

    return (
        <div className={styles.join(' ')}>
            <button
                onClick={props.onClick}>
                {props.children}
            </button>
        </div>
    );
};

export default button;