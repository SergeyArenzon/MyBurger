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
                Ordered By: <strong>{props.name}</strong>
            </div>

            <div className={classes.CreatedAt}>
                Date: <strong>{props.createdAt}</strong>
            </div>
            <br />
            <div className={classes.Expand}>
                <div>
                    Price:<div><strong>{props.price}</strong></div>
                </div>
                <div>
                    Street: <div><strong>{props.orderData.street}</strong></div>
                </div>
                <div>
                    Phone: <div><strong>{props.orderData.phone}</strong></div>
                </div>
                <div>
                    Email: <div><strong>{props.orderData.email}</strong></div>
                </div>
                <div>
                    Delivery: <div><strong>{props.orderData.deliveryMethod}</strong></div>
                </div>
                <div>
                    Ingredients: <div>{ingredientOutput}</div>
                </div>
            </div>
        </div>
    );
};

export default order;
