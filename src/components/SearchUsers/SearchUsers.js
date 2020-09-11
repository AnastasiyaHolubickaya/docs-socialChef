import classes from "../Message/Message.module.css";
import React from "react";



const SearchUsers = (props) =>{
    return ( <div className={classes.searchUsers}>

        <div className={classes.search}>
            <input className={classes.inputSearch} type="text" placeholder='введите имя'/>
            <button className={classes.buttonSearch}> поиск</button>
        </div>
    </div>)
};

export  default SearchUsers;