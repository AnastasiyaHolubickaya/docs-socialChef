import React from "react";
import classes from './AllUsers.module.css';
import {NavLink} from "react-router-dom";
import face from "../../img/icons/user.jpg";

const OneUser = ({users,isFollowingProgress,unFollowThunkCreator,followThunkCreator, ...props}) =>{



    return(

        <div>
            {users.map(u =>
            <div key={u.id} className={classes.dialog}>
                <div className={classes.blockFoto}>
                    <NavLink to ={'/profile/' + u.id} > <img src={u.photos.small != null ? u.photos.small : face} alt={""}/> </NavLink>  <br/>
                    {u.followed
                        ?  <button disabled={isFollowingProgress.some(id=>id===u.id)}
                                   onClick= {() => {unFollowThunkCreator(u.id) }}> UnFollow </button>  //props.unfollow(u.id) - диспатчим в редьюсер
                        :  <button disabled={isFollowingProgress.some(id=>id===u.id)}
                                   onClick={() => {followThunkCreator(u.id)}}> Follow </button>
                    }
                </div>
                <div className={classes.blockName}>
                    <span><b>{u.name}</b></span> <br/>
                    <span className={classes.status}>{u.status}</span>
                </div>
                <div>
                    <span>{"u.locations.city"}</span> <br/>
                    <span>{"u.locations.country"}</span>
                </div>

            </div>)}
        </div>
    )
};
export  default OneUser;