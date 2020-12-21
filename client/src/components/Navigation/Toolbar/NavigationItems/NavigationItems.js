import React from "react";
import classes from "./NavigationItems.module.css";
import NavigationItem from "./NavigationItem/NavigationItem";
import { connect } from "react-redux";

const navigationItems = (props) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem className={classes.burgerBuilderNav} link="/" exact>
        MyBurger
      </NavigationItem>
      {props.isAuthenticated ? (
        <NavigationItem link="/orders">Orders</NavigationItem>
      ) : null}

      <NavigationItem link="/auth">
        {props.isAuthenticated ? "Logout" : "Authenticate"}
      </NavigationItem>
    </ul>
  );
};


const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
  };
};

export default connect(mapStateToProps)(navigationItems);
