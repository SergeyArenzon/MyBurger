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

    let foldShow = null;

    if (fold) {
        foldShow = classes.Folded;
    }

   
    return (
        <div className={classes.Order} onClick={foldHandler}>
            <div className={classes.Name}>
                Ordered Name: <p>{props.name}</p>
            </div>

            <div className={foldShow}>
                <div className={!foldShow ? classes.DisplayNone : null}>
                    <div className={classes.CreatedAt}>
                        Date:
                        <p>{props.createdAt}</p>
                    </div>
                    <div className={classes.Price}>
                        Price:
                        <p>
                            <strong>{props.price}</strong>
                        </p>
                    </div>
                    <div className={classes.Ings}>
                        Ingredients:
                        <p>{ingredientOutput}</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default order;
