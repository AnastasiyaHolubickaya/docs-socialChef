/*
import AllUsersAPI from "./AllUsersAPI";
import {connect} from "react-redux";
import {
    follow, getUsersThunkCreator,
    setCurrentPage,
    setToggleIsFetching, setToggleIsFollowing,
    setUsers,
    setUsersCount,
    unfollow
} from "../../redux/usersReducer";


let mapStateToProps = (state) => {
    return{
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        usersCount: state.usersPage.usersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingProgress: state.usersPage.isFollowingProgress
    }
};

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (userId) =>{
            dispatch (follow(userId));
        },
        unfollow: (userId) =>{
            dispatch (unfollow(userId));
        },
        setUsers: (users) => {
            dispatch(setUsers(users));
        },
        setCurrentPage:(pageNumber) =>{
            dispatch(setCurrentPage (pageNumber));
        },
        setUsersCount:(usersCount) =>{
            dispatch(setUsersCount (usersCount));
        },
        setToggleIsFetching:(isFetching) =>{
            dispatch(setToggleIsFetching(isFetching));
        }
    }
};

*/