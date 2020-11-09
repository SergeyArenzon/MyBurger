import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";

class Checkout extends Component {
  state = {
    ingredients: {
      salad: 1,
      meat: 0,
      cheese: 1,
      bacon: 2,
      onion: 1,
    },
    price: null,
  };
  cancleHandler = () => {
    this.props.history.goBack();
  };
  continueHandler = () => {
    this.props.history.replace(this.props.location.pathname + "/contact-data");
  };
  componentDidMount() {
    const query = new URLSearchParams(this.props.location.search);
    const ingredients = {};
    let price = null;
    for (let params of query.entries()) {
      if (params[0] === "price") {
        price = params[1];
      } else {
        ingredients[params[0]] = +params[1];
      }
    }

    this.setState({ ingredients: ingredients, price: price });
  }

  render() {
    return (
      <div>
        <CheckoutSummary
          ingredients={this.state.ingredients}
          cancleClick={this.cancleHandler}
          continueClick={this.continueHandler}
        />
        <Route
          path={this.props.match.path + "/contact-data"}
          render={(props) => (
            <ContactData
              price={this.state.price}
              ingredients={this.state.ingredients}
              {...props}
            />
          )}
        />
      </div>
    );
  }
}

export default Checkout;
