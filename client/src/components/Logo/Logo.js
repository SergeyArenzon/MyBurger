import React, {useCallback} from "react";
import { useHistory } from "react-router-dom";

import burgerlogo from "../../assets/images/burger-logo.png";

import classes from "./Logo.module.css";

const logo = (props) => {

  // REDIRECT BY CLICKING ON LOGO 
  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/'), [history]);


    return (
        <div className={classes.Logo} onClick={handleOnClick}>
            <img src={burgerlogo} alt="burger logo" />
        </div>
    );
};

export default logo;
