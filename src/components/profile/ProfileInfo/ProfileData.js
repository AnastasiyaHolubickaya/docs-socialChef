import React from "react";
import classes from './ProfileInfo.module.css';
import facebook from "../../../img/social_icons/facebook_101791.svg";
import youtube from "../../../img/social_icons/youtube_101764.svg";
import twitter from "../../../img/social_icons/twitter_101809.svg";
import github from "../../../img/social_icons/github_101792.svg";
import instagram from "../../../img/social_icons/instagram_101780.svg";
import vk from "../../../img/social_icons/vk_101783.svg";
import Button from "../../Button/Button";
import cn from "classnames";
import styled from "styled-components";


const StyledLink = styled.a `
  color: #17030C;
  font-size: 12px;
  text-decoration: none;
  :hover {
    color: #F704F2;
    cursor: pointer;
  }
`;

const massIcon = [
    {id: 1, name: "facebook",src: facebook},
    {id: 2, name: "youtube",src: youtube},
    {id: 3, name: "twitter", src: twitter},
    {id: 4, name: "github", src: github},
    {id: 5, name: "vk", src: vk},
    {id: 6, name: "instagram", src: instagram}
];
 const ViewSocialIcons = ({title, value}) => {
    return  massIcon.map(item =>
        (item.name === title)
            && <div key = {item.id}> <img src={item.src} alt={""}/> <b><StyledLink target="_blank" href={value}> {value} </StyledLink> </b></div>
    );


};


const ProfileData = ({profile, clickUserId, activeEditeMode}) =>{

    return(
            <div className={classes.dataBlock}>
                        <p>{profile.fullName}</p>
                        <div className={classes.gridBlock}>
                             <b> Обо мне: </b>
                             <span className={cn (classes.spanItem)}>
                                 {profile.aboutMe}
                            </span>
                            <b>Ищу работу: </b>
                              <span className={cn(classes.spanItem)}>
                                  {profile.lookingForAJob ? "да" : "нет"}
                              </span>
                            <b>Навыки: </b>
                            <span className={cn(classes.spanItem)}> {profile.lookingForAJobDescription}</span>


                        </div>
                    <div className={classes.socialIcons}>
                        {
                            Object.keys(profile.contacts).map(key =>
                                (profile.contacts[key] != "" && profile.contacts[key] != null )
                                && <ViewSocialIcons key={key} title = {key} value = {profile.contacts[key]} />

                                )
                        }
                    </div>
                        {clickUserId && <Button value={"редактировать"} onClick={activeEditeMode}/> }

            </div>
    )
};

export  default  ProfileData;