import React from "react";
import classes from "./HomeButton.module.css";

const homeButton = (props) => {
  let btn = classes.HomeButton;
  let btnReturn = (
    <a href="/#" className={btn} onClick={props.click}>
      {props.children}
    </a>
  );
  if (props.disabled) {
    btn = [classes.HomeButton, classes.HomeButtonDisabled].join(" ");
    btnReturn = <a href="/#" className={btn} >{props.children}</a>;
  }

  return btnReturn;
};

export default homeButton;
