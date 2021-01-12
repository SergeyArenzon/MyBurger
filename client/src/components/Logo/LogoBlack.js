import React from 'react';

import burgerlogo from "../../assets/images/burger-logo-black.png";

import classes from './Logo.module.css';

const logoBlack = (props) => (
  <div className={classes.Logo} >
      <img src={burgerlogo} alt="burger logo"/>
  </div>
);




export default logoBlack;