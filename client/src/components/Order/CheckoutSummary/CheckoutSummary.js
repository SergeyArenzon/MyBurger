import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../../components/UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
import CheckoutForm from '../CheckoutForm/CheckoutForm';


const checkoutSummary = (props) => {

  return (
    <div className={classes.CheckoutSummary}>
      <Burger ingredients={props.ingredients} />

      <div className={classes.Form}>
        <CheckoutForm ingredients={props.ingredients} price={props.price}/>
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
