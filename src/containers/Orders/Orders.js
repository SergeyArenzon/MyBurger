import axios from "axios";
import React, { Component } from "react";
import Order from "../../components/Order/Order";
import classes from "./Orders.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/order";
import Spinner from "../../components/UI/Spinner/Spinner";
import Auth from "../Auth/Auth";
import { Redirect } from "react-router-dom";
class Orders extends Component {
    state = {
        orders: [],
        updated: false,
    };

    componentDidMount() {
        if (this.props.auth.isAuthenticated) {
            this.props.onFetchOrders();
        }
    }

    render() {
        let orders = <Spinner />;
        if (this.props.auth.isAuthenticated) {
            if (!this.props.loading) {
                orders = (
                    <div className={classes.Orders}>
                        <ul className>
                            {this.props.orders.map((order) => {
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
            // orders = <Redirect to='/auth' />;
            orders = <Auth />;
            

        }

        return <div>{orders}</div>;
    }
}

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

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
