import React from "react";
import "../styles/StartPage.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'

class StartPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: ""
        }
    }

    handleChange = (e) => {
        this.setState({name: e.target.value});
    };

    handleSubmit = (e) => {
        e.preventDefault()
        this.setState({name: ""});
        this.props.handleSubmit(this.state.name)
    }

    render() {
        return (
            <div className={"startPage"}>
                <div className={"header"}>Hello friend, tell me your name...</div>
                <form onSubmit={this.handleSubmit}>
                    <div className={"form"}>
                        <input type={"text"} name={"name"} id={"name"} autoComplete={"off"}
                               onChange={this.handleChange} required/>
                        <label htmlFor={"name"} className={"label-name"}><span
                            className={"content-name"}>Your name here</span></label>
                    </div>
                    <button className="myButton">Let's go <FontAwesomeIcon icon={faLongArrowAltRight}/></button>
                </form>
            </div>
        )
    }
}

export default StartPage