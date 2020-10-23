import React from "react";
import classes from './profile.module.css';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./myPosts/myPostsContainer";
import MySubscriptions from "./MySubscriptions/MySubscriptions";
import {profileType, usersType} from "../../redux/types/types";

type propsType={
    profile: profileType
    status: string|null,
    userId: number|null,
    updateStatus:(status:string)=>void
    usersFollowed:Array<usersType>
    clickUserId:boolean
    savePhoto:(file:any)=>void
    saveProfile:(profile:profileType)=>{resultCode:number}
}

const Profile:React.FC<propsType> = ({profile, status, updateStatus,clickUserId,savePhoto,saveProfile,usersFollowed}) =>{
   // console.log(props.file);
    return(

        <div className={classes.profilePage}>

            <ProfileInfo
                profile={profile}
                status={status}
                updateStatus={updateStatus}
                clickUserId = {clickUserId}
                savePhoto = {savePhoto}
                saveProfile = {saveProfile}

            />
            <MySubscriptions
                usersFollowed = {usersFollowed}
            />
            <MyPostsContainer />

        </div>

    )
};
export  default  Profile;