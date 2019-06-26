import * as React from "react";

interface IProfileProps {
    name: string;
    age?: number;   
    color?: string;
    onClick: (name: string) => void;
}

interface IProfileState {
    clicks: number;
}

const style = {
    cursor: "pointer",
    padding: 20,
    margin: 30,
    border: "1px solid #222",
};

export class Profile extends React.Component<IProfileProps, IProfileState> {

    constructor(props: IProfileProps) {
        super(props);

        this.handleClick = this.handleClick.bind(this);

        this.state = {
            clicks: 0,
        }
    }

    public render() {

        let age = this.props.age || `(not supplied)`;
        let color = this.props.color || `#fff`;

        return <div
        onClick={this.handleClick}
        style={ { backgroundColor: color, ...style } }>
            <div><strong>{this.props.name}</strong> {age}</div>
            <div>Clicks: {this.state.clicks}</div>
        </div>;
    }

    private handleClick() {
        const clicks = this.state.clicks + 1;
        this.setState({ clicks  });

        this.props.onClick(this.props.name);
    }
}

export default Profile;
