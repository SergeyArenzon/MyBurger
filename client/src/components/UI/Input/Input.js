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
                    onChange={props.changed}git push heroku master
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
        <div>
            <label className={classes.Lable}>{props.lable}</label>
            {inputElement}
        </div>
    );
};

export default input;
