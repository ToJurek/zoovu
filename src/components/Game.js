import React from "react";
import "../styles/Game.css"
import Header from "./Header";
import {o_zoovu, u_zoovu, v_zoovu, z_zoovu} from "../images/scripts/images";
import Droppable from "./Droppable";
import styled from "styled-components"
import Draggable from "./Draggable";
import "../styles/InputFields.css"
import Message from "./Message";

const Item = styled.div`
  padding:8px;
  color: #555;
  transparancy: 1;
  border-radius: 3px
`;

const droppableStyle = {
    float: 'left',
    width: '150px',
    height: '150px',
    position: 'relative',
    flex: '50%',
    margin: '20px',
    borderRadius: '28px',
    border: 'green dashed 2px',
    background: '#EAEAEA'
}

const draggableStyle = {
    float: 'left',
    width: '150px',
    height: '150px',
    position: 'relative',
    flex: '50%',
    margin: '20px',
    borderRadius: '28px',
    border: 'solid #7A7A7A 2px',
    background: 'white'
}

const imagesPosition = [
    {imgID: 1, img: z_zoovu, dragFieldID: 1, dropFieldID: null},
    {imgID: 2, img: o_zoovu, dragFieldID: 2, dropFieldID: null},
    {imgID: 3, img: o_zoovu, dragFieldID: 3, dropFieldID: null},
    {imgID: 4, img: v_zoovu, dragFieldID: 4, dropFieldID: null},
    {imgID: 5, img: u_zoovu, dragFieldID: 5, dropFieldID: null}
]

const shuffle = (sourceArray) => {
    for (var i = 0; i < sourceArray.length - 1; i++) {
        var j = i + Math.floor(Math.random() * (sourceArray.length - i));

        var temp = sourceArray[j];
        sourceArray[j] = sourceArray[i];
        sourceArray[i] = temp;
    }
    var index = 0
    var updateArray = sourceArray.map(img => {
        index++
        return {imgID: img.imgID, img: img.img, dragFieldID: index, dropFieldID: img.dropFieldID}
    })
    return updateArray;
}

const mixedArray = shuffle(imagesPosition)

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: 0,
            isOn: false,
            isCorrect: false,
            imagesPosition: mixedArray

        }
        this.startTimer = this.startTimer.bind(this)
        this.wrongMatch = this.wrongMatch.bind(this)
        this.stopTimer = this.stopTimer.bind(this)
    }

    wrongMatch() {
        this.setState({
            time: this.state.time + 10
        })
    }

    timer = () => {
        this.timer = setInterval(() => this.setState({
            time: this.state.time + 1
        }), 1000);
    }

    startTimer = () => {
        if (!this.state.isOn) {
            this.setState({
                isOn: true,
                time: 0
            })
            this.timer()
        }
    }

    matchFields = (itemID, dropId) => {
        if (itemID === dropId || (itemID === 2 && dropId === 3) || (itemID === 3 && dropId === 2)) {
            const matches = this.state.imagesPosition
            var index = matches.findIndex(id => {
                return id.imgID === itemID
            })
            matches[index].dropFieldID = dropId
            this.setState({
                imagesPosition: matches
            })
            this.checkResults()
        } else {
            this.wrongMatch()
        }

    }

    checkResults() {
        let isCorrect = this.state.imagesPosition.filter(img => {
            return !img.dropFieldID
        })
        if (isCorrect.length === 0) {
            this.stopTimer()
        }
    }

    stopTimer() {
        this.setState({
            isOn: false,
            isCorrect: true
        })
        clearInterval(this.timer)
    }

    renderGame() {
        return (
            <div className={"game"}>
                <Header name={this.props.name} time={this.state.time}/>
                <div className={"row"}>
                    {this.state.imagesPosition.map(item => {
                        return (<Droppable returnItem={(item) => console.log(item)} style={draggableStyle}
                                           id={"drag" + item.imgID}><Draggable
                            id={"item" + item.imgID}><Item><img onDragStart={this.startTimer} className={"img-c"}
                                                                id={"item" + item.imgID}
                                                                src={item.img}/></Item></Draggable></Droppable>)
                    })}
                </div>
                <div className={"row"}>
                    <div className={"instruction"}>
                        <span>...and drop them here to make the logo great again!</span>
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"inputs"}>
                        {[1, 2, 3, 4, 5].map(dropID => {
                            return (
                                <Droppable returnItem={(item) => this.matchFields(item, dropID)} id={"drop" + dropID}
                                           style={droppableStyle}></Droppable>)
                        })}
                    </div>
                </div>
            </div>
        )
    }


    render() {
        return (
            <div>
                {this.state.isCorrect ? <Message name={this.props.name} time={this.state.time}/> : this.renderGame()}
            </div>)


    }


}

export default Game