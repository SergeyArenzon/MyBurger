import React, { Component } from "react";
import Button from "../../../components/UI/Button/Button";
import classes from "./ContactData.module.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/index";
import Authentication from "../../Auth/Auth";

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
            userId: this.props.auth.user._id,
            ingredients: ingredients,
            price: price.toFixed(2),
            orderData: formData,
        };

        console.log(order);
        this.props.onOrderBurger(order);
        // this.props.history.push("/");
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

        if (this.props.loading) {
            console.log('---------------spinner-------------------')
            form = <Spinner />;
        } else if (!this.props.auth.isAuthenticated) {
            form = <Authentication />;
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

export default connect(mapStateToProps, mapDispatchToProps)(ContactData);
