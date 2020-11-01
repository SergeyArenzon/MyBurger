import React, { Component } from 'react';
import './App.module.css';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import {BrowserRouter as Router, Route} from 'react-router-dom';

class App extends Component {
  render() {
    return (
        <div>
          <Layout>
            <BurgerBuilder/>
          </Layout>
        </div>
    );
  }
}

export default App;
