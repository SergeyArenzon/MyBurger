import React, { useEffect, useState } from "react";
import Order from "../../components/Order/Order";
import classes from "./Orders.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/order";
import Spinner from "../../components/UI/Spinner/Spinner";
import Auth from "../Auth/Auth";

const orders = (props) => {
    const [foldListener, setFoldListener] = useState(null);

    useEffect(() => {
        console.log("Orders[]");
        if (props.auth.isAuthenticated) {
            let orderListener = [];
            for (let i = 0; i < props.orders.length; i++) {
                orderListener.push({
                    orderId: props.orders[i]._id,
                    isExpend: false,
                });
            }
            setFoldListener(orderListener);
        }
    }, []);

    const foldListenerHandler = (id, state) => {
        if (!state) {
            let orderListener = [];
            for (let i = 0; i < props.orders.length; i++) {
                orderListener.push({
                    orderId: props.orders[i]._id,
                    isExpend: false,
                });
            }

            orderListener['orderId'] = true;
            setFoldListener(orderListener);
        } 

    }
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
                                        name={order.orderData.name}
                                        email={order.email}
                                        price={order.price}
                                        createdAt={order.createdAt}
                                        orderId= {order._id}
                                        foldListener={foldListener}
                                        foldListenerHandler={foldListenerHandler}
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
