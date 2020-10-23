import React from "react";
import classes from './AllUsers.module.css';
import {NavLink} from "react-router-dom";
import face from "../../img/icons/user.jpg";
import cn from "classnames";
import {usersType} from "../../redux/types/types";
//позволяет перечислять классы через запятую, а также вставлять условие для отображения того или иного класса


type propsType ={
    users: Array <usersType>
    isFollowingProgress: Array<number>
    unFollowThunkCreator:(id:number) => void
    followThunkCreator:(id:number) => void
}


const OneUser:React.FC<propsType> = ({users,isFollowingProgress,unFollowThunkCreator,followThunkCreator}) =>{
    return(

        <div>
            {users.map(u =>
            <div key={u.id} className={cn (classes.dialog)}>
                <div className={classes.blockFoto}>
                    <NavLink to ={'/profile/' + u.id} > <img src={u.photos.small != null ? u.photos.small : face} alt={""}/> </NavLink>  <br/>
                    {u.followed
                        ?  <button disabled={isFollowingProgress.some(id=>id===u.id)}
                                   onClick= {() => {unFollowThunkCreator(u.id) }}> Отписаться </button>  //props.unfollow(u.id) - диспатчим в редьюсер
                        :  <button disabled={isFollowingProgress.some(id=>id===u.id)}
                                   onClick={() => {followThunkCreator(u.id)}}> Подписаться </button>
                    }
                </div>
                <div className={classes.blockName}>
                    <span><b>{u.name}</b></span> <br/>
                    <span className={classes.status}>{u.status}</span>
                </div>


            </div>)}
        </div>
    )
};
export  default OneUser;