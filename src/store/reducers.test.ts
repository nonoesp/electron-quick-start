import { UpdateSampleTextAction } from "./actions";
import { rootReducer } from "./reducers";
import { initialState } from "./state";

const testState = {
    sampleText: "Hello, empty App!",
};

describe("the rootReducer tests", () => {
    test("Dispatches the correct UpdateSampleTextAction action and payload", () => {
        // Arrange
        const text = "Boo!";
        const action = new UpdateSampleTextAction(text);

        // Act
        const result = rootReducer(initialState, action);

        // Assert
        expect(result).toEqual({ ...initialState, sampleText: text });
    });
});
