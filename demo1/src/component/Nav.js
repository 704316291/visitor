import React from "react";
import "./Nav.css"
import {NavLink} from "react-router-dom"
import {FormattedMessage} from 'react-intl';
import {connect} from "react-redux"
import actions from "../store/actions"

class Nav extends React.Component {
    constructor(props, context) {
        super(props, context)
    }

    render() {
        return (
            <div className="navDiv">
                <div className="navLogo"></div>
                <ul className="nav-ul">
                    <li><NavLink to="/Login">
                        <FormattedMessage
                            id="intl-Nav-Login"
                        /></NavLink>
                    </li>
                    <li>
                        <NavLink to="/Register">
                            <FormattedMessage
                                id="intl-Nav-Register"
                            /></NavLink>
                    </li>
                    <li>
                        <NavLink to="#">
                            <i className="icon-languageZ"
                               onClick={this.props.changeLanguage}> {this.props.local === "en" ? "cn" : "en"}</i>
                        </NavLink>
                    </li>
                </ul>
                <ul className="nav-ul nav-login">
                    <li>
                        <NavLink to="/Home">
                            <FormattedMessage
                                id="intl-Nav-Home"
                            /></NavLink>
                    </li>
                    <li>
                        <NavLink to="/InnovationCenter">
                            <FormattedMessage
                                id="intl-Nav-Center"
                            /></NavLink>
                    </li>
                    <li>
                        <NavLink to="/Activities">
                            <FormattedMessage
                                id="intl-Nav-Activities"
                            /></NavLink>
                    </li>
                    <li>
                        <NavLink to="/News">
                            <FormattedMessage
                                id="intl-Nav-News"
                            /></NavLink>
                    </li>
                    <li>
                        <NavLink to="/AboutUs">
                            <FormattedMessage
                                id="intl-Nav-AboutUs"
                            /></NavLink>
                    </li>
                </ul>
            </div>


        )
    }
}

export default connect(state => ({...state.Language}), actions.Language)(Nav)
