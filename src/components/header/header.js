import React from "react";
import classes from './header.module.css';
import logo from "../../img/logoChef.png";
import Navbar from "./Navbar/Navbar";
import NavblockAPI from "./Navblock/NavblockAPI";

const Header = () =>{
    return(
        <div className={classes.header}>
            <div className={classes.img}>
                <img src={logo} alt="logotype" />
             </div>

            <div className={classes.nav}>
                    <Navbar/>
                    <NavblockAPI/>
            </div>
        </div>
    );
};
export default Header;