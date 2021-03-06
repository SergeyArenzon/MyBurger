import React from "react";
import classes from "./BuildControls.module.css";
import BuildControl from "./BuildControl/BuildControl";
import HomeButton from "../../UI/Button/HomeButton";
import Title from '../../UI/Title/Title';

const controls = [
    { label: "Mayo", type: "mayo" },
    { label: "Tomato", type: "tomato" },
    { label: "Cucumber", type: "cucumber" },
    { label: "Lettuce", type: "lettuce" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" },
    { label: "Onion", type: "onion" },
];

const buildControls = (props) => {
    let fixedPrice = props.price.toFixed(2);
    if (fixedPrice < 0) {
        fixedPrice = 0;
    }

    return (
        <div className={classes.BuildControls}>
            <Title>BUILD <p>YOUR</p> <p>BURGER</p></Title>
            <div>
                Price: <strong>{fixedPrice}&#36;</strong>
            </div>
            {controls.map((ctrl) => (
                <BuildControl
                    key={ctrl.label}
                    label={ctrl.label}
                    added={props.ingredientAdded}
                    removed={props.ingredientRemoved}
                    type={ctrl.type}
                    disabled={props.disabled[ctrl.type]}
                ></BuildControl>
            ))}
            <HomeButton disabled={!props.purchasable} click={props.ordered}>
                Order Now!
            </HomeButton>
        </div>
    );
};

export default buildControls;
