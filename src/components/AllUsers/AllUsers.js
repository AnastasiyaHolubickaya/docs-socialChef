import React from "react";
import classes from './AllUsers.module.css';
import Preloader from "../Preloader/Preloader";
import Pagination from "./Pagination";
import OneUser from "./OneUser";


let Search = (props) =>{
    return ( <div className={classes.searchUsers}>
        <div className={classes.title}>
            <h1>Пользователи</h1>
        </div>
        <div className={classes.search}>
            <input className={classes.inputSearch} type="text" placeholder='введите имя'/>
            <button className={classes.buttonSearch}> поиск</button>
        </div>
    </div>)
};

let Counter = (props) =>{
    return  (<div className={classes.counterUsers}>
        <span className={classes.text}>всего пользователей</span>
        <span className={classes.numbers}>{props.userCount}</span>
    </div>)
};


const AllUsers = (props) =>{
    //console.log(props);
    return(
        <div className={classes.usersPage}>
            <Search/>
            <Counter userCount = {props.userCount}/>
            <Pagination
                userCount = {props.userCount}
                pageSize = {props.pageSize}
                onPageChange = {props.onPageChange}
                currentPage = {props.currentPage}
            />
            {props.isFetching ? <Preloader/> : null}
            <OneUser
                 users = {props.users}
                 isFollowingProgress = {props.isFollowingProgress}
                 unFollowThunkCreator = {props.unFollowThunkCreator}
                 followThunkCreator = {props.followThunkCreator}
            />
            <button className={classes.btnShowMore}>Показать еще</button>
        </div>
    )
};
export  default AllUsers;