import React from "react";
import classes from './Button.module.css';

const Button = (props) =>{
    return(
        <div className={classes}>
            <button className={classes.btn} onClick={props.onClick}> {props.value} </button>
        </div>
    )
};
export  default  Button;