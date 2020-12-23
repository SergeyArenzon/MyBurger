import React from "react";
import classes from "./CheckoutForm.module.css";

export default function CheckoutForm(props) {
  const ingredientsName = Object.entries(props.ingredients).map((key) => {
    if (key[1] > 0) {
      console.log(key);
      return <li>{key[0].charAt(0).toUpperCase() + key[0].slice(1)}</li>;
    }
  });

  const ingredientsCount = Object.entries(props.ingredients).map((key) => {
    if (key[1] > 0) {
      console.log(key);
      return <li>{key[1]}</li>;
    }
  });
  return (
    <div className={classes.CheckoutForm}>
      <h1>Order Summary</h1>
      <div className={classes.Row}>
        <div className={classes.LeftColumn}>
          <ul>{ingredientsName}</ul>
        </div>
        <div className={classes.RightColumn}>
          <ul>
           {ingredientsCount}
          </ul>
        </div>
      </div>
      <div className={classes.TotalRow}>
        <div className={classes.LeftColumn}>Total</div>
        <div className={classes.RightColumn}>${props.price.toFixed(1)}</div>
      </div>
    </div>
  );
}
