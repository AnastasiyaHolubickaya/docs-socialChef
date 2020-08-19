import React from "react";
import classes from './Navblock.module.css';
import {NavLink} from "react-router-dom";

const Navblock = (props) =>{



    return(
        <div className={classes.block}>
            <div className={classes.item1}>
                <span> register</span>
            </div>
            <div className={classes.item2}>
                {props.isAuth
                    ? <div>
                        <span> Привет, {props.login}</span>
                         <button onClick={props.LogoutThunkCreator}>Выход</button>

                      </div>
                    : <NavLink to='/login'>Login</NavLink>}

            </div>
            <div className={classes.item3}>
               <span><NavLink to={`/profile/`+ props.userId}> Мой профиль </NavLink></span>

            </div>
        </div>
    );
};
export default Navblock;