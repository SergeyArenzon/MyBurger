
import axios from 'axios';
import React, { Component } from 'react';
import Order from '../../components/Order/Order';


class Orders extends Component {
    state = {
        orders: []
    }


    componentDidMount () {
        axios.get("http://localhost:5000/orders")
            .then((res) => {
                console.log(res);
                this.setState({orders: res.data})
            })
            .catch(err => {
                console.log(err);
            })
    }


    render () {
        const orders = (
            <ul>
                {this.state.orders.map(order => {
                    
                    return  <li key={order._id}>
                                <Order 
                                ingredients={order.ingredients}
                                address={order.address}
                                name={order.name}
                                email={order.email}
                                price={order.price}/>
                            </li>
                })}
            </ul>
        )
        

        return(
            <div>
                { orders }
            </div>
        );
    }
}

export default Orders;