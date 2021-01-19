import React from "react";
import classes from "./Order.module.css";

const order = (props) => {
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
                        display: "inline",
                        margin: "0 8px",
                        border: "1px solid #ccc",
                        padding: "5px",
                    }}
                >
                    {ig.name} ({ig.amount})
                </span>
            );
        }
    });

    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientOutput}</p>
            <p>
                Price: <strong>{props.price}</strong>
            </p>
        </div>
    );
};

export default order;
