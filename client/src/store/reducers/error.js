import * as actionTypes from "../actions/actionTypes";

const initialState = {
    msg: {},
    status: null,
    id: null,
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ERROR:
            return {
                msg: action.payload.msg,
                status: action.payload.status,
                id: action.payload.id,
            };
        case actionTypes.CLEAR_ERROR:
            return {
                msg: null,
                status: null,
                id: null,
            };
        default:
            return state;
    }
};

export default reducer;
