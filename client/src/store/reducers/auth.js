// import * as actionTypes from "../actions/actionTypes";
// import { updateObject } from "../utility";

// const initialState = {
//     token: null,
//     userId: null,
//     error: null,
//     loading: false,
// };

// const authStart = (state, action) => {
//     return updateObject(state, { error: null, loading: true });
// };

// const authSuccess = (state, action) => {
//     return updateObject(state, {
//         token: action.token,
//         userId: action.userId,
//         error: null,
//         loading: false,
//     });
// };

// const authFail = (state, action) => {
//     return updateObject(state, { error: action.error, loading: false });
// };

// const authLogout = (state, action) => {
//     return updateObject(state, { token: null, userId: null });
// };

// const reducer = (state = initialState, action) => {
//     switch (action.type) {
//         case actionTypes.AUTH_START:
//             return authStart(state, action);
//         case actionTypes.AUTH_SUCCESS:
//             return authSuccess(state, action);
//         case actionTypes.AUTH_FAIL:
//             return authFail(state, action);
//         case actionTypes.AUTH_LOGOUT:
//             return authLogout(state, action);
//         default:
//             return state;
//     }
// };

// export default reducer;

import * as actionsType from "../actions/actionTypes";

const initialState = {
    token: localStorage.getItem("token"),
    isAuthenticated: null,
    isLoading: false,
    user: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionsType.USER_LOADING:
            return {
                ...state,
                isLoading: true,
            };
        case actionsType.USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload,
            };
        case actionsType.LOGIN_SUCCESS:
        case actionsType.REGISTER_SUCCESS:
            console.log('------------')
            console.log(action.payload)
            console.log('------------')
            localStorage.setItem('token', action.payload.token);            
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false,
            };
        case actionsType.AUTH_ERROR:
        case actionsType.LOGIN_FAIL:
        case actionsType.LOGOUT_SUCCESS:
        case actionsType.REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false,
            };

        default:
            return state;
    }
};

export default reducer;
