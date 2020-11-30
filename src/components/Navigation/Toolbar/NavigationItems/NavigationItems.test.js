import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import burgerBuilderReducer from "../../../../store/reducers/burgerBuilder";
import thunk from "redux-thunk";
import orderReducer from "../../../../store/reducers/order";
import authReducer from "../../../../store/reducers/auth";
import errorReducer from "../../../../store/reducers/error";
import { Provider } from "react-redux";

// import { loadUser } from "./store/actions/auth";

const rootReducer = combineReducers({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer,
    error: errorReducer,
});

const composeEnhancer =
    process.env.NODE_ENV === "development"
        ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
        : null || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

configure({ adapter: new Adapter() });

describe("<NavigationItems/>", () => {
    it("should render two <NavigationItem/> element if not authenticated", () => {
        const wrapper = shallow(
            <Provider store={store}>
                <NavigationItems />
            </Provider>
        );
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
});
