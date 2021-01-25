import React from "react";
import classes from "./NavigationItem.module.css";
import { NavLink } from "react-router-dom";

const navigationItem = (props) => {

    // CHECK FOR MyBurger NAVLINK 
    let MyBurgerNavClass = null;
    if(props.navType === 'MyBurger') {
        MyBurgerNavClass = classes.MyBurgerNavClass;
    }

    return (
        <li className={[classes.NavigationItem, MyBurgerNavClass].join(' ')}>
            <NavLink
                to={props.link}
                exact={props.exact}
                activeClassName={classes.active}
            >
                {props.children}
            </NavLink>
        </li>
    );
};

export default navigationItem;
