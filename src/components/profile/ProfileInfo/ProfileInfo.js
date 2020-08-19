import React from "react";
import classes from './ProfileInfo.module.css';
import fb from "../../../img/social_icons/facebook_101791.svg";
import yt from"../../../img/social_icons/youtube_101764.svg"
import tw from "../../../img/social_icons/twitter_101809.svg"
import inst from "../../../img/social_icons/instagram_101780.svg"
import gh from "../../../img/social_icons/github_101792.svg"
import vk from "../../../img/social_icons/vk_101783.svg"
import Preloader from "../../Preloader/Preloader";



import face from "../../../img/icons/user.jpg";
import ProfileStatusHook from "./ProfileStatusHook";


const ProfileInfo = ({profile, status, updateStatus}) =>{

    if(!profile){
        return <Preloader/>
    }
    return(

            <div className={classes.block}>

                    <div className={classes.itemImg}>
                        {
                            (profile.photos.large!== null)
                                    ?<img src={profile.photos.large} alt=""/>
                                    :<img src={face} alt=""/>
                        }

                    </div>
                    <div className={classes.itemInfo}>
                    <p>{profile.fullName}</p>
                    <ProfileStatusHook
                        status={status}
                        updateStatus={updateStatus}
                        profile = {profile}/>
                        <div className={classes.socialIcons}>
                        {
                            (profile.contacts.facebook != null||'')?
                        <div>
                            <img src={fb} alt=""/>
                            <b> {profile.contacts.facebook}</b>
                        </div>: null
                        }
                        {(profile.contacts.youtube != null||'')?
                        <div>
                            <img src={yt} alt=""/>
                            <b> {profile.contacts.youtube}</b>
                        </div>: null}

                        { (profile.contacts.twitter != null||'')?
                            <div>
                            <img src={tw} alt=""/>
                            <b> {profile.contacts.twitter}</b>
                        </div>:null}
                        {   (profile.contacts.github != null||'')?
                            <div>
                            <img src={gh} alt=""/>
                            <b> {profile.contacts.github}</b>
                        </div>:null}

                        {   (profile.contacts.instagram != null||'')?
                            <div>
                                <img src={inst} alt=""/>
                                <b> {profile.contacts.instagram}</b>
                            </div>:null}
                        {   (profile.contacts.vk != null||'')?
                            <div>
                                <img src={vk} alt=""/>
                                <b> {profile.contacts.vk}</b>
                            </div>:null}

                    </div>
                </div>
            </div>

    )
};
export  default  ProfileInfo;