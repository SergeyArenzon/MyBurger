import React, { Component } from 'react';
import Aux from '../../hoc/Aux';
import Burger from '../../components/Burger/Burger';
// import BurgerIngredient from '../../components/Burger/BurgerIngredient/BurgerIngredient';
import BuildControls from './../../components/Burger/BuildControls/BuildControls';


class BurgerBuilder extends Component {
    
    state = {
        ingredients: {
            salad: 1,
            bacon: 2,
            cheese: 0,
            meat: 0
        }
    }

    render() {
        return (
            <Aux>
                <Burger ingredients={this.state.ingredients}/>
                <BuildControls></BuildControls>
            </Aux>
        );
    }
}

export default BurgerBuilder;