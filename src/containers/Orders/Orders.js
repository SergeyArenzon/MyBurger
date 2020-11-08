
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

        


        return(
            <div>
                <Order/>
                <Order/>
            </div>
        );
    }
}

export default Orders;