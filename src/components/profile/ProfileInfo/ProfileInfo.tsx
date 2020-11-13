import React, {ChangeEvent, useState} from "react";
import classes from './ProfileInfo.module.css';
import Preloader from "../../Preloader/Preloader";
import face from "../../../img/icons/user.jpg";
import ProfileStatusHook from "./ProfileStatusHook";
import ProfileData from "./ProfileData";
import ProfileDataReduxForm from "./ProfileDataForm";
import {profileType} from "../../../redux/types/types";

type propsType={
    profile: profileType|null
    status: string
    updateStatus:(status:string)=>void
    clickUserId:boolean
    savePhoto:(file:File)=>void
    saveProfile:(profile:profileType)=>void
}


const ProfileInfo:React.FC<propsType> = ({profile, status, updateStatus,clickUserId,savePhoto, saveProfile }) =>{

    let [editMode, setEditMode] = useState(false);
    const activeEditeMode = () =>{
        setEditMode(true)
    };
    const deActivateEditMode =() => {
        setEditMode(false);
    };
    if(!profile){
        return <Preloader/>
    }
    const PhotoSelected= (e:ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.length){//e.target.files? если files есть, берем доину
            savePhoto (e.target.files[0])
        }
    };
    const onSubmit = async (formData:profileType) => {// сюда придут данные из формы, передаем эту  функцию в LoginReduxForm чтоб получить эти данные из формы
         await  saveProfile(formData);// для остановки отправки формы в случае ошибки
            deActivateEditMode();
    };

    return(
            <div className={classes.flexBlock}>
                    <div className={classes.itemImg}>
                        <img src={profile.photos.large||face} alt="фото пользователя"/>
                            {
                               ( clickUserId ) && <label className={classes.input_btn} htmlFor="input__file" ><input  id="input__file"  onChange={PhotoSelected} type ="file"/> загрузить фото </label>
                            }
                    </div>
                    <div className={classes.itemInfo}>
                            <ProfileStatusHook
                                status={status}
                                updateStatus={updateStatus}
                                clickUserId = {clickUserId}
                            />
                            { editMode
                                ? <ProfileDataReduxForm profile = {profile} onSubmit = {onSubmit} initialValues = {profile}
                                />
                                : <ProfileData profile = {profile}
                                               clickUserId = {clickUserId}
                                               activeEditeMode = {activeEditeMode}
                                />
                            }
                    </div>
            </div>
    )
};
export  default  ProfileInfo;
//initialValues = {profile}