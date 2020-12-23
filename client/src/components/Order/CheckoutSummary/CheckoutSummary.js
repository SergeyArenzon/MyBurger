import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../../components/UI/Button/Button";
import classes from "./CheckoutSummary.module.css";

const checkoutSummary = (props) => {

  // ordered ingredients summary  
  const ingredientsSummary = Object.entries(props.ingredients).map(
    (key) => {
      if (key[1] > 0) {
        console.log(key);
        return <div>{key[0] + ": " + key[1]}</div>;
      }
    }
  );
  return (
    <div className={classes.CheckoutSummary}>
      <Burger ingredients={props.ingredients} />

      <div className={classes.Form}>
        <h1>Price: {props.price}$ </h1>
        {ingredientsSummary}
        <div>
          <Button btnType="Danger" clicked={props.cancleClick}>
            CANCLE
          </Button>

          <Button
            btnType="Success"
            clicked={props.continueClick}
            disabled={props.hide}
          >
            CONTINUE
          </Button>
        </div>
      </div>
    </div>
  );
};

export default checkoutSummary;
