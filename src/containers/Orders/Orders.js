import axios from "axios";
import React, { Component } from "react";
import Order from "../../components/Order/Order";
import classes from "./Orders.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/order";
import Spinner from "../../components/UI/Spinner/Spinner";
class Orders extends Component {
    state = {
        orders: [],
    };

    componentDidMount() {
        // axios
        //     .get("http://localhost:5000/orders")
        //     .then((res) => {
        //         console.log(res);
        //         this.setState({ orders: res.data });
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });

        this.props.onFetchOrders();
    }

    render() {
        let orders = <Spinner />;
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

        return <div>{orders}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
