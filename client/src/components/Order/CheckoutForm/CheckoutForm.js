import React from "react";
import classes from "./CheckoutForm.module.css";
import { INGREDIENT_PRICES } from "../../../store/reducers/burgerBuilder";

export default function CheckoutForm(props) {
  const ingredientsName = Object.entries(props.ingredients).map((key) => {
    if (key[1] > 0) {
      return (
        <li key={key[0]}>{key[0].charAt(0).toUpperCase() + key[0].slice(1)}</li>
      );
    }
  });

  const ingredientsCount = Object.entries(props.ingredients).map((key) => {
    if (key[1] > 0) {
      return <li key={key[0]}>{key[1]}</li>;
    }
  });
  console.log(ingredientsName);
  const ingredientsPrice = Object.entries(props.ingredients).map((ing) => {
    if (ing[1] > 0) {
        const ingPrice = parseFloat(INGREDIENT_PRICES[ing[0]]) * [ing[1]];
        
        
      return <li key={ing[0]}>${ingPrice.toFixed(1)}</li>;
    }
  });

  return (
    <div className={classes.CheckoutForm}>
      <h1>Order Summary</h1>
      <div className={classes.Row}>
        <div className={classes.LeftColumn}>
          <ul>{ingredientsName}</ul>
        </div>
        <div className={classes.CenterColumn}>
          <ul>{ingredientsCount}</ul>
        </div>

        <div className={classes.RightColumn}>
          <ul>{ingredientsPrice}</ul>
        </div>
      </div>
      <div className={classes.TotalRow}>
        <div className={classes.TotalLeftColumn}>Total</div>
        <div className={classes.TotalCenterColumn}></div>
        <div className={classes.TotalRightColumn}>${props.price.toFixed(1)}</div>
      </div>
    </div>
  );
}
