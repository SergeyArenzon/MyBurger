import React, { Component } from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { connect } from "react-redux";

class NavigationItems extends Component {
    render() {
        return (
            <ul className={classes.NavigationItems}>
                <NavigationItem link="/" exact>
                    Burger Builder
                </NavigationItem>
                <NavigationItem link="/orders">Orders</NavigationItem>
                <NavigationItem link="/auth">
                    {this.props.isAuthenticated ? "Logout" : "Authenticate"}
                </NavigationItem>
            </ul>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
    };
};

export default connect(mapStateToProps)(NavigationItems);
