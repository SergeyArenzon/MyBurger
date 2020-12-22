import React from "react";
import classes from "./BuildControl.module.css";

const buildControl = (props) => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={() => props.removed(props.type)}
      disabled={props.disabled}
    >
      -
    </button>

    <button className={classes.More} onClick={() => props.added(props.type)}>
      +
    </button>
  </div>
);

export default buildControl;
