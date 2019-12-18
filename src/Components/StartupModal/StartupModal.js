import React from 'react';
import Styles from './StartupModal.module.css';
import VideoMP4 from '../../Assets/Video/Drawing.mp4';
import VideoWEBM from '../../Assets/Video/Drawing.webm';

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
                    Możesz też wczytać obrazek, wystarczy wcisnąć <code><i className='icon-upload'/> Wczytaj
                    obrazek</code>.
                </p>
                <p>
                    Gdy już skończysz projektować ozdobę naciśnij <code><i className='icon-code'/> Pobierz kod dla
                    EV3</code>.
                </p>
            </div>
            <div>
                <video className={Styles.video} height='222' width='228' muted autoPlay loop>
                    <source src={VideoMP4} type='video/mp4'/>
                    <source src={VideoWEBM} type='video/webm'/>
                    Nie można odtworzyć wideo.
                </video>
            </div>
        </div>
    )
};

export default StartupModal;