import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
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
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            summary = (
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

        return summary;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
};

export default connect(mapStateToProps)(Checkout);
