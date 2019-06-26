import * as React from "react";
import { connect } from "react-redux";
import { Dispatch } from "redux";
import { IAppProps, IAppState } from "../interfaces/App";
import { UpdateSampleTextAction } from "../store/actions";
import { IState } from "../store/state";

import Profile from "./Profile";

import "../assets/scss/main.scss";

export class App extends React.Component<IAppProps, IAppState> {

    constructor(props: IAppProps) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
    }

    public render() {

        return (
            <div>
                {/* We can use self-closing components */}
                {/* As we're not putting anything inside */}
                <Profile
                    name={`Jose Luis`}
                    age={29}
                    onClick={this.handleProfileClick}
                />
                <Profile name={`Nono`} age={29} color={`rgba(0,0,0,0.17)`}
                onClick={this.handleProfileClick}/>
                <Profile name={`Peter`}
                onClick={this.handleProfileClick}/>
                {/* <Profile/>
                <Profile/>
                <Profile/> */}
                {/* This works the same */}
                {/* <Profile></Profile> */}
            </div>
        );
    }

    private handleProfileClick(name: string) {
        console.log(`App: You clicked Profile ${name}`);

    }

    private handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
        const text = event.currentTarget.value;
        this.props.onSampleTextChange(text);
        console.log(text);
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
