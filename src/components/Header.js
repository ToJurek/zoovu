import React from "react";
import "../styles/Header.css"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClock} from '@fortawesome/free-regular-svg-icons'

class Header extends React.Component {

    render() {
        return (
            <div className="row">
                <div className="column">
                    <div className={"left-side"}>
                        <span>Good luck {this.props.name}!</span> <br/>
                        <div className={"instructions"}>Pick up the right cards</div>
                    </div>
                </div>

                <div className="column">
                    <div className={"right-side"}>
                        <span className={"score"}>
                            <FontAwesomeIcon icon={faClock} className={"clock-icon"}/>
                            Your score: {this.props.time} seconds
                        </span>
                        <br/>
                        <div className={"instructions"}>The faster the better!</div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Header