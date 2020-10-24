
/*
import React from "react";
import classes from './DialogItem.module.css';
import {NavLink} from "react-router-dom";

const DialogItem = (props) =>{
   // console.log(props);
    let path='/message/';
    let dialog = props.dataDialogs.map(d=>
        <div key={d.id} className={classes.dialog}>
            <img src={d.img} alt=""/>
            <NavLink to={path + d.id}> {d.name} </NavLink>
        </div>
    );

    return( <div>{dialog} </div> )

};
export default  DialogItem;*/