import React from 'react';
import Styles from './ButtonBar.module.css'

const buttonBar = (props) => {
    return (
        <div className={Styles.buttonBar}>
            {props.children}
        </div>
    );
};

export default buttonBar;