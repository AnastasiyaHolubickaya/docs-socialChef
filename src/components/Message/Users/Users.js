import React from "react";
import classes from './Users.module.css';
import {NavLink} from "react-router-dom";

const Users = (props) =>{
    //console.log(props);
    let path='/dialogs/';
    let dialog = props.dataDialogs.map(d=>
        <div key={d.id} className={classes.dialog}>
            <img src={d.img} alt=""/>
            <NavLink to={path + d.id}> <b>{d.name} </b>  </NavLink>
            <span>{d.mess}</span>
        </div>
    );

    return( <div>{dialog} </div> )

};
export  default  Users;