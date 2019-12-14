import React, {Component} from 'react';
import Styles from './LoadSaveModal.module.css';
import Button from "../UI/Button/Button";

export default class LoadSaveModal extends Component {
    state = {
        code: ''
    };

    render(props) {
        return (
            <div className={Styles.container}>
                <div>
                    <h3 className={Styles.text}>
                        Zapisz obrazek
                    </h3>
                    <p className={Styles.text}>
                        Aby zapisać obrazek naciśnij <code>Pobierz kod obrazka</code> i&nbsp;skopiuj kod z&nbsp;pola
                        tekstowego po prawej. Kod ten
                        możesz zapisać i wczytać później.
                    </p>
                    <Button onClick={() => {
                        this.setState({code: this.props.plotterGrid().save()})
                    }}>Pobierz kod obrazka</Button>
                    <br/>
                    <h3 className={Styles.text}>
                        Wczytaj obrazek
                    </h3>
                    <p className={Styles.text}>
                        Aby wczytać obrazek wklej jego kod do pola tekstowego po prawej i&nbsp;wciśnij <code>Wczytaj
                        obrazek z kodu</code>.
                    </p>
                    <Button onClick={() => {
                        this.props.plotterGrid().load(this.state.code);
                    }}>Wczytaj obrazek z kodu</Button>
                </div>
                <div>
                    <textarea
                        className={Styles.textarea}
                        value={this.state.code}
                        onChange={(event) => {
                            this.setState({code: event.target.value})
                        }}/>
                </div>
            </div>
        )
    }
}