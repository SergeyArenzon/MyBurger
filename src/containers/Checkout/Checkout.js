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