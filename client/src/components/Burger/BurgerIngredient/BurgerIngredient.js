/* eslint-disable default-case */
import React  from "react";
import classes from "./BurgerIngredient.module.css";
import PropTypes from "prop-types";

const burgerIngredient = (props) => {
  let ingredient = null;

  switch (props.type) {
    case "bread-bottom":
      ingredient = <div className={classes.BreadBottom}></div>;
      break;
    case "bread-top":
      ingredient = (
        <div className={classes.BreadTop}>
         
        </div>
      );
      break;
    case "meat":
      ingredient = <div className={classes.Meat}></div>;
      break;
    case "cheese":
      ingredient = <div className={classes.Cheese}></div>;
      break;
    case "lettuce":
      ingredient = <div className={classes.Lettuce}></div>;
      break;
    case "tomato":
      ingredient = <div className={classes.Tomato}></div>;
      break;
    case "onion":
      ingredient = <div className={classes.Onion}></div>;
      break;
      case "mayo":
        ingredient = <div className={classes.Mayo}></div>;
        break; 
        case "cucumber":
          ingredient = <div className={classes.Cucumber}></div>;
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
