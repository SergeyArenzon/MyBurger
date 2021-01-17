import React from "react";
import classes from "./Button.module.css";

const button = (props) => {
    return (
        <button
            className={[classes.Button, classes[props.btnType]].join(" ")}
            disabled={props.disabled}
            onClick={props.clicked}
            type={props.type}
        >
            {props.children}
        </button>
    );
};

export default button;
