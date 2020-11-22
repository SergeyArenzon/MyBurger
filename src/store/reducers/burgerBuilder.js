import * as actionTypes from "../actions/actionTypes";
import { updateObject } from "../utility";

const initialState = {
    ingredients: null,
    totalPrice: 0,
    error: false,
};

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    onion: 0.2,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENTS:
            const updatedIngredient = {
                [action.ingredientName]:
                    state.ingredients[action.ingredientName] + 1,
            };
            const updatedIngredients = updateObject(
                state.ingredients,
                updatedIngredient
            );
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice:
                    state.totalPrice + INGREDIENT_PRICES[action.ingredientName],
            };
            return updateObject(state, updatedState);

            
        case actionTypes.REMOVE_INGREDIENTS:
            const updatedIngredient2 = {
                [action.ingredientName]:
                    state.ingredients[action.ingredientName] - 1,
            };
            const updatedIngredients2 = updateObject(
                state.ingredients,
                updatedIngredient2
            );
            const updatedState2 = {
                ingredients: updatedIngredients2,
                totalPrice:
                    state.totalPrice - INGREDIENT_PRICES[action.ingredientName],
            };
            return updateObject(state, updatedState2);

        case actionTypes.SET_INGREDIENTS:
            const updatedState3 = updateObject(state, {
                ingredients: action.ingredients,
                error: false,
                totalPrice: 0,
            });
            return updatedState3;
           
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            const updatedState4 = updateObject(state, {error: true});
            return updatedState4;
        default:
            return state;
    }
};

export default reducer;
