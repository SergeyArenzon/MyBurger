import React from "react";
import classes from "./HomeButton.module.css";

const homeButton = (props) => {

  return <a className={classes.HomeButton} 
    onClick={props.click}>Order Now!</a>;
};
export default homeButton;
