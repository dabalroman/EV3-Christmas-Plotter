import React, {Component} from 'react';
import P5Wrapper from 'react-p5-wrapper';
import './App.css';
import GridEditor from "./sketches/GridEditor";
import GridEditorStyles from "./sketches/GridEditor.module.css";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {color: [Math.random() * 255, Math.random() * 255, Math.random() * 255]};
        this.randomColor = this.randomColor.bind(this);
    }

    randomColor() {
        this.setState({color: [Math.random() * 255, Math.random() * 255, Math.random() * 255]}
        )
    }

    render() {
        return (
            <div className={GridEditorStyles.editorCanvas} onContextMenu={(e)=>{e.preventDefault();}}>
                <P5Wrapper sketch={GridEditor}/>
            </div>
        );
    }
}

export default App;