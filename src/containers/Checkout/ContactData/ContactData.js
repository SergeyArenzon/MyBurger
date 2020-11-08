import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        }
    }


    orderHandler = ( event ) => {
        event.preventDefault();
        const ingredients = this.props.ingredients;
        const price = this.props.price;
            
        //   push new order 
        
        // const order = {
        //     ingredients : ingredients,
        //     price: null,
        //     name: '',
        //     email: '',
        //     address: {
        //         street: '',
        //         zipCode: ''
        //     }
        // }
        
        // alert(this.state.name)
        
        // axios.post('http://localhost:5000/orders/add', order)
        //     .then(response => {
        //         this.setState({loading: false, purchasing: false});
        //         console.log(response.data)
        //     })
        //     .catch(error => {
        //         this.setState({loading: false, purchasing: false});
        //         console.log(error)
        //     })

    }



    render() {
            return(
                <div className={classes.ContactData}>
                    <h4>Enter contact data</h4>
                    <form>
                        <input className={classes.Input} type="text" name="name" placeholder="Your Name" onChange={(event) => this.setState({name: event.target.value})} />
                        <input className={classes.Input} type="email" name="email" placeholder="Your Email"/>
                        <input className={classes.Input} type="text" name="street" placeholder="Street"/>
                        <input className={classes.Input} type="text" name="postal" placeholder="Postal"/>
                        <Button 
                        btnType="Success"
                        clicked={this.orderHandler}>
                            ORDER
                        </Button>
                    </form>
                </div>
            );
        }
}

export default ContactData;