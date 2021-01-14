import React from "react";
import Burger from "../../Burger/Burger";
import Button from "../../../components/UI/Button/Button";
import classes from "./CheckoutSummary.module.css";
import CheckoutForm from "../CheckoutForm/CheckoutForm";

const checkoutSummary = (props) => {
  return (
    <div className={classes.CheckoutSummary}>
      <Burger ingredients={props.ingredients} />

      <div className={classes.Form}>
        <CheckoutForm ingredients={props.ingredients} price={props.price} />
        <div>
          <Button btnType="Checkout_Cancle" clicked={props.cancleClick}>
            CANCLE
          </Button>

          {/* <Link to={"/auth"}>
              btn
          </Link> */}
            <Button
              btnType="Checkout_Continue"
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
