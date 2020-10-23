import React from "react";
import classes from './AllUsers.module.css';
import Preloader from "../Preloader/Preloader";
import Pagination from "./Pagination";
import OneUser from "./OneUser";
import SearchUsersContainer from "../SearchUsers/SearchUsersContainer";
import {usersType} from "../../redux/types/types";

type counterPropsType={
    userCount:number
}
type propsType ={
    userCount:number
    pageSize:number
    onPageChange:(pageNumber:number)=>void
    currentPage: number
    isFetching:boolean
    users:Array <usersType>
    isFollowingProgress:Array<number>
    unFollowThunkCreator:(id:number) => void
    followThunkCreator:(id:number) => void
}

let Counter:React.FC<counterPropsType> = ({userCount}) =>{
    return  (<div className={classes.counterUsers}>
        <span className={classes.text}>всего пользователей</span>
        <span className={classes.numbers}>{userCount}</span>
    </div>)
};

const AllUsers:React.FC<propsType> = ({userCount,pageSize,onPageChange,currentPage,isFetching, users,  isFollowingProgress,unFollowThunkCreator, followThunkCreator }) =>{
    return(
        <div className={classes.usersPage}>
            <SearchUsersContainer/>
            <Counter userCount = {userCount}/>
            <Pagination
                userCount = {userCount}
                pageSize = {pageSize}
                onPageChange = {onPageChange}
                currentPage = {currentPage}
            />
            {isFetching ? <Preloader/> : null}
            <OneUser
                 users = {users}
                 isFollowingProgress = {isFollowingProgress}
                 unFollowThunkCreator = {unFollowThunkCreator}
                 followThunkCreator = {followThunkCreator}
            />
            <Pagination
                userCount = {userCount}
                pageSize = {pageSize}
                onPageChange = {onPageChange}
                currentPage = {currentPage}
            />
        </div>
    )
};
export  default AllUsers;