import React from "react";
import "../styles/Message.css"

export default class Message extends React.Component{

    render() {
        setTimeout(() => {
            window.location.reload(false);
        }, 10000);
        return (
            <div className={"message"}>
                Congratulations {this.props.name}. You're time: {this.props.time} seconds.
            </div>
        )
    }
}