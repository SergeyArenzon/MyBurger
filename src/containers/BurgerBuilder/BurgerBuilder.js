import React, { Component } from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
// import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from 'axios';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { Link, Route } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';


const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7,
    onion: 0.2
}

class BurgerBuilder extends Component {
    
    state = {
        ingredients: null,
        totalPrice: 0,
        purchasable: false,
        purchasing: false,
        loading: false
    }

    componentDidMount () {
        axios.get('http://localhost:5000/ingredients')
            .then((response) => {
                // handle success
                let currentIngredients = response.data;
                this.setState({ingredients: currentIngredients});
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            })
    }

    updatePurchasable = ( ingredients ) => {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey] 
            })  
                .reduce((sum, el) => {
                    return sum + el;
                }, 0);       
        this.setState({purchasable: sum > 0});
    }


    addIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        const updateCount = oldCount + 1;
        const updatedIngredient = {
            ...this.state.ingredients
        }
        updatedIngredient[type] = updateCount;
        const priceAddition = INGREDIENT_PRICES[type];
        const oldPrice = this.state.totalPrice;
        const newPrice = oldPrice + priceAddition;
        this.setState({totalPrice: newPrice, ingredients: updatedIngredient});
        this.updatePurchasable(updatedIngredient);
        
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if(oldCount > 0) {
            const updateCount = oldCount - 1;
            const updatedIngredient = {
                ...this.state.ingredients
            }
            updatedIngredient[type] = updateCount;
            const priceAddition = INGREDIENT_PRICES[type];
            const oldPrice = this.state.totalPrice;
            let newPrice = oldPrice - priceAddition;
            if(newPrice < 0) {
                newPrice = 0;
            }
            this.setState({totalPrice: newPrice, ingredients: updatedIngredient});
            this.updatePurchasable(updatedIngredient); 
        }
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }

    purchaseCancleHandler = () => {
        this.setState({purchasing: false})
    }
    purchaseContinueHandler = () => {
        this.setState({loading: true});
        
        // 
        //   push new order 
        //
        // const order = {
        //     ingredients : this.state.ingredients,
        //     price: this.state.totalPrice,
        //     address: {
        //         street: 'teststreet',
        //         zipCode: '123'
        //     },
        //     email: 'test22@gmail.com'
        // }
        
            
        
        // axios.post('http://localhost:5000/orders/add', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //         console.log(error)
        //     })

        const queryParams = [];
        for (let i in this.state.ingredients) {
            queryParams.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]))
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    }

    
    render() {
        const disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;
        let burger = <Spinner/>
        if(this.state.ingredients !== null) {
            burger = (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls
                    ingredientAdded={this.addIngredientHandler}
                    ingredientRemoved={this.removeIngredientHandler}
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    ordered={this.purchaseHandler}
                    loading={this.state.loading}>
                </BuildControls>
            </Aux>
            );
            orderSummary = 
                <OrderSummary 
                    ingredients={this.state.ingredients}
                    purchaseCanceled={this.purchaseCancleHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                    price={this.state.totalPrice.toFixed(2)}>    
                </OrderSummary>
        }
        if(this.state.loading) {
            orderSummary = <Spinner/>
        }

        return (
            <Aux>
                <Modal 
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancleHandler}>
                        {orderSummary}
                </Modal>
                {burger}
            </Aux>
            
        );
    }
}

export default withErrorHandler(BurgerBuilder, axios);