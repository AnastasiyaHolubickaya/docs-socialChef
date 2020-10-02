import React from "react";
import classes from "./MySubscriptions.module.css";
import cn from "classnames";
import {NavLink} from "react-router-dom";
import face from "../../../img/icons/user.jpg";


const MySubscriptions = ({usersFollowed}) =>{




    return(
        <div className={classes.block}>
            <h3> Мои подписки:</h3>
                <div className={classes.blockSubscriptions}>
                    {usersFollowed.map(u =>
                        <div key={u.id} className={cn (classes.item)}>
                            <NavLink to ={'/profile/' + u.id} > <img src={u.photos.small != null ? u.photos.small : face} alt={"Фото пользователя"+ u.name}/> </NavLink>
                            <br/><span>{u.name}</span>
                        </div>)}
                </div>
        </div>
    )
};
export  default  MySubscriptions;