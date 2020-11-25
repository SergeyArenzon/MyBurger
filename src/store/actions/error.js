import axios from "axios";

import * as actionTypes from "./actionTypes";

//  Return errors

export const returnErrors = (msg, status, id = null) => {
    return {
        type: actionTypes.GET_ERROR,
        payload: { msg, status, id },
    };
};

// Clear error
export const clearErrors = () => {
    return {
        type: actionTypes.CLEAR_ERROR,
    };
};
