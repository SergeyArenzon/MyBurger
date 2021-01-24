import React, { useState } from "react";
import classes from "./Order.module.css";

const order = (props) => {
    const [fold, setFold] = useState(false);

    const ingredients = [];
    for (let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName],
        });
    }

    const ingredientOutput = ingredients.map((ig) => {
        if (ig.amount > 0) {
            return (
                <span
                    key={ig.name}
                    style={{
                        textTransform: "capitalize",
                        display: "block",
                        // margin: "0 8px",
                        // border: "1px solid #ccc",
                        // padding: "5px",
                    }}
                >
                    {ig.name} x{ig.amount}
                </span>
            );
        }
        return null;
    });

    const foldHandler = () => {
        setFold(!fold);
    };

    return (
        <div
            className={[classes.Order, fold ? classes.Def : null].join(" ")}
            onClick={foldHandler}
        >
            <div className={classes.Name}>
                <strong>Ordered By</strong> {props.name}
            </div>

            <div className={classes.CreatedAt}>
                <strong>Date</strong>
                {props.createdAt}
            </div>
            <br />
            <div className={classes.Expand}>
                <div>
                    <strong>Price</strong>
                    <div>{props.price}</div>
                </div>
                <div>
                    <strong>Street</strong> <div>{props.orderData.street}</div>
                </div>
                <div>
                    <strong>Phone</strong> <div>{props.orderData.phone}</div>
                </div>
                <div>
                    <strong>Email</strong> <div>{props.orderData.email}</div>
                </div>
                <div>
                    <strong>Delivery</strong>{" "}
                    <div>
                        <strong>{props.orderData.deliveryMethod}</strong>
                    </div>
                </div>
                <div>
                    <strong>Ingredients</strong> <div>{ingredientOutput}</div>
                </div>
            </div>
        </div>
    );
};

export default order;
