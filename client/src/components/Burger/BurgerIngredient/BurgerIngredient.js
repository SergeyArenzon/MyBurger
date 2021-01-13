/* eslint-disable default-case */
import React from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const burgerIngredient = (props) => {
    let ingredient = null;

    switch (props.type) {
        case "bread-bottom":
            ingredient = <div className={classes.BreadBottom}></div>;
            break;
        case "bread-top":
            ingredient = <div className={classes.BreadTop}></div>;
            break;
        case "meat":
            ingredient = (
                <div
                    className={classes.Meat}
                    onClick={() => props.clickForRemove("meat")}
                ></div>
            );
            break;
        case "cheese":
            ingredient = (
                <div
                    className={classes.Cheese}
                    onClick={() => props.clickForRemove("cheese")}
                ></div>
            );
            break;
        case "lettuce":
            ingredient = (
                <div
                    className={classes.Lettuce}
                    onClick={() => props.clickForRemove("lettuce")}
                ></div>
            );
            break;
        case "tomato":
            ingredient = (
                <div
                    className={classes.Tomato}
                    onClick={() => props.clickForRemove("tomato")}
                ></div>
            );
            break;
        case "onion":
            ingredient = (
                <div
                    className={classes.Onion}
                    onClick={() => props.clickForRemove("onion")}
                ></div>
            );
            break;
        case "mayo":
            ingredient = (
                <div
                    className={classes.Mayo}
                    onClick={() => props.clickForRemove("mayo")}
                ></div>
            );
            break;
        case "cucumber":
            ingredient = (
                <div
                    className={classes.Cucumber}
                    onClick={() => props.clickForRemove("cucumber")}
                ></div>
            );
            break;
        default:
            ingredient = null;
    }
    return ingredient;
};

burgerIngredient.propTypes = {
    type: PropTypes.string.isRequired,
};

export default burgerIngredient;
