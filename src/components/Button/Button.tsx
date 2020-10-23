import React from "react";
import classes from './Button.module.css';

type propsType={
    color?:string
    value:string
    onClick?:()=>void
}

const Button:React.FC<propsType> = ({color, value, onClick}) =>{
    return(
        <div>
            <button color={color} className={classes.btn} onClick={onClick}> {value} </button>
        </div>
    )
};
export  default  Button;