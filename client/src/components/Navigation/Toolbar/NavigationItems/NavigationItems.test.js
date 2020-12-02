import React from 'react';

import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';
import { Provider } from 'react-redux';
import authReducer from "../../../../store/reducers/auth";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    // burgerBuilder: burgerBuilderReducer,
    // order: orderReducer,
    auth: authReducer,
    // error: errorReducer,
});

const composeEnhancer = process.env.NODE_ENV === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;
const store = createStore(rootReducer, composeEnhancer(applyMiddleware(thunk)));

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Provider store={store}><NavigationItems /></Provider>);
    });

    it('should render two <NavigationItem /> elements if not authenticated', () => {
        expect(wrapper.contains(<NavigationItem>25555</NavigationItem>)).toEqual(true);
    });

    // it('should render three <NavigationItem /> elements if authenticated', () => {
    //     // wrapper = shallow(<NavigationItems isAuthenticated />);
    //     wrapper.setProps({isAuthenticated: true});
    //     expect(wrapper.find(NavigationItem)).toHaveLength(3);
    // });

    // it('should an exact logout button', () => {
    //     wrapper.setProps({isAuthenticated: true});
    //     expect(wrapper.contains(<NavigationItem link="/logout">Logout</NavigationItem>)).toEqual(true);
    // });
});