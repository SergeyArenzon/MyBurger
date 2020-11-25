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

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    // User loading
    dispatch({ type: actionTypes.USER_LOADING });

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

    axios
        .get("http://localhost:5000/auth/user", config)
        .then((res) => {
            dispatch({
                type: actionTypes.USER_LOADED,
                payload: res.data,
            });
        })
        .catch((err) => {
            console.log('--------------------')
            console.log(err)
            console.log("--------------------");
            dispatch(returnErrors(err.response.data, err.response.status));
            dispatch({ type: actionTypes.AUTH_ERROR });
        });
};
