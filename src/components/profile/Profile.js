import React from "react";
import classes from './profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/myPostsContainer";


const Profile = (props) =>{
    return(

        <div className={classes.profilePage}>

            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
            />
            <MyPostsContainer />

        </div>

    )
};
export  default  Profile;