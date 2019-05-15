import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IAppProps, IAppState } from "../interfaces/App";
import { UpdateSampleTextAction } from "../store/actions";
import { IState } from "../store/state";

import "../assets/scss/main.scss";

export class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    public render() {

        return (
            <div>
                <h2>
                    TypeScript, React, Webpack, and Electron
                </h2>
                <div>
                    <input type="text" onChange={this.handleInputChange} value={this.props.sampleText}/>
                </div>                
                <h3>sampleText</h3>
                <p>
                    {this.props.sampleText}
                </p>
            </div>
        );
    }

    private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const text = event.currentTarget.value;
        this.props.onSampleTextChange(text);
    }
}

const mapStateToProps = (state: IState) => {
    return {
        sampleText: state.sampleText,
    };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onSampleTextChange: (text: string) => dispatch({ ...new UpdateSampleTextAction(text) }),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
