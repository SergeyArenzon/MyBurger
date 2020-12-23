import React from "react";
import classes from "./Burger.module.css";
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const burger = (props) => {
  let transformedIngredients = Object.keys(props.ingredients)
    .map((igKey) => {
      return [...Array(props.ingredients[igKey])].map((_, i) => {
        return <BurgerIngredient key={igKey + i} type={igKey} />;
      });
    })
    .reduce((arr, el) => {
      return arr.concat(el);
    }, []);
  const addIngsText = <h2 className={classes.AddIngsText}>Add Ingredients</h2>;

  /* Fixes scrolling after too many ingredients added */
  let Burger = classes.Burger;
  if (transformedIngredients.length > 6) {
    Burger = classes.BurgerScrolled;
  }

  return (
    <div className={Burger}>
      <BurgerIngredient type="bread-top" />
      {transformedIngredients.length < 1 ? addIngsText : null}
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom" />
    </div>
  );
};

export default burger;
