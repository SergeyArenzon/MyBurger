import React from 'react';
import classes from './Order.module.css';


const order = (props) => (
    <div className={classes.Order}>
        <p>Ingredients: salad: 1</p>
        <p>price:10</p>
    </div>
);

export default order;