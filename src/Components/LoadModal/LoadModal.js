import React, {Component} from 'react';
import Styles from './LoadModal.module.css';
import FileInput from "../UI/FileInput/FileInput";

export default class LoadModal extends Component {
    state = {
        code: ''
    };

    componentDidMount(): void {
        this.setState({
            code: localStorage.getItem('code')
        });
    }

    componentWillUnmount(): void {
        localStorage.setItem('code', this.state.code);
    }

    render(props) {
        return (
            <div className={Styles.container}>

                <h3 className={Styles.text}>
                    Wczytaj obrazek
                </h3>
                <p className={Styles.text}>
                    Obrazek, który chcesz wczytać musi być zapisany jako plik <code>.png</code> o&nbsp;rozdzielczości
                    120&nbsp;x&nbsp;28&nbsp;pikseli lub jej wielokrotności. Obrazek ten powinien być czarno-biały.
                    Aktualny obrazek zostanie
                    nadpisany!
                </p>
                <div className={Styles.buttons}>
                    <FileInput
                        danger={true}
                        loadCanvas={this.props.loadCanvas}
                        hideModal={this.props.hideModal}
                    >
                        <i className='icon-upload'/>
                        Wczytaj obrazek
                    </FileInput>
                </div>
                <p className={Styles.text}>
                    Gotowe wzory bombek znajdziesz w&nbsp;folderze <code>Gotowe obrazki</code>.
                </p>
            </div>
        )
    }
}