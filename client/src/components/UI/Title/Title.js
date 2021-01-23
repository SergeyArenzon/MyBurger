import React from "react";
import classes from "../Title/Title.module.css";

const title = (props) => {
    return (
        <div className={classes.Title}>
        {props.children}
        </div>
    );
};

export default title;
