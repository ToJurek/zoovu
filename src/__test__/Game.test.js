import React from "react"
import Enzyme, {shallow, mount} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import renderer from "react-test-renderer";
import Game from "../components/Game";
import Droppable from "../components/Droppable";
import Draggable from "../components/Draggable";
import {o_zoovu, u_zoovu, v_zoovu, z_zoovu} from "../images/scripts/images";

import shuffle from "../components/Game"

Enzyme.configure({adapter: new Adapter()})

var sinon = require('sinon');

describe("Game Componnent", () => {
    it('render correctly', () => {
        const tree = renderer
            .create(<Game renderGamePage={true} name={"name"}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    })

    it('check number of components before win', function () {
        const wrapper = shallow(<Game renderGamePage={true} name={"name"}/>)
        const images = wrapper.find("img").length
        const droppableArea = wrapper.find(Droppable).length
        const draggableArea = wrapper.find(Draggable).length
        const rows = wrapper.find(".row").length
        expect(images).toEqual(5)
        expect(droppableArea).toEqual(10)
        expect(draggableArea).toEqual(5)
        expect(rows).toEqual(3)
    });

    it('check number of components after win', function () {
        const wrapper = mount(<Game renderGamePage={false} name={"name"}/>)
        const rows = wrapper.find(".row")
        expect(rows.length).toEqual(4)
        expect(wrapper.props().name).toEqual('name')
        expect(wrapper.props().renderGamePage).toEqual(false)
    });

    it('should shuffle images', function () {
        const wrapper = shallow(<Game renderGamePage={true} name={"name"}/>)
        const imagesPosition = [
            {imgID: 1, img: z_zoovu, dragFieldID: 1, dropFieldID: null},
            {imgID: 2, img: o_zoovu, dragFieldID: 2, dropFieldID: null},
            {imgID: 3, img: o_zoovu, dragFieldID: 3, dropFieldID: null},
            {imgID: 4, img: v_zoovu, dragFieldID: 4, dropFieldID: null},
            {imgID: 5, img: u_zoovu, dragFieldID: 5, dropFieldID: null}
        ]
        const imagesPositionState = wrapper.state().imagesPosition
        expect(imagesPosition[0]).not.toEqual(imagesPositionState[0])
        expect(imagesPosition[1]).not.toEqual(imagesPositionState[1])
        expect(imagesPosition[2]).not.toEqual(imagesPositionState[2])
        expect(imagesPosition[3]).not.toEqual(imagesPositionState[3])
        expect(imagesPosition[4]).not.toEqual(imagesPositionState[4])
    });

    it('should start timer', function () {
        const wrapper = mount(<Game renderGamePage={true} name={"name"}/>)
        const startTimerMock = wrapper.instance().startTimer = jest.fn();
        wrapper.instance().forceUpdate()
        wrapper.find("img").at(0).simulate('mouseDown', {clientX: 0, clientY: 0}).simulate('mouseMove', {clientX: 0, clientY: 100}).simulate('mouseUp')
        expect(startTimerMock).toHaveBeenCalled()
    });


})


