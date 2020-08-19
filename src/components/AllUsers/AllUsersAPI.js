import React from "react";

import AllUsers from "./AllUsers";

import {connect} from "react-redux";
import {
    follow, followThunkCreator, getUsersThunkCreator,
    setCurrentPage,
    setToggleIsFollowing,
    unfollow, unFollowThunkCreator
} from "../../redux/usersReducer";
import {
    getCurrentPage,
    getIsFetching,
    getIsFollowingProgress,
    getPageSize,
    getUsers,
    getUsersCount
} from "../../redux/usersSelectors";





class AllUsersAPI extends  React.Component{
  /*  constructor (props) {
        super(props);
    }*/
        componentDidMount(){
            const {currentPage, pageSize}= this.props;
             this.props.getUsersThunkCreator(currentPage,pageSize );
        }
        onPageChange = (pageNumber) =>{
            const {pageSize} = this.props;
            this.props.setCurrentPage(pageNumber);
            this.props.getUsersThunkCreator(pageNumber,pageSize );
        };


    render() {

       return <>

            <AllUsers
               userCount = {this.props.usersCount}
                pageSize = {this.props.pageSize}
               currentPage = {this.props.currentPage}
               onPageChange = {this.onPageChange}
               users = {this.props.users}
               unfollow = {this.props.unfollow}
               follow = {this.props.follow}
               isFetching = {this.props.isFetching}
               isFollowingProgress = {this.props.isFollowingProgress}
               followThunkCreator = {this.props.followThunkCreator}
               unFollowThunkCreator = {this.props.unFollowThunkCreator}

           />

       </>
    }



}
/*let mapStateToProps = (state) => {
    return{
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        usersCount: state.usersPage.usersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingProgress: state.usersPage.isFollowingProgress
    }
};*/
let mapStateToProps = (state) => {
    return{
        users: getUsers(state),// getUsersReselect(state)
        pageSize: getPageSize(state),
        usersCount: getUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isFollowingProgress: getIsFollowingProgress(state)
    }
};


export default connect (mapStateToProps,
    {follow, unfollow, setCurrentPage, setToggleIsFollowing,
        getUsersThunkCreator, followThunkCreator, unFollowThunkCreator}) (AllUsersAPI);

/*
const AllUsers = (props) =>{
//console.log(props.users);
    if(props.users.length === 0){
        axios.get('https://social-network.samuraijs.com/api/1.0/users').then(response => {
            console.log (response);
            //debugger;
            props.setUsers(response.data.items);
        } );
    }

        let user = props.users.map(u =>
        <div key={u.id} className={classes.dialog}>
            <div className={classes.blockFoto}>
                <img src={u.photos.small != null ? u.photos.small : face} alt={""}/> <br/>
                {u.followed ? <button onClick= {() => {props.unfollow(u.id)}}> UnFollow </button> : <button onClick={() => {props.follow(u.id)}}> Follow </button>}
            </div>
            <div className={classes.blockName}>
                <span><b>{u.name}</b></span> <br/>
                <span className={classes.status}>{u.status}</span>
            </div>
            <div>
                <span>{"u.locations.city"}</span> <br/>
                <span>{"u.locations.country"}</span>
            </div>

        </div>);

    return (
        <div className={classes.usersPage}>
            <Search/>
            <Counter/>
            {user}
            <button className={classes.btnShowMore}>Показать еще</button>
        </div>
    )
};

*/