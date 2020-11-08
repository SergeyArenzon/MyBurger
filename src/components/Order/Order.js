import React from 'react';
import classes from './Order.module.css';


const order = (props) => {

    const ingredients = [];
    

    
    Object.keys(props.ingredients).forEach(function(ingKey) {
        ingredients.push(ingKey + '(' + props.ingredients[ingKey] + ')' );
      });

    const street = props.address[0];
    const postalCode = props.address[1];

    const name = props.name;
    const price = props.price;
    const email = props.email;

    return(  
        <div className={classes.Order}>
            <p>Ingredients: {ingredients}</p>
            <p>price:{price}</p>
        </div>
        );
  
};

export default order;