import React from "react";
import classes from './profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/myPostsContainer";


const Profile = (props) =>{
   // console.log(props.file);
    return(

        <div className={classes.profilePage}>

            <ProfileInfo
                profile={props.profile}
                status={props.status}
                updateStatus={props.updateStatus}
                clickUserId = {props.clickUserId}
                savePhoto = {props.savePhoto}

            />
            <MyPostsContainer />

        </div>

    )
};
export  default  Profile;