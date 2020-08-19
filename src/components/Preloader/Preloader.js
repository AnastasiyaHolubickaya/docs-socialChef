import React from "react";
import classes from './Preloader.module.css';
import preloader from "../../img/327.gif";

const Preloader = () =>{
    return(
        <div className={classes.block}>
            <img src={preloader} alt="preloader"/>
        </div>
    )
};
export  default  Preloader;