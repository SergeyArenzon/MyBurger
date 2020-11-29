import React, { Component } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";
import * as actions from '../../store/actions/index';


class Checkout extends Component {

    state = {
        contactIsLoaded: false
    }
    cancleHandler = () => {
        this.props.history.goBack();
    };
    continueHandler = () => {
        this.setState({contactIsLoaded: true});
        this.props.history.replace(
            this.props.location.pathname + "/contact-data"
            
        );
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchasedRedirect = this.props.purchased ? <Redirect to="/" /> : null

            summary = (
                <div>
                    {purchasedRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        cancleClick={this.cancleHandler}
                        continueClick={this.continueHandler}
                        hide={this.state.contactIsLoaded}
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
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased,
        auth: state.auth
    };
};


export default connect(mapStateToProps)(Checkout);
