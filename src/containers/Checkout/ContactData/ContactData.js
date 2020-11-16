import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import axios from "axios";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";

class ContactData extends Component {
    state = {
        orderForm: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Your Name",
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
                    placeholder: "Street",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            zipCode: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "ZIP Code",
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
            country: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Country",
                },
                value: "",
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Your Email",
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
        },
        loading: false,
        formIsValid: false,
    };
    componentDidMount() {
        console.log("[ContactData componentDidMount]");
    }
    componentDidUpdate() {
        console.log("[ContactData componentDidUpdate]");
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });

        const formData = {};
        for (let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[
                formElementIdentifier
            ].value;
        }

        const ingredients = this.props.ings;
        const price = this.props.price;

        //   push new order

        const order = {
            ingredients: ingredients,
            price: price,
            orderData: formData,
        };

        console.log(order);

        axios
            .post("http://localhost:5000/orders/add", order)
            .then((response) => {
                this.setState({ loading: false, purchasing: false });
                this.props.history.push("/");
            })
            .catch((error) => {
                this.setState({ loading: false, purchasing: false });
                console.log(error);
            });
    };

    checkVaildity = (value, rules) => {
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

    inputChangedHandle = (event, inputIdentifier) => {
        const updatedOrderForm = {
            ...this.state.orderForm,
        };

        const updatedFormElement = {
            ...updatedOrderForm[inputIdentifier],
        };
        updatedFormElement.value = event.target.value;
        updatedFormElement.valid = this.checkVaildity(
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

        this.setState({
            orderForm: updatedOrderForm,
            formIsValid: formIsValid,
        });
    };
    render() {
        const formElementsArray = [];
        for (let key in this.state.orderForm) {
            formElementsArray.push({
                id: key,
                config: this.state.orderForm[key],
            });
        }
        let form = null;

        if (this.state.loading) {
            form = <Spinner />;
        } else {
            form = (
                <form onSubmit={this.orderHandler}>
                    {formElementsArray.map((formElement) => {
                        return (
                            <Input
                                key={formElement.id}
                                elementType={formElement.config.elementType}
                                elementConfig={formElement.config.elementConfig}
                                value={formElement.value}
                                invalid={!formElement.config.valid}
                                changed={(event) =>
                                    this.inputChangedHandle(
                                        event,
                                        formElement.id
                                    )
                                }
                                touched={formElement.config.touched}
                            />
                        );
                    })}

                    <Button
                        btnType="Success"
                        disabled={!this.state.formIsValid}
                    >
                        ORDER
                    </Button>
                </form>
            );
        }

        return <div className={classes.ContactData}>{form}</div>;
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.ingredients,
        price: state.totalPrice,
    };
};

export default connect(mapStateToProps)(ContactData);
