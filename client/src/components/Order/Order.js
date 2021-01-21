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
        return null;
    });

    const foldHandler = () => {
        setFold(!fold);
    };

    return (
        <div className={[classes.Order, fold ? classes.Def : null ].join(' ')} onClick={foldHandler}>
            <div className={classes.Name}>
                Ordered Name: <strong>{props.name}</strong>
            </div>

            <div >
                <div className={classes.CreatedAt}>
                    Date: <strong>{props.createdAt}</strong>
                    
                </div>
                <div className={classes.Price}>
                    Price:
                    
                        <strong>{props.price}</strong>
                    
                </div>
                <div className={classes.Ings}>
                    Ingredients:
                    <div>{ingredientOutput}</div>
                </div>
            </div>
        </div>
    );
};

export default order;
