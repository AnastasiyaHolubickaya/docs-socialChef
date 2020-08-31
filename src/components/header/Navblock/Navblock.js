import React from "react";
import classes from './Navblock.module.css';
import {NavLink} from "react-router-dom";

const Navblock = (props) =>{



    return(
        <div className={classes.block}>
            <div className={classes.item1}>
                <span> </span>
            </div>
            <div className={classes.item2}>
                {props.isAuth
                    ? <div>
                        <span> Привет, {props.login}</span>
                         <button onClick={props.LogoutThunkCreator}><NavLink to={`/users`}> Выход</NavLink></button>

                      </div>
                    : <NavLink to='/login'>Вход</NavLink>}

            </div>
            <div className={classes.item3}>
               <span><NavLink to={`/profile`}> Мой профиль </NavLink></span>

            </div>
        </div>
    );
};
export default Navblock;