import React from "react"
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Droppable from "../components/Droppable";
import Draggable from "../components/Draggable";
import renderer from "react-test-renderer";
import styled from "styled-components";
import {o_zoovu, u_zoovu, v_zoovu, z_zoovu} from "../images/scripts/images";
var sinon = require('sinon');

Enzyme.configure({adapter: new Adapter()})

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

Enzyme.configure({adapter: new Adapter()})

describe("Draggable Component", () =>{
    it('renders correctly', () => {
        const returnImg = jest.fn()
        const startTimer = jest.fn
        const tree = renderer
            .create(<Droppable returnImg={(item) => returnImg(item)} style={draggableStyle} id={"dragTest"}>
                <Item>
                    <img src={z_zoovu} startTimer={startTimer} id={"itemID"} />
                </Item>
            </Droppable>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should start clock onDrag', () => {
        const returnImg = jest.fn()
        const startTimer = jest.fn
        const wrapper = mount(<Droppable returnImg={(item) => returnImg(item)} style={draggableStyle} id={"dragTest"}>
                <Item>
                    <img src={z_zoovu} startTimer={startTimer} id={"itemID"} />
                </Item>
            </Droppable>)
        const img = wrapper.find("img")
        const item = wrapper.find(Item)
        expect(img.length).toEqual(1)
        expect(item).toHaveProperty("transparancy", "1")

    });

    // it('should start clock onDrag', () => {
    //     const returnImg = jest.fn()
    //     const startTimer = jest.fn
    //     const wrapper = shallow(<Droppable returnImg={(item) => returnImg(item)} style={draggableStyle} id={"dragTest"}>
    //         <Item>
    //             <img src={z_zoovu} startTimer={startTimer} id={"itemID"} />
    //         </Item>
    //     </Droppable>)
    //     const img = wrapper.find(Item)
    //     expect(img.length).toEqual(1)
    //
    // });

})