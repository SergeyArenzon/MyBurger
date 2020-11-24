import * as actionTypes from "./actionTypes";
import axios from "axios";

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START,
    };
};

export const authSuccess = (idToken, userId) => {
    console.log(idToken)
    return {
        type: actionTypes.AUTH_SUCCESS,
        token: idToken,
        userId: userId,
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error,
    };
};

export const auth = (email, password, isSignup) => {
    return (dispatch) => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true,
        };
        let url =
            "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAFFfCTRipxD7F1H5c2T0TtG34d16RZbrQ";
        if (!isSignup) {
            url =
                "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAFFfCTRipxD7F1H5c2T0TtG34d16RZbrQ";
        }
        axios
            .post(url, authData)
            .then((response) => {
                console.log(response);
                dispatch(
                    authSuccess(response.data.idToken, response.data.localId)
                );
            })
            .catch((err) => {
                console.log(err.response);
                dispatch(authFail(err.response));
            });
    };
};
