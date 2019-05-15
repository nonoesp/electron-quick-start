import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { App } from "../components/App";
import { IAppState } from "../interfaces/App";
import { initialState } from "../store/state";

Enzyme.configure({ adapter: new Adapter() });

describe("App", () => {

    test("renders properly when host graph is empty (EmptyGraphMock)", () => {
        // Arrange
        const callback = jest.fn();
        // Act
        const component = shallow( <App sampleText="Hey" onSampleTextChange={callback}/> );
        // Assert
        expect(component).not.toBeNull();
    });

});
