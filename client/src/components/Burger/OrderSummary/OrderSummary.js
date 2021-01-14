import React from "react";
import Aux from "../../../hoc/Aux/Aux";
import Button from "../../UI/Button/Button";
import classes from "./OrderSummary.module.css";


const orderSummary = (props) => {
    const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey}</span> :{" "}
                {props.ingredients[igKey]}
            </li>
        );
    });

    return (
        <Aux >
            {/* <h3>Your Order</h3>
      <p>A delecious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.price}</strong>{" "}
      </p> */}
            <div className={classes.OrderSummary}>
                <p>Is it you final order? </p>
                <Button btnType="Danger" clicked={props.purchaseCanceled}>
                    CANCEL
                </Button>

                <Button btnType="Success" clicked={props.purchaseContinued}>
                    CONTINUE
                </Button>
            </div>
        </Aux>
    );
};
export default orderSummary;
