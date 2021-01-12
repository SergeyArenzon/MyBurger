import React, { useState } from "react";
import classes from "./DrawerToggle.module.css";

const drawerToggle = (props) => {
    const [clicked, setClicked] = useState(false);

  

    let drawer = classes.DrawerToggle;

    if (props.sideDrawerIsVisible) {
        drawer = [classes.DrawerToggle, classes.Clicked].join(' ');
    }
    return (
        <div className={drawer} onClick={props.clicked}>
            <div></div>
        </div>
    );
};

export default drawerToggle;
