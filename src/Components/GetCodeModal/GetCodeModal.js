import React from 'react';
import Styles from './GetCodeModal.module.css';
import Video from '../../Assets/Video/CodePasteIntoEditor.mp4';

const GetCodeModal = (props) => {
    return (
        <div className={Styles.container}>
            <div>
                <h3 className={Styles.text}>
                    Kod dla EV3 został automatycznie skopiowany.
                </h3>
                <p className={Styles.text}>
                    Otwórz program 'Christmas Ball Decorator'
                    i&nbsp;przejdź do zakładki <b>'Instructions'</b>. Usuń bloczek tablicy i&nbsp;wklej nowy na jego
                    miejsce jak pokazano obok.
                </p>
                <p className={Styles.text}>
                    Jeżeli nie możesz wkleić nowego bloczka do&nbsp;edytora EV3 to&nbsp;prawdopodobnie kod
                    nie&nbsp;został
                    automatycznie skopiowany.
                    W&nbsp;takim przypadku skopiuj cały tekst z&nbsp;poniższego pola tekstowego.
                </p>
                <p className={Styles.center}><code>CTRL + A, CTRL + C</code></p>
                <textarea className={Styles.textarea} rows='4' readOnly value={props.code}/>
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

export default GetCodeModal;