import React, {  useEffect, Suspense } from "react";
import "./App.module.css";
import Layout from "./hoc/Layout/Layout";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Checkout from "./containers/Checkout/Checkout";
// import Orders from "./containers/Orders/Orders";
import { Route, Switch, Redirect } from "react-router-dom";
// import Auth from "./containers/Auth/Auth";
import { loadUser } from "./store/actions/auth";
import { connect } from "react-redux";

// class App extends Component {
//     componentDidMount() {
//         this.props.store.dispatch(loadUser());
//     }

//     render() {

//         return (
//             <div>
//                 <Layout>
//                     <Switch>
//                         <Route path="/" exact component={BurgerBuilder} />
//                         <Route path="/checkout" component={Checkout} />
//                         <Route path="/auth" component={Auth} />
//                         <Route path="/orders" component={Orders} />
//                     </Switch>
//                 </Layout>
//             </div>
//         );
//     }
// }

// const Checkout = React.lazy(() => {
//   return import("./containers/Checkout/Checkout");
// });

const Orders = React.lazy(() => {
  return import("./containers/Orders/Orders");
});

const Auth = React.lazy(() => {
  return import("./containers/Auth/Auth");
});

const app = (props) => {
  useEffect(() => {
    props.store.dispatch(loadUser());
  }, []);

  let routes = (
    <Switch>
      <Route path="/auth" render={() => <Auth />} />
      <Route path="/checkout" component={Checkout} />
      <Route path="/" exact component={BurgerBuilder} />
      <Redirect to="/" />
    </Switch>
  );

  if (props.isAuthenticated) {
    routes = (
      <Switch>
        <Route path="/" exact component={BurgerBuilder} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/orders" render={() => <Orders />} />
      </Switch>
    );
  }

  return (
    // <div>
    //   <Layout>
    //     <Switch>
    //       <Route path="/" exact component={BurgerBuilder} />
    //       <Route path="/checkout" component={Checkout} />
    //       <Route path="/auth" component={Auth} />
    //       <Route path="/orders" component={Orders} />
    //     </Switch>
    //   </Layout>
    // </div>

    <Layout>
      <Suspense fallback={<p>Loading...</p>}>{routes}</Suspense>
    </Layout>
  );
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error,
    isLoading: state.auth.isLoading,
  };
};

export default connect(mapStateToProps)(app);
