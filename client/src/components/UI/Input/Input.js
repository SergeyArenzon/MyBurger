import React from "react";
import classes from "./Input.module.css";

const input = (props) => {
    let inputElement = null;

    const inputClasses = [classes.InputElement];
    // console.log("props.invalid", props.invalid);
    // console.log(props.invalid, props.touched)
    if (props.invalid && props.touched) {
        inputClasses.push(classes.Invalid);
    }
    switch (props.elementType) {
        case "input":
            inputElement = (
                <input
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case "textarea":
            inputElement = (
                <textarea
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
            break;
        case "select":
            inputElement = (
                <select
                    className={inputClasses.join(" ")}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                >
                    {props.elementConfig.options.map((option) => {
                        return (
                            <option key={option.value} value={option.value}>
                                {option.displayValue}
                            </option>
                        );
                    })}
                </select>
            );
            break;
        default:
            inputElement = (
                <input
                    className={classes.InputElement}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed}
                />
            );
    }

    return (
        <div className={classes.Input}>
            {props.children}
            <label className={classes.Label}>{props.label}</label>
            {inputElement}
            {props.label === 'email' ? <i class="fa fa-envelope" ></i> : null }
            {props.label === 'password' ? <i class="fa fa-unlock-alt"></i>: null }
            {props.label === 'name' ? <i className="fa fa-user-friends"></i>: null }
        </div>
    );
};

export default input;
