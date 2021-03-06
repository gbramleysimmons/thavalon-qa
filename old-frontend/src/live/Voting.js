import React, { Component } from 'react';
import "../css/Voting.scss";
import "../css/Board.scss";
import {socket} from "../index.js";


class Voting extends Component {
    constructor(props) {
        super(props);

        this.state = {
            canFail: true,
            canReverse: true,
            passSelected: false,
            failSelected: false,
            reverseSelected: false,
        }
    }

    togglePass = () => {
        this.setState({passSelected: !this.state.passSelected, failSelected: false, reverseSelected: false})
    };

    toggleFail = () => {
        this.setState({failSelected: !this.state.failSelected, passSelected: false, reverseSelected: false})
    };

    toggleReverse = () => {
        this.setState({reverseSelected: !this.state.reverseSelected, passSelected: false, failSelected: false})
    };

    vote = () => {
        let card;
        if (this.state.reverseSelected) {
            card = "R";
        } else if (this.state.failSelected) {
            card = "F";
        } else if (this.state.passSelected) {
            card = "P";
        } else {
            return;
        }
        socket.send(JSON.stringify({type: "PLAY_CARD_RESPONSE",
            card: card,
            id: this.props .id,
            name:this.props.name
        }));
        this.props.hide(this);
    };


    render() {

        let passClasses = this.state.passSelected ? "selected": "";
        passClasses = "card pass " + passClasses;

        let failClasses = this.state.failSelected ? "selected": "";
        failClasses = "card fail " + failClasses;

        let reverseClasses = this.state.reverseSelected ? "selected": "";
        reverseClasses = "card reverse " + reverseClasses;
        return (

            <div className={"Voting"}>
                <button className={"close-button"}><i className="fas fa-times"></i></button>
                <div className={"card-wrapper"}>
                <div className={passClasses} onClick={this.togglePass} >
                    <div className={"card-content"}> Pass </div>
                </div>
                {this.props.canFail ?
                    <div className={failClasses} onClick={this.toggleFail}>

                        <div className={"card-content"}> Fail </div>

                    </div> : null}
                {this.props.canReverse ?
                    <div className={reverseClasses} onClick={this.toggleReverse}>
                        <div className={"card-content"}> Reverse </div>

                    </div> : null}
                </div>

                <button id={"confirm"} className={"large-button"} onClick={this.vote}>Confirm</button>
            </div>

        );
    }
}

export default Voting;