import { set } from 'mongoose';
import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';


class Checkout extends Component {
    state = {
        ingredients: {
            salad: 1,
            meat: 0,
            cheese: 1,
            bacon: 2,
            onion: 1
        }
        
    }
    cancleHandler = () => {
        this.props.history.goBack();
    }
    continueHandler = () => {
        console.log(this.props)
        this.props.history.replace(this.props.location.pathname + "/contact-data");
    }
    componentDidMount () {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        for(let params of query.entries()) {
            ingredients[params[0]] = +params[1];
        }
        
        this.setState({ingredients: ingredients})
    }

    render () {
        return(
            <div>
                <CheckoutSummary 
                ingredients={this.state.ingredients}
                cancleClick={this.cancleHandler}
                continueClick={this.continueHandler}/>
            </div>
        );
    }
}

export default Checkout;