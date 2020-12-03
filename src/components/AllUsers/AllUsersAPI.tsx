import React from "react";
import {AllUsers} from "./AllUsers";



type OwnProps={}


const AllUsersPage:React.FC<OwnProps> = (props)=>{

    return <>
        <AllUsers />
    </>
};

export default AllUsersPage

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
/*
let mapStateToProps = (state) => {
    return{
        users: state.usersPage.users,
        pageSize: state.usersPage.pageSize,
        usersCount: state.usersPage.usersCount,
        currentPage: state.usersPage.currentPage,
        isFetching: state.usersPage.isFetching,
        isFollowingProgress: state.usersPage.isFollowingProgress
    }
};*/