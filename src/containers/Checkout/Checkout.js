import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
    cancleHandler = () => {
        this.props.history.goBack();
    };
    continueHandler = () => {
        this.props.history.replace(
            this.props.location.pathname + "/contact-data"
        );
    };

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.props.ings}
                    cancleClick={this.cancleHandler}
                    continueClick={this.continueHandler}
                />
                <Route
                    path={this.props.match.path + "/contact-data"}
                    component={ContactData}
                />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
};

export default connect(mapStateToProps)(Checkout);
