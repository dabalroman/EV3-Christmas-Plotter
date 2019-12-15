import React from 'react';
import Styles from './StartupModal.module.css';
import Video from './../../Assets/Drawing.mp4';

const StartupModal = () => {
    return (
        <div className={Styles.container}>
            <div>
                <h3 className={Styles.text}>
                    Witaj w edytorze ozdób!
                </h3>
                <p className={Styles.text}>
                    Aby namalować własny wzór użyj myszy:
                </p>
                <p className={Styles.text}><code>Lewy przycisk myszy</code> - Maluj</p>
                <p className={Styles.text}><code>Prawy przycisk myszy</code> - Gumka</p>
                <p className={Styles.text}>
                    Możesz też wczytać gotowy obrazek, wystarczy wcisnąć <code>Wybierz obrazek</code>.
                </p>
                <p>
                    Gdy już skończysz projektować ozdobę naciśnij <code>Pobierz kod dla EV3</code>.
                </p>
            </div>
            <div>
                <video className={Styles.video} height='400' width='450' autoPlay loop>
                    <source src={Video} type='video/mp4'/>
                    Nie można odtworzyć wideo.
                </video>
            </div>
        </div>
    )
};

export default StartupModal;