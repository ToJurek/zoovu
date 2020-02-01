import React from "react"
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Header from "../components/Header";
import renderer from "react-test-renderer";
var sinon = require('sinon');

Enzyme.configure({adapter: new Adapter()})

describe("Header Component", () =>{
    it('renders correctly', () => {
        const tree = renderer
            .create(<Header name={"user"} time={10}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    it('should show text', () => {
        const wrapper = shallow(<Header name={"user"} time={10}/>)
        var luck = wrapper.find(".left-side span")
        var instruction = wrapper.find(".left-side div")
        var time = wrapper.find(".score")
        var motto = wrapper.find(".right-side .instructions")
        expect(luck.text()).toBe("Good luck user!")
        expect(instruction.text()).toBe("Pick up the right cards")
        expect(time.text()).toBe("<FontAwesomeIcon />Your score: 10 seconds")
        expect(motto.text()).toBe("The faster the better!")
    })

    xit('should have propertyStyle', function () {
        const wrapper = shallow(<Header name={"user"} time={10}/>)
        var leftSide = wrapper.find('div .left-side')
        const style = leftSide.get(0).style;
        expect(style).toHaveProperty('text-align', 'left');

    });
})