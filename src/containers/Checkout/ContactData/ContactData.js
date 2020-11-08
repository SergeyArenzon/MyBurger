import React, { Component } from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.module.css';
import axios from 'axios';
import Spinner from '../../../components/UI/Spinner/Spinner';


class ContactData extends Component {
    state = {
        name: '',
        email: '',
        address: {
            street: '',
            postalCode: ''
        },
        ordered: false
    }
    componentDidMount () {
        console.log(this.props)
    }

    orderHandler = ( event ) => {
        event.preventDefault();
        this.setState({ordered: true})

        const ingredients = this.props.ingredients;
        const price = this.props.price;
            

        const orderSchema = orderSchema;
        //   push new order 
        
        const order = {
            ingredients : ingredients,
            price: price,
            name: this.state.name,
            email: this.state.email,
            address: {
                street: this.state.address.street,
                zipCode: this.state.address.postalCode
            }
        }
        
        // alert(this.state.name)
        
        axios.post('http://localhost:5000/orders/add', order)
            .then(response => {
                this.setState({loading: false, purchasing: false});
                this.props.history.push('/');

                
            })
            .catch(error => {
                this.setState({loading: false, purchasing: false});
                console.log(error)
            })

    }



    render() {
        let ordered = (
            <div>
                <h4>Enter contact data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" onChange={(event) => this.setState({name: event.target.value})} />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" onChange={(event) => this.setState({email: event.target.value})}/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street" onChange={(event) => this.setState({address: {street: event.target.value, postalCode: this.state.address.postalCode}})}/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal" onChange={(event) => this.setState({address: {postalCode: event.target.value, street: this.state.address.street}})}/>
                    <Button 
                    btnType="Success"
                    clicked={this.orderHandler}>
                        ORDER
                    </Button>
                </form>
            </div>   
        );

        if(this.state.ordered) {
            ordered = <Spinner/>
        }

        return(
            <div className={classes.ContactData}>
                {/* <h4>Enter contact data</h4>
                <form>
                    <input className={classes.Input} type="text" name="name" placeholder="Your Name" onChange={(event) => this.setState({name: event.target.value})} />
                    <input className={classes.Input} type="email" name="email" placeholder="Your Email" onChange={(event) => this.setState({email: event.target.value})}/>
                    <input className={classes.Input} type="text" name="street" placeholder="Street" onChange={(event) => this.setState({address: {street: event.target.value}})}/>
                    <input className={classes.Input} type="text" name="postal" placeholder="Postal" onChange={(event) => this.setState({address: {postalCode: event.target.value}})}/>
                    <Button 
                    btnType="Success"
                    clicked={this.orderHandler}>
                        ORDER
                    </Button>
                </form> */}

                { ordered }
            </div>
        );
    }
}

export default ContactData;