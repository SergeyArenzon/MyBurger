import * as actionTypes from "./actionTypes";
import axios from "axios";
import { tokenConfig } from "./auth";

export const purchaseBurgerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BURGER_SUCCESS,
        orderId: id,
        orderData: orderData,
    };
};

export const purchaseBurgerFail = (error) => {
    return {
        type: actionTypes.PURCHASE_BURGER_FAIL,
        error: error,
    };
};

export const purchaseBurgerStart = () => {
    return {
        type: actionTypes.PURCHASE_BURGER_START,
    };
};

export const purchaseBurger = (orderData) => {
    console.log(orderData);
    return (dispatch, getState) => {
        dispatch(purchaseBurgerStart());
        axios
            .post(
                "/orders/add",
                orderData,
                tokenConfig(getState)
            )
            .then((response) => {
                dispatch(purchaseBurgerSuccess(response.data.name, orderData));
            })
            .catch((error) => {
                dispatch(purchaseBurgerFail(error));
            });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURCHASE_INIT,
    };
};

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders,
    };
};

export const fetchOrderFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error,
    };
};

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START,
    };
};

export const fetchOrders = () => {
    return (dispatch, getState) => {
        
        dispatch(fetchOrderStart());
        const userId = getState().auth.user._id;
        axios
            .get("/orders", { params: { userId: userId } })
            .then((res) => {
                console.log(res);
                dispatch(fetchOrderSuccess(res.data));
            })
            .catch((err) => {
                console.log(err);
                dispatch(fetchOrderFail(err));
            });
    };
};
