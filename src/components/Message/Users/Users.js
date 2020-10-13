import React from "react";
import classes from './Users.module.css';
import {NavLink} from "react-router-dom";
import face from "../../../img/icons/user.jpg";

const Users = ({massUsers}) =>{

    //console.log(props);
    let path='/dialogs/';
    let dialog = massUsers.map(d=>
        <div key={d.id +=1 } className={classes.dialog}>
             <img src={ d.photos.small||face} alt=""/>
            <NavLink to={path + d.id}> <b>{d.name} </b>  </NavLink>
            <span>{d.mess||d.status}</span>

        </div>
    );

    return( <div>{dialog} </div> )

};
export  default  Users;