import * as actionTypes from "./actionTypes";
import axios from "axios";

export const addIngredient = (name) => {
    return {
        type: actionTypes.ADD_INGREDIENTS,
        ingredientName: name,
    };
};

export const removeIngredient = (name) => {
    return {
        type: actionTypes.REMOVE_INGREDIENTS,
        ingredientName: name,
    };
};

export const setIngredients = (ingredients) => {
    return {
        type: actionTypes.SET_INGREDIENTS,
        ingredients: ingredients,
    };
};

export const fetchIngredientsFailed = () => {
    return {
        type: actionTypes.FETCH_INGREDIENTS_FAILED,
    };
};

export const initIngredients = () => {
    return (dispatch) => {
        axios
            .get("HEROKU_URI/ingredients")
            .then((response) => {
                dispatch(setIngredients(response.data));
                // dispatch(loadUser())
            })
            .catch(function (error) {
                dispatch(fetchIngredientsFailed());
            });
    };
};
