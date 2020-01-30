import React from "react";
import StartPage from "./Start";
import Game from "./Game";

class ZoovuGame extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            renderGamePage: false,
            name: ""
        }
        this.handleSubmitInput = this.handleSubmitInput.bind(this)
    }

    handleSubmitInput(value) {
        this.setState({
            renderGamePage: true,
            name: value
        })
    }

    render() {
        return (<div>
            {this.state.renderGamePage ? <Game name={this.state.name}/> :
                <StartPage handleSubmit={this.handleSubmitInput}/>}
        </div>)
    }
}

export default ZoovuGame