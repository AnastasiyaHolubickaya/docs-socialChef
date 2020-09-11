import React from "react";
import classes from './Navblock.module.css';
import {NavLink} from "react-router-dom";
import cn from "classnames";
import Button from "../../Button/Button";

const Navblock = ({isAuth, login, LogoutThunkCreator }) =>{



    return(

            <div className={classes.block}>
                <div className={cn (classes.itemsSize, classes.item1)}>
                    <span><NavLink className={classes.link} to='/register'>регистрация</NavLink> </span>
                </div>
                <div className={cn (classes.itemsSize, classes.item2)}>
                    {isAuth
                        ? <div>
                            <span> Привет, {login}</span>
                             <Button  value={"Выход"} onClick={LogoutThunkCreator}><NavLink to={`/users`}> </NavLink></Button>

                          </div>
                        : <NavLink className={classes.link} to='/login'>Вход</NavLink>}

                </div>
                <div className={cn (classes.itemsSize, classes.item3)}>
                   <span><NavLink className={classes.link} to={`/profile`}> профиль </NavLink></span>

                </div>
            </div>


    );
};
export default Navblock;