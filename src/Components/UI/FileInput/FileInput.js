import React from 'react';
import Styles from './FileInput.module.css'

const fileInput = (props) => {
    let styles = [Styles.input];

    if (props.danger) {
        styles.push(Styles.danger);
    }

    return (
        <div className={styles.join(' ')}>
            <div className={Styles.button}>
                <input
                    type='file'
                    id='file'
                    accept='image/x-png'
                    onChange={(event) => {
                        props.loadCanvas(event.target.files[0]);
                        props.hideModal();
                    }}
                />
                {props.children}
            </div>
        </div>
    );
};

export default fileInput;