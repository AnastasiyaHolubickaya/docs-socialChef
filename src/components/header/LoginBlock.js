import React from "react";
import classes from './LoginBlock.module.css';
import {NavLink} from "react-router-dom";
import cn from "classnames";
import Button from "../Button/Button";

const LoginBlock = ({isAuth, login, LogoutThunkCreator }) =>{



    return(

        <div className={classes.block}>

            <div className={cn (classes.items)}>
                {isAuth
                    ? <div>
                        <span> hi, {login}</span>
                        <Button value={"выход"} onClick={LogoutThunkCreator}><NavLink to={`/users`}> Выход</NavLink></Button>

                    </div>
                    : <NavLink className={classes.link} to='/login'>Вход</NavLink>}

            </div>
            <div className={cn (classes.items)}>
                <span><NavLink className={classes.link} to={`/profile`}> профиль </NavLink></span>

            </div>
            <div className={cn (classes.items)}>
                <span> <b> регистрация</b>  </span>
            </div>

        </div>


    );
};
export default LoginBlock;