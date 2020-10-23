import React from "react";
import classes from './Users.module.css';
import {NavLink} from "react-router-dom";
import face from "../../../img/icons/user.jpg";
import {photoType} from "../../../redux/types/types";
type massUsersPropsType={
    id:number|null
    name:string|null
    status?:string|null
    photos:photoType
    followed?:boolean
    mess?: string|null
}

type propsType={
    massUsers: Array<massUsersPropsType>
}
const Users:React.FC<propsType> = ({massUsers}) =>{

    //console.log(props);
    //let path='/dialogs/';
    let dialog = massUsers.map(d=>
        <div key={d.id} className={classes.dialog}>
            <NavLink to={'/profile/' + d.id}> <img src={ d.photos.small||face} alt=""/></NavLink>
             <b>{d.name} </b>
            <span>{d.mess||d.status}</span>

        </div>
    );

    return( <div>{dialog} </div> )

};
export  default  Users;