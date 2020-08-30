import React, {useState} from "react";
import classes from './ProfileInfo.module.css';

import Preloader from "../../Preloader/Preloader";
import face from "../../../img/icons/user.jpg";
import ProfileStatusHook from "./ProfileStatusHook";
import ProfileData from "./ProfileData";
import ProfileDataReduxForm from "./ProfileDataForm";



const ProfileInfo = ({profile, status, updateStatus,clickUserId,savePhoto, saveProfile }) =>{

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
    const PhotoSelected = (e) => {
        if (e.target.files.length){
            savePhoto (e.target.files[0])
        }

    };
    const onSubmit =  (formData) => {// сюда придут данные из формы, передаем эту  функцию в LoginReduxForm чтоб получить эти данные из формы
       saveProfile(formData).then( () => {// для остановки отправки формы в случае ошибки
           deActivateEditMode();
           }
       );
       //debugger
    };
    return(

            <div className={classes.flexBlock}>
                    <div className={classes.itemImg}>
                        <img src={profile.photos.large||face} alt=""/>
                            {
                               ( clickUserId ) && <input className={classes.input_btn} onChange={PhotoSelected}  type ="file"/>
                            }
                    </div>
                    <div className={classes.itemInfo}>
                            <ProfileStatusHook
                                status={status}
                                updateStatus={updateStatus}
                                profile = {profile}
                                clickUserId = {clickUserId}
                            />
                            { editMode
                                ? <ProfileDataReduxForm profile = {profile}
                                                        onSubmit = {onSubmit}
                                                        initialValues = {profile}
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
/*
Object.keys(profile.contacts).map(key =>{

 return <WidgetForm key={key} title = {key} value = {profile.contact[key]} />)
 }
*/
