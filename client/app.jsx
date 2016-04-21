import React from 'react';

const LayoutTemplate = React.createClass({
    mixins: [ReactMeteorData],
    getMeteorData() {
        return {
            loggedIn: Meteor.loggingIn() || Meteor.userId(),
            isAdmin: Meteor.user() && Meteor.user().profile.admin
        }
    },
    render(){
        var dashboard_link = "";
        var admin_link = "";

        if (this.data.loggedIn) {
            dashboard_link = <li><a href={FlowRouter.path("dashboard")}>Dashboard</a></li>
        }

        if (this.data.isAdmin) {
            admin_link = (
                <div className="top-bar-right">
                    <ul className="dropdown menu" data-dropdown-menu ref={(ref)=>$(ref).foundation()}>
                        <li>
                            <a href={FlowRouter.path("admin")}>Admin</a>
                            <ul className="menu vertical">
                                <li><a href={FlowRouter.path("admin.users")}>Users</a></li>
                            </ul>
                        </li>
                    </ul>
                </div>
            )
        }

        return (
            <div>
                <div className="top-bar">
                    <div className="top-bar-left">
                        <ul className="menu">
                            <li className="menu-text">Assassins</li>
                            <li><a href={FlowRouter.path("home")}>Home</a></li>
                            <li><a href={FlowRouter.path("contact")}>Contact</a></li>
                        </ul>
                    </div>
                    <div className="top-bar-right">
                        <ul className=" menu">
                            {dashboard_link}
                            <li><BlazeToReact blazeTemplate="loginButtons" align="right"/></li>
                        </ul>
                    </div>
                    {admin_link}
                </div>

                <section role="main">
                    <div className="row">
                        <div className="small-12 columns">
                            <div className="primary callout">Every user must verify their email address. If you cannot sign
                                in and access your <a href={FlowRouter.path("dashboard")}>Dashboard</a>, please <a
                                    href={FlowRouter.path("contact")}>contact</a> me.
                            </div>
                            {this.props.content}
                        </div>
                    </div>
                </section>
            </div>
        )
    }
});

// define and export our Layout component
export const Layout = ({content}) => {
    return <LayoutTemplate content={content}/>;
};
