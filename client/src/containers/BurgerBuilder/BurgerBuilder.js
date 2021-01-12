import React, { useState, useEffect } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
// import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

const burgerBuilder = (props) => {
    // state = {
    //   purchasable: false,
    //   purchasing: false,
    //   loading: false,
    // };

    // const [purchasable, setPurchasable] = useState(false);
    const [purchasing, setPurchasing] = useState(false);
    const [loading] = useState(false);

    useEffect(() => {
        // check for redirection to "/" init ingredients bug
        if (!props.ings) {
            props.onInitIngredients();
        }

        console.log("[BurgerBuilder]render");
    }, []);

    const purchaseHandler = () => {
        setPurchasing(true);
    };

    const purchaseCancleHandler = () => {
        setPurchasing(false);
    };
    const purchaseContinueHandler = () => {
        props.onInitPurchase();
        props.history.push("/checkout");
    };

    // const checkPurchasableHandler = (price) => {
    //   return price.toFixed(2) > 0;
    // };

    const disabledInfo = {
        ...props.ings,
    };

    for (let key in disabledInfo) {
        disabledInfo[key] = disabledInfo[key] <= 0;
    }

    let orderSummary = null;
    let burger = props.error ? <p>Ingredients cant be loaded</p> : null;

    if (props.ings !== null) {
        burger = (
            <Aux>
                <Burger ingredients={props.ings} />
                <BuildControls
                    ingredientAdded={props.onIngredientAdded}
                    ingredientRemoved={props.onIngredientRemoved}
                    disabled={disabledInfo}
                    price={props.price}
                    purchasable={props.price.toFixed(2) > 0 ? true : false}
                    ordered={purchaseHandler}
                    loading={loading}
                ></BuildControls>
            </Aux>
        );
        orderSummary = (
            <OrderSummary
                ingredients={props.ings}
                purchaseCanceled={purchaseCancleHandler}
                purchaseContinued={purchaseContinueHandler}
                price={props.price.toFixed(2)}
            ></OrderSummary>
        );
    }
  
    return (
        <Aux>
            <Modal show={purchasing} modalClosed={purchaseCancleHandler}>
                {orderSummary}
            </Modal>
            {burger}
        </Aux>
    );
};

const mapToStateProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) =>
            dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved: (ingName) =>
            dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
    };
};

export default connect(mapToStateProps, mapDispatchToProps)(burgerBuilder);
