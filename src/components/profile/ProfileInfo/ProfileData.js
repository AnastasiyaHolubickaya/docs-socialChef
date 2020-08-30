import React from "react";
import classes from './ProfileInfo.module.css';
import facebook from "../../../img/social_icons/facebook_101791.svg";
import youtube from "../../../img/social_icons/youtube_101764.svg";
import twitter from "../../../img/social_icons/twitter_101809.svg";
import github from "../../../img/social_icons/github_101792.svg";
import instagram from "../../../img/social_icons/instagram_101780.svg";
import vk from "../../../img/social_icons/vk_101783.svg";
import Button from "../../Button/Button";

const massIcon = [
    {name: "facebook",src: facebook},
    {name: "youtube",src: youtube},
    {name: "twitter", src: twitter},
    {name: "github", src: github},
    {name: "vk", src: vk},
    {name: "instagram", src: instagram}
];
 const ViewSocialIcons = ({title, value}) => {
    return  massIcon.map(item =>
        item.name === title &&
            <div key = {item}> <img src={item.src} alt={""}/> <b>{value}</b></div>

    );


};


const ProfileData = ({profile, clickUserId, activeEditeMode}) =>{

    return(
            <div>
                <p>{profile.fullName}</p>
                <div>
                     <b> Обо мне:</b>
                     <span className={classes.spanItem}>
                         {profile.aboutMe}
                    </span>
                    <br/>

                    <b>Ищу работу: </b>
                      <span className={classes.spanItem}>
                          {profile.lookingForAJob ? "да" : "нет"}
                      </span> <br/>
                    {profile.lookingForAJob &&
                       <span> <b>Навыки:</b> {profile.lookingForAJobDescription}</span>
                    }
                </div>
        <div className={classes.socialIcons}>

            {
                Object.keys(profile.contacts).map(key =>{
                    return <ViewSocialIcons key={key} title = {key} value = {profile.contacts[key]} />
                })
            }


        </div>
                {clickUserId && <Button value={"редактировать профиль"} onClick={activeEditeMode}/> }

</div>
    )
};

export  default  ProfileData;