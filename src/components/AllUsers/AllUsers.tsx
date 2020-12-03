import React, {useEffect} from "react";
import classes from './AllUsers.module.css';
import Preloader from "../Preloader/Preloader";
import Pagination from "./Pagination";
import OneUser from "./OneUser";
import SearchFormik from "../Formik/SearchFormik/SearchFormik";
import {filterType, followThunkCreator, getUsersThunkCreator, unFollowThunkCreator} from "../../redux/usersReducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getIsFetching, getIsFollowingProgress,
    getPageSize,
    getUsers,
    getUsersCount,
    getUsersFilter
} from "../../redux/usersSelectors";

type counterPropsType={
    userCount:number
}
type propsType ={

}

let Counter:React.FC<counterPropsType> = ({userCount}) =>{
    return  (<div className={classes.counterUsers}>
        <span className={classes.text}>всего пользователей</span>
        <span className={classes.numbers}>{userCount}</span>
    </div>)
};

export const AllUsers:React.FC<propsType> = () =>{
    useEffect(()=>{
        dispatch(getUsersThunkCreator(currentPage,pageSize,filter ));
        },[]);// пустая зависимость означает сделать что-то когда компонента вмонтировалась ( componentDidMount())


// hook useSelector принимает selectors (фукции достающие из state данные)
    const users = useSelector(getUsers);
    const isFollowingProgress = useSelector(getIsFollowingProgress);
    const  userCount = useSelector(getUsersCount);
    const  currentPage = useSelector(getCurrentPage);
    const pageSize = useSelector(getPageSize);
    const filter = useSelector(getUsersFilter);
    const isFetching = useSelector(getIsFetching);
    const dispatch = useDispatch();

    const onPageChange = (pageNumber:number) =>{
        //const {pageSize, filter} = this.props;
        // this.props.getCurrentPage(pageNumber);
        dispatch(getUsersThunkCreator(pageNumber,pageSize,filter));
    };
    const onFilterChange = (filter:filterType) => {
        dispatch (getUsersThunkCreator(1,pageSize,filter));
        console.log(filter.name)
    };
    const follow = (id:number)=>{
        dispatch(followThunkCreator(id));
    };
    const unFollow = (id:number)=>{
        dispatch(unFollowThunkCreator(id));
    };

    return(
        <div className={classes.usersPage}>
            <div> <h2>Все зарегистрированные пользователи</h2></div>
            <Counter userCount = {userCount}/>
            <SearchFormik search={onFilterChange}
            />
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
                 unFollowThunkCreator = {unFollow}
                 followThunkCreator = {follow}
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
