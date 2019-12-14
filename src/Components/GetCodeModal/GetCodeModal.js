import React from 'react';
import Styles from './GetCodeModal.module.css';
import Video from './../../Assets/CodePasteIntoEditor.mp4';

const GetCodeModal = (props) => {
    return (
        <div className={Styles.container}>
            <div>
                <p>
                    Kod dla EV3 został automatycznie skopiowany.<br/> Otwórz program 'Christmas Ball Decorator'
                    i&nbsp;przejdź do zakładki <b>'Instructions'</b>. Usuń bloczek tablicy i&nbsp;wklej nowy na jego
                    miejsce jak pokazano obok.
                </p>
                <p>
                    Jeżeli nie możesz wkleić nowego bloczka do&nbsp;edytora EV3 to&nbsp;prawdopodobnie nie&nbsp;został
                    automatycznie skopiowany.
                    W&nbsp;tym przypadku skopiuj cały tekst&nbsp;z poniższego pola tekstowego.
                </p>
                <p className={Styles.center}><code>CTRL + A, CTRL + C</code></p>
                <textarea rows='2' readOnly value='Hello there!'/>
            </div>
            <div>
                <video height='400' width='450' autoPlay loop>
                    <source src={Video} type='video/mp4'/>
                    Nie można odtworzyć wideo.
                </video>
            </div>


        </div>
    )
};

export default GetCodeModal;