import React, {Component} from 'react';
import Styles from './WaitOverlay.module.css';
import Loading from './../../../Assets/Images/loading.gif'

export default class WaitOverlay extends Component {
    state = {
        message: 0
    };

    interval = null;

    constructor() {
        super();
        this.newMessage = this.newMessage.bind(this);
    }

    componentDidMount(): void {
        this.newMessage();
    }

    componentWillUnmount(): void {
        clearInterval(this.interval);
    }

    messages = [
        'Chyba miałem coś zrobić...',
        'Shrek, daleko jeszcze?',
        'Szukanie Nemo...',
        'Proszę czekać, małe elfy rysują Twój obrazek',
        'Parę bitów próbowało uciec, ale złapaliśmy je.',
        'Ustawianie satelity...',
        'Bity płyną dziś wyjątkowo wolno.',
        'Po prostu policz do 10.',
        'Pieczenie ciastka.',
        'Obliczanie szansy na powodzenie operacji...',
        'Yyy, czy to Windows?',
        'Przysięgam, już prawie skończyliśmy!',
        'Ładna dziś pogoda, prawda?',
        'Czekanie aż farba wyschnie...',
        'Ładowanie modułu ładowania...',
        'Mów mi Steve.',
        'To nie tak proste jak wygląda.',
        'Do zrobienia: Puścić muzykę z windy.',
        'Robienie niemożliwego.',
        'Negocjowanie ze SkyNet\'em.',
        'Czekanie na pociąg do Hogwartu...',
        'Podchodzenie do przekaźnika masy...',
        'Ściganie Czarnej Perły...'
    ];

    newMessage() {
        this.setState({message: Math.floor(Math.random() * this.messages.length)});
    }

    render() {
        if (!this.props.visible) {
            if (this.interval !== null) {
                clearInterval(this.interval);
            }
            return null;
        } else {
            if (this.interval === null) {
                this.interval = setInterval(this.newMessage, 3500);
            }
        }

        return (
            <div className={Styles.background}>
                <img src={Loading} alt=""/>
                <p>{this.messages[this.state.message]}</p>
            </div>
        )
    }
}