import { Action } from "redux";

export enum ActionTypes {
    UPDATE_SAMPLE_TEXT_ACTION = "UPDATE_SAMPLE_TEXT",
    UPDATE_SAMPLE_TEXT_ACTION2 = "UPDATE_SAMPLE_TEXT2",
}

export class UpdateSampleTextAction implements Action {
    public readonly type = ActionTypes.UPDATE_SAMPLE_TEXT_ACTION;
    constructor(
        public sampleText: string,
    ) { }
}

export class UpdateSampleTextAction2 implements Action {
    public readonly type = ActionTypes.UPDATE_SAMPLE_TEXT_ACTION2;
    constructor(
        public sampleText: string,
    ) { }
}

export type Actions
    = UpdateSampleTextAction
    | UpdateSampleTextAction2;
