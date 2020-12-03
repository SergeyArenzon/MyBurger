import React, { Component } from "react";
import "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
import Orders from "./containers/Orders/Orders";
import { Route, Switch } from "react-router-dom";
import Auth from "./containers/Auth/Auth";
import { loadUser } from "./store/actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.store.dispatch(loadUser());
    }

    render() {
        
        return (
            <div>
                <Layout>
                    <Switch>
                        <Route path="/" exact component={BurgerBuilder} />
                        <Route path="/checkout" component={Checkout} />
                        <Route path="/auth" component={Auth} />
                        <Route path="/orders" component={Orders} />
                    </Switch>
                </Layout>
            </div>
        );
    }
}

export default App;
