import React, { useState } from "react";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import { Route, Redirect } from "react-router-dom";
import ContactData from "../Checkout/ContactData/ContactData";
import { connect } from "react-redux";
import classes from './Checkout.module.css';

const checkout = (props) => {
  const [contactIsLoaded, setContactIsLoaded] = useState(false);

  const cancleHandler = () => {
    props.history.goBack();
  };
  const continueHandler = () => {
    setContactIsLoaded(true);
    props.history.replace(props.location.pathname + "/contact-data");
  };

  let summary = <Redirect to="/" />;
  if (props.ings) {
    const purchasedRedirect = props.purchased ? <Redirect to="/" /> : null;

    summary = (
      <div className={classes.Checkout}>
        {purchasedRedirect}
        
        <CheckoutSummary
          ingredients={props.ings}
          cancleClick={cancleHandler}
          continueClick={continueHandler}
          hide={contactIsLoaded}
        />
        <Route
          path={props.match.path + "/contact-data"}
          component={ContactData}
        />
      </div>
    );
  }

  return summary;
};

const mapStateToProps = (state) => {
  return {
    ings: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    purchased: state.order.purchased,
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(checkout);
