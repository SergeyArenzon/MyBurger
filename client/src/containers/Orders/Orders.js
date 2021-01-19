import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import classes from "./Orders.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/order";
import Spinner from "../../components/UI/Spinner/Spinner";
import Auth from "../Auth/Auth";

const orders = (props) => {
  useEffect(() => {
    if (props.auth.isAuthenticated) {
      console.log("if (props.auth.isAuthenticated) ");
      props.onFetchOrders();
    }
  }, []);

  let orders = <Spinner />;
  if (props.auth.isAuthenticated) {
    if (!props.loading) {
      orders = (
        <div className={classes.Orders}>
          <ul>
            {props.orders.map((order) => {
              return (
                <li key={order._id}>
                  <Order
                    ingredients={order.ingredients}
                    address={order.address}
                    name={order.name}
                    email={order.email}
                    price={order.price}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      );
    }
  } else {
    orders = <Auth />;
  }
  return <div>{orders}</div>;
};

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: () => dispatch(actions.fetchOrders()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(orders);
