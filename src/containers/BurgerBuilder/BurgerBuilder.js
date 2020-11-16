import React, { Component } from "react";
import Aux from "../../hoc/Aux/Aux";
import Burger from "../../components/Burger/Burger";
// import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import BuildControls from "./../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from "axios";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actiontypes from '../../store/actions';

class BurgerBuilder extends Component {
    state = {
        purchasable: false,
        purchasing: false,
        loading: false,
    };

    componentDidMount() {
        // axios
        //   .get("http://localhost:5000/ingredients")
        //   .then((response) => {
        //     // handle success
        //     let currentIngredients = response.data;
        //     this.setState({ ingredients: currentIngredients });
        //   })
        //   .catch(function (error) {
        //     // handle error
        //     console.log(error);
        //   });
    }

    // updatePurchasable = (ingredients) => {
    //     const sum = Object.keys(ingredients)
    //         .map((igKey) => {
    //             return ingredients[igKey];
    //         })
    //         .reduce((sum, el) => {
    //             return sum + el;
    //         }, 0);
    //     return sum > 0 ;
    // };

    // addIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     const updateCount = oldCount + 1;
    //     const updatedIngredient = {
    //         ...this.state.ingredients,
    //     };
    //     updatedIngredient[type] = updateCount;
    //     const priceAddition = INGREDIENT_PRICES[type];
    //     const oldPrice = this.state.totalPrice;
    //     const newPrice = oldPrice + priceAddition;
    //     this.setState({ totalPrice: newPrice, ingredients: updatedIngredient });
    //     this.updatePurchasable(updatedIngredient);
    // };

    // removeIngredientHandler = (type) => {
    //     const oldCount = this.state.ingredients[type];
    //     if (oldCount > 0) {
    //         const updateCount = oldCount - 1;
    //         const updatedIngredient = {
    //             ...this.state.ingredients,
    //         };
    //         updatedIngredient[type] = updateCount;
    //         const priceAddition = INGREDIENT_PRICES[type];
    //         const oldPrice = this.state.totalPrice;
    //         let newPrice = oldPrice - priceAddition;
    //         if (newPrice < 0) {
    //             newPrice = 0;
    //         }
    //         this.setState({
    //             totalPrice: newPrice,
    //             ingredients: updatedIngredient,
    //         });
    //         this.updatePurchasable(updatedIngredient);
    //     }
    // };

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    };

    purchaseCancleHandler = () => {
        this.setState({ purchasing: false });
    };
    purchaseContinueHandler = () => {
        this.setState({ loading: true });

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(
                encodeURIComponent(i) +
                    "=" +
                    encodeURIComponent(this.state.ingredients[i])
            );
        }
        const queryString = queryParams.join("&");
        this.props.history.push({
            pathname: "/checkout",
            search:
                "?" +
                queryString +
                "&price=" +
                this.props.price.toFixed(2),
        });
    };

  checkPurchasableHandler = (price) => {
    return price.toFixed(2) > 0;
  }



    render() {        
        const disabledInfo = {
            ...this.props.ings,
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner />;
        if (this.props.ings !== null) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        disabled={disabledInfo}
                        price={this.props.price}
                        purchasable={this.props.price.toFixed(2) > 0 ? true : false}
                        ordered={this.purchaseHandler}
                        loading={this.state.loading}
                    ></BuildControls>
                </Aux>
            );
            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    purchaseCanceled={this.purchaseCancleHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.props.price.toFixed(2)}
                ></OrderSummary>
            );
        }
        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancleHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapToStateProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdded: (ingName) =>  dispatch({type: actiontypes.ADD_INGREDIENTS, ingredientName: ingName}),
        onIngredientRemoved: (ingName) =>  dispatch({type: actiontypes.REMOVE_INGREDIENTS, ingredientName: ingName})
    };
};

export default connect(mapToStateProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
