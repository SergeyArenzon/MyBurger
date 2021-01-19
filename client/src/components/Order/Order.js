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
            <div className={classes.Ings}>
                Ingredients:
                <p>{ingredientOutput}</p>
            </div>
            <div className={classes.Price}>
                Price: 
                <p><strong>{props.price}</strong></p>
            </div>
            <div className={classes.CreatedAt}>
                CreatedAt:
                <p>{props.createdAt}</p>
            </div>
            <div className={classes.Name}>
                Ordered Name: <p>{props.name}</p>
            </div>
        </div>
    );
};

export default order;
