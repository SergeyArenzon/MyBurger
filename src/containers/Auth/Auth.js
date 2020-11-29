import React, { Component } from "react";
import Input from "../../components/UI/Input/Input";
import Button from "../../components/UI/Button/Button";
import classes from "./Auth.module.css";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Spinner from "../../components/UI/Spinner/Spinner";
import { register, logout, login } from "../../store/actions/auth";
import { Redirect } from "react-router-dom";

class Auth extends Component {
    state = {
        signupMode: false,
        error: "",
        controls: {
            name: {
                elementType: "input",
                elementConfig: {
                    type: "text",
                    placeholder: "Full Name",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 1,
                },
                valid: false,
                touched: false,
            },
            email: {
                elementType: "input",
                elementConfig: {
                    type: "email",
                    placeholder: "Mail Address",
                },
                value: "",
                validation: {
                    required: true,
                    isEmail: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: "input",
                elementConfig: {
                    type: "password",
                    placeholder: "Password",
                },
                value: "",
                validation: {
                    required: true,
                    minLength: 6,
                },
                valid: false,
                touched: false,
            },
        },
    };

    componentDidMount() {
        // Check if Logout pressed
        if (this.props.isAuthenticated) {
            this.props.onLogoutSubmit();
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.error !== this.props.error) {
            if (this.props.error.id === "REGISTER_FAIL") {
                this.setState({ error: this.props.error });
            } else {
                this.setState({ error: null });
            }
        }
    }

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
        return isValid;
    };

    inputChangedHandler = (event, controlName) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkVaildity(
                    event.target.value,
                    this.state.controls[controlName].validation
                ),
                touched: true,
            },
        };
        // console.log(this.state.controls.password)
        this.setState({ controls: updatedControls });
    };

    submitHandler = (event) => {
        event.preventDefault();
        if (this.state.signupMode) {
            const registrationInfo = {
                name: this.state.controls.name.value,
                email: this.state.controls.email.value,
                password: this.state.controls.password.value,
            };
            this.props.onRegisterSubmit(registrationInfo);
        } else if (!this.state.signupMode) {
            const loginInfo = {
                email: this.state.controls.email.value,
                password: this.state.controls.password.value,
            };
            this.props.onLoginSubmit(loginInfo);
        }
    };

    switchAuthModeHandler = () => {
        this.setState((prevState) => {
            return { signupMode: !prevState.signupMode };
        });
    };

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let form = formElementsArray.map((formElement) => {
            if (this.state.signupMode || !(formElement.id === "name")) {
                return (
                    <Input
                        key={formElement.id}
                        elementType={formElement.config.elementType}
                        elementConfig={formElement.config.elementConfig}
                        value={formElement.config.value}
                        invalid={!formElement.config.valid}
                        shouldValidate={formElement.config.validation}
                        touched={formElement.config.touched}
                        changed={(event) =>
                            this.inputChangedHandler(event, formElement.id)
                        }
                    />
                );
            }
        });

        // if (this.props.loading) {
        //     form = <Spinner />;
        // }
        let errorMessage = null;
        if (this.state.error) {
            errorMessage = <p>{this.state.error.msg.msg}</p>;
        }

        return (
            <div className={classes.Auth}>
                {/* Redirect when successfull register */}
                {this.props.isAuthenticated ? <Redirect to="/" /> : null}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType={"Success"}>SUBMIT</Button>
                </form>

                <Button btnType="Danger" clicked={this.switchAuthModeHandler}>
                    SWITCH TO {this.state.signupMode ? "SIGNIN" : "SIGNUP"}
                </Button>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        error: state.error,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onRegisterSubmit: (registrationInfo) =>
            dispatch(register(registrationInfo)),
        onLogoutSubmit: () => dispatch(logout()),
        onLoginSubmit: (loginInfo) => dispatch(login(loginInfo)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
