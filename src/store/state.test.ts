import { initialState } from "./state";

describe("the selectors tests", () => {

    test("sampleText is: Hello, empty App!", () => {
        // Assert
        expect(initialState.sampleText).toBe("Hello, empty App!");
    });

});
