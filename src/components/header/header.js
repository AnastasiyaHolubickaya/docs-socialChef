import React from "react";
import classes from './header.module.css';
import logo from "../../img/hotpng.com (2).png";
import Navbar from "./Navbar/Navbar";
import {connect} from "react-redux";
import {LogoutThunkCreator} from "../../redux/authReducer";
import Navblock from "./Navblock/Navblock";
import LoginBlock from "./LoginBlock";

const Header = ({menuItems, isAuth, login, LogoutThunkCreator}) =>{
    return(
        <div className={classes.g}>
        <div className={classes.header}>
            <div className={classes.img}>
                <img src={logo} alt="logotype" />
             </div>

            <div className={classes.nav}>
                <div className={classes.quote}>
                   <i>"Не волнуйтесь, если что-то не работает. Если бы всё работало, вас бы уволили..." </i>
                </div>
                    <Navbar menuItems={menuItems}/>
                     <Navblock isAuth={isAuth}
                               login={login}
                               LogoutThunkCreator={LogoutThunkCreator}
                     />
            </div>

        </div>
            <div className={classes.loginBlock}>
                <LoginBlock isAuth={isAuth}
                          login={login}
                          LogoutThunkCreator={LogoutThunkCreator}
                />
            </div>
</div>
    );
};

let mapStateToProps = (state)  =>({
    menuItems: state.headerMenu.menuItems,
    isAuth: state.auth.isAuth,
    login: state.auth.login
});


export default connect (mapStateToProps, { LogoutThunkCreator}) (Header);