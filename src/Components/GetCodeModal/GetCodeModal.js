import React from 'react';
import Styles from './GetCodeModal.module.css';
import VideoMP4 from "../../Assets/Video/CodePasteIntoEditor.mp4";
import VideoWEBM from "../../Assets/Video/CodePasteIntoEditor.webm";

const GetCodeModal = (props) => {
    return (
        <div className={Styles.container}>
            <div>
                <h3 className={Styles.text}>
                    Kod dla EV3 został automatycznie skopiowany.
                </h3>
                <p className={Styles.text}>
                    Otwórz program '<b>Christmas Ball Decorator</b>'
                    i&nbsp;przejdź do zakładki '<b>Instructions</b>'. Usuń blok tablicy i&nbsp;wklej nowy na jego
                    miejsce jak pokazano obok.
                </p>
                <p className={Styles.text}>
                    Jeżeli nie możesz wkleić nowego bloczka do&nbsp;edytora EV3 to&nbsp;prawdopodobnie kod
                    nie&nbsp;został automatycznie skopiowany.
                    W&nbsp;takim przypadku skopiuj całą zawartość poniższego pola tekstowego.
                </p>
                <p className={Styles.center}><code>CTRL + A, CTRL + C</code></p>
                <textarea className={Styles.textarea} rows='4' readOnly value={props.code}/>
            </div>
            <div>
                <video className={Styles.video} height='400' width='450' muted autoPlay loop>
                    <source src={VideoMP4} type='video/mp4'/>
                    <source src={VideoWEBM} type='video/webm'/>
                    Nie można odtworzyć wideo.
                </video>
            </div>
        </div>
    )
};

export default GetCodeModal;