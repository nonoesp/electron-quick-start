import * as actions from "./actions";

describe("Dispatches the correct action and payload for" +
         "update sample text action", () => {
    test("It should create an action to set sampleText", () => {
        // Arrange
        const newText = "Goodbye, App!";

        // Act
        const expectedAction = {
            sampleText: newText,
            type: actions.ActionTypes.UPDATE_SAMPLE_TEXT_ACTION,
        };

        // Assert
        expect(new actions.UpdateSampleTextAction(newText)).toEqual(expectedAction);
    });
});
