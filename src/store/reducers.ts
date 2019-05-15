import { Actions, ActionTypes } from "./actions";
import { initialState } from "./state";

export function rootReducer(currentState = initialState, action: Actions) {

    switch (action.type) {
        case ActionTypes.UPDATE_SAMPLE_TEXT_ACTION: {
            return { ...currentState, sampleText: action.sampleText };
        }
    }

    return currentState;
}
