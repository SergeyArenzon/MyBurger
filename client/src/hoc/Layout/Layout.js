import React, { useState } from "react";
import Aux from "../Aux/Aux";
import classes from "./Layout.module.css";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import SideDrawer from "../../components/Navigation/Toolbar/SideDrawer/SideDrawer";

const layout = props =>{
    const [sideDrawerIsVisible,setSideDrawerIsVisible] = useState(false);


    const sideDrawerClosedHandler = () => {
        setSideDrawerIsVisible(false);
    };
    const sideDrawerToggleHandler = () => {
            setSideDrawerIsVisible(!sideDrawerIsVisible);
    };


        return (
            <Aux>
                <Toolbar drawerToggleClicked={sideDrawerToggleHandler} sideDrawerIsVisible={sideDrawerIsVisible}/>
                <SideDrawer
                    closed={sideDrawerClosedHandler}
                    open={sideDrawerIsVisible}
                />

                <main className={classes.Content}>{props.children}</main>
                <div className={classes.Footer}> Created By Sergey Arenzon &copy;</div>
            </Aux>
        );
}

export default layout;
