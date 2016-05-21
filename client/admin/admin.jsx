import React from 'react';
import {Table, Sort} from "reactable";

import {createContainer} from 'meteor/react-meteor-data';
import {getGameState, elegibleUserCount, getGlobalState} from "/lib/game";

export const AdminHome = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            userTotal: Meteor.users.find().count(),
            eligibleUserTotal: elegibleUserCount(),
            freeForAll: getGlobalState("freeForAll")
        }
    },
    handleStartGame(){
        if (confirm("Do you actually want to start the game?")) {
            Meteor.call("startGame");
        }
    },
    handleShuffle(){
        if (confirm("Do you actually want to shuffle all users?")) {
            Meteor.call("shuffleTargets");
        }
    },
    handleFFAToggle(){
        if (confirm("Do you actually want to toggle Free For All mode?")) {
            Meteor.call("toggleFreeForAll");
        }
    },
    render() {
        var buttons;

        if (getGameState() == "pregame") {
            buttons = (
                <div className="callout">
                    <h3>Buttons.</h3>
                    <button type="button" className="primary button" onClick={this.handleStartGame}>Start the game!
                    </button>
                </div>
            )
        } else {
            buttons = (
                <div>
                    <div className="callout">
                        <h3>Buttons.</h3>
                        <button type="button" className="primary button" onClick={this.handleShuffle}>
                            Shuffle users.
                        </button>
                        <br/>
                        <button type="button" className="primary button" onClick={this.handleFFAToggle}>
                            {this.data.freeForAll ? "Disable" : "Enable"} Free For All Mode.
                        </button>
                    </div>
                </div>
            )
        }

        return (
            <div className="row">
                <div className="small-12 large-5 columns">
                    <div className="callout">
                        <h3>Summary:</h3>
                        <ul>
                            <li>Total users registered: {this.data.userTotal}</li>
                            <li>Eligible users: {this.data.eligibleUserTotal}</li>
                        </ul>
                    </div>
                </div>
                <div className="small-12 large-5 columns">
                    <div className="callout">
                        <h3>Actions.</h3>
                    </div>
                </div>
                <div className="small-12 large-2 columns">
                    {buttons}
                </div>
            </div>
        )
    }
});
