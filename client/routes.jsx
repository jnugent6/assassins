import React from 'react';
import {mount} from 'react-mounter';

// load Layout and Welcome React components
import {Layout, Welcome} from './app.jsx';
import {Home} from "./home.jsx";
import {Dashboard} from "./dashboard.jsx";
import {SignUpConfirm} from "./accounts.jsx";

FlowRouter.route("/", {
    name: "home",
    action() {
        mount(Layout, {
            content: (<Home name="lezed1"/>)
        });

        $(document).foundation();
    }
});

FlowRouter.route("/confirm", {
    name: "signup-confirm",
    action() {
        mount(Layout, {
            content: (<SignUpConfirm/>)
        });
    }
});

var loggedIn = FlowRouter.group({
    triggersEnter: [function (context, redirect) {
        console.log(Meteor.loggingIn());
        console.log(Meteor.userId());
        if (!Meteor.loggingIn() && !Meteor.userId()) {
            FlowRouter.go("home");
        }
    }]
});

loggedIn.route("/dashboard", {
    name: "dashboard",
    action() {
        mount(Layout, {
            content: (<Dashboard/>)
        });

        $(document).foundation();
    }
});
