import React, { Component } from 'react';
import "../css/Proposal.scss";
import {socket} from "../index.js";

function csv(list) {
    let string = "";
    for (let i=0; i<list.length; i++) {
        string += list[i] + ", ";
    }
    return string.slice(0, string.length-2);
}
class ProposalVoting extends Component {

    constructor(props) {
        super(props);
        this.state = {
            upSelected: false,
            downSelected: true,
            list: csv(JSON.parse(this.props.players))

        }
    }

    vote = (vote) => {
        socket.send(
            JSON.stringify({
                type: "MISSION_VOTING_RESPONSE",
                vote: vote,
                id: this.props.id,
                name:this.props.name

            })
        );
        this.props.hide(this);
    };

    render() {
        return (

            <div className={"ProposalVoting pop-up" }>
                <div className={"proposal-list"}>
                    Voting on: {this.state.list}
                </div>
                <button className={"proposal-vote"} onClick={() => this.vote("upvote")}>
                    <i className="far fa-thumbs-up"></i>
                </button>
                <button className={"proposal-vote"} onClick={() => this.vote("downvote")}>
                    <i className="far fa-thumbs-down"></i>
                </button>


            </div>

        );
    }
}

export default ProposalVoting;
export {csv};