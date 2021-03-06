import React, { useState } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import { Redirect } from "react-router-dom";

const contactData = (props) => {
    const [orderForm, setOrderForm] = useState({
        name: {
            elementType: "input",
            elementConfig: {
                type: "text",
                // placeholder: "Your Name",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        street: {
            elementType: "input",
            elementConfig: {
                type: "text",
                // placeholder: "Street",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        phone: {
            elementType: "input",
            elementConfig: {
                type: "text",
                // placeholder: "Phone",
            },
            value: "",
            validation: {
                required: true,
                minLength: 5,
                maxLength: 5,
            },
            valid: false,
            touched: false,
        },
        email: {
            elementType: "input",
            elementConfig: {
                type: "email",
                // placeholder: "Your Email",
            },
            value: "",
            validation: {
                required: true,
            },
            valid: false,
            touched: false,
        },
        deliveryMethod: {
            elementType: "select",
            elementConfig: {
                options: [
                    { value: "fastest", displayValue: "Fastest" },
                    { value: "cheapest", displayValue: "Cheapest" },
                ],
                placeholder: "ZIP Code",
            },
            validation: { required: false },
            value: "fastest",
            valid: true,
            touched: false,
        },
    });

    const [formIsValid, setFormIsValid] = useState(false);

    const orderHandler = (event) => {
        event.preventDefault();

        const formData = {};
        for (let formElementIdentifier in orderForm) {
            formData[formElementIdentifier] =
                orderForm[formElementIdentifier].value;
        }

        const ingredients = props.ings;
        const price = props.price;

        //   push new order

        const order = {
            userId: props.auth.user._id,
            ingredients: ingredients,
            price: price.toFixed(2),
            orderData: formData,
        };

        console.log(order);
        props.onOrderBurger(order);
        // props.history.push("/");
    };

    const checkVaildity = (value, rules) => {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== "" && isValid;
        }
        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }
        console.log(value);
        return isValid;
    };

    const inputChangedHandle = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...orderForm,
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = checkVaildity(
            updatedFormElement.value,
            updatedFormElement.validation
        );
        updatedOrderForm[inputIdentifier] = updatedFormElement;
        updatedFormElement.touched = true;

        let formIsValid = true;

        for (let key in updatedOrderForm) {
            formIsValid = updatedOrderForm[key].valid && formIsValid;
        }

        console.log(updatedFormElement);
        setOrderForm(updatedOrderForm);
        setFormIsValid(formIsValid);
    };


    const iconHandler = (itemName) => {
        switch(itemName) {
            case 'name':
              return (<i className="fa fa-user-edit"></i>);

            case 'street':
                return (<i className="fa fa-home"></i>); 
            case 'phone':
                return (<i className="fa fa-phone-alt"></i>);
            case 'email':
                return (<i className="fa fa-envelope"></i>);
            case 'deliveryMethod':
                return (<i className="fa fa-car-side"></i>);
            default:
              return null;
          } 
    }

    const formElementsArray = [];
    for (let key in orderForm) {
        formElementsArray.push({
            id: key,
            config: orderForm[key],
        });
    }

    let form = null;

    if (props.loading) {
        form = <Spinner />;
    } else if (!props.auth.isAuthenticated) {
        form = <Redirect to={"/auth"} />;
    } else {
        form = (
            <form onSubmit={orderHandler}>
                <h1>Order Info</h1>
                <div className={classes.InputContainer}>
                    {formElementsArray.map((formElement) => {
                        return (
                            <div className={classes.InputContainer}>
                                <label>{formElement.id}</label>
                                {iconHandler(formElement.id)}
                                <Input
                                    key={formElement.id}
                                    elementType={formElement.config.elementType}
                                    elementConfig={
                                        formElement.config.elementConfig
                                    }
                                    value={formElement.value}
                                    invalid={!formElement.config.valid}
                                    changed={(event) =>
                                        inputChangedHandle(
                                            event,
                                            formElement.id
                                        )
                                    }
                                    touched={formElement.config.touched}
                                >
                                </Input>
                            </div>
                        );
                    })}
                </div>

                <div className={classes.buttonsContainer}>
                    <Button btnType="Order_Contact" disabled={!formIsValid}>
                        ORDER
                    </Button>
                    <Button
                        type="button"
                        btnType="Cancle_Contact"
                        clicked={props.cancle}
                    >
                        CANCLE
                    </Button>
                </div>
            </form>
        );
    }

    return <div className={classes.ContactData}>{form}</div>;
};

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        auth: state.auth,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onOrderBurger: (orderData) =>
            dispatch(actions.purchaseBurger(orderData)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(contactData);
