import React from "react"
import Enzyme, {shallow} from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Message from "../components/Message";
import renderer from 'react-test-renderer'
var sinon = require('sinon');

Enzyme.configure({adapter: new Adapter()})

describe("Message Component", () => {
    it('should show text', function () {
        const wrapper = shallow(<Message name={"user"} time={10}/>)
        const text = wrapper.find("div")
        expect(text.text()).toBe("Congratulations user. You're time: 10 seconds.")
    });

    it('renders correctly', () => {
        const tree = renderer
            .create(<Message name={"user"} time={10}/>)
            .toJSON();
        expect(tree).toMatchSnapshot();
    });

    xit('should call ', function () {
        var clock = sinon.useFakeTimers();
        const wrapper = shallow(<Message name={"user"} time={10}/>)
        const reload = jest.spyOn(wrapper.instance(), 'window.location.reload()');
        clock.tick(9999)
        wrapper.instance().reload();
        expect(reload).toHaveBeenCalledTimes(0);
        clock.tick(10001)
        wrapper.instance().reload();
        expect(reload).toHaveBeenCalledTimes(1);
    });


})

