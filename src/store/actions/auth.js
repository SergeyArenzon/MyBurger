// import * as actionTypes from "./actionTypes";
// import axios from "axios";

// export const authStart = () => {
//     return {
//         type: actionTypes.AUTH_START,
//     };
// };

// export const authSuccess = (idToken, userId) => {
//     return {
//         type: actionTypes.AUTH_SUCCESS,
//         token: idToken,
//         userId: userId,
//     };
// };

// export const authFail = (error) => {
//     return {
//         type: actionTypes.AUTH_FAIL,
//         error: error,
//     };
// };

// export const logout = () => {
//     return {
//         type: actionTypes.AUTH_LOGOUT,
//     };
// };

// export const checkAuthTimeout = (expirationTime) => {
//     return (dispatch) => {
//         setTimeout(() => {
//             dispatch(logout());
//         }, expirationTime * 1000);
//     };
// };

// export const auth = (email, password, isSignup) => {
//     return (dispatch) => {
//         dispatch(authStart());
//         const authData = {
//             email: email,
//             password: password,
//             returnSecureToken: true,
//         };
//         let url =
//             "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFFfCTRipxD7F1H5c2T0TtG34d16RZbrQ";
//         if (!isSignup) {
//             url =
//                 "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFFfCTRipxD7F1H5c2T0TtG34d16RZbrQ";
//         }
//         axios
//             .post(url, authData)
//             .then((response) => {
//                 console.log(response);
//                 dispatch(
//                     authSuccess(response.data.idToken, response.data.localId)
//                 );
//                 dispatch(checkAuthTimeout(response.data.expiresIn));
//             })
//             .catch((err) => {
//                 console.log(err.response);
//                 dispatch(authFail(err.response));
//             });
//     };
// };

import * as actionTypes from "./actionTypes";
import axios from "axios";
import { returnErrors } from "./error";

export const login = ({ email, password }) => (dispatch) => {
    dispatch({ type: actionTypes.USER_LOADING });
    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ email, password });
    axios
        .post("http://localhost:5000/auth", body, config)
        .then((res) => {
            const fixedData = {
                ...res.data,
                user: { _id: res.data.user.id },
            };

            delete fixedData["user[id]"];

            dispatch({
                type: actionTypes.LOGIN_SUCCESS,
                payload: fixedData,
            });
        })
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    "LOGIN_FAIL"
                )
            );
            dispatch({
                type: actionTypes.LOGIN_FAIL,
            });
        });
};

export const register = ({ name, email, password }) => (dispatch) => {
    dispatch({ type: actionTypes.USER_LOADING });

    const config = {
        headers: {
            "Content-Type": "application/json",
        },
    };

    const body = JSON.stringify({ name, email, password });
    axios
        .post("/users/add", body, config)
        .then((res) =>
            dispatch({
                type: actionTypes.REGISTER_SUCCESS,
                payload: res.data,
            })
        )
        .catch((err) => {
            dispatch(
                returnErrors(
                    err.response.data,
                    err.response.status,
                    "REGISTER_FAIL"
                )
            );
            dispatch({
                type: actionTypes.REGISTER_FAIL,
            });
        });
};

export const logout = () => {
    return {
        type: actionTypes.LOGOUT_SUCCESS,
    };
};

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: actionTypes.USER_LOADING });

    axios
        .get("http://localhost:5000/auth/user", tokenConfig(getState))
        .then((res) => {
            dispatch({
                type: actionTypes.USER_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: actionTypes.AUTH_ERROR });
        });
};

// Setup config/headers and token

export const tokenConfig = (getState) => {
    // Get token from loaclStorage
    const token = getState().auth.token;

    // Header

    const config = {
        headers: {
            "Content-type": "application/json",
        },
    };
    if (token) {
        config.headers["x-auth-token"] = token;
    }
    return config;
};
