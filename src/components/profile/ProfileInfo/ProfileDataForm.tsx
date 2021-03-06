import React from "react";
import classes from "./ProfileDataForm.module.css";
import {Input, Textarea} from "../../commons/FormControls/FormControls";
import {maxLengthCreator, requiredField} from "../../../utils/validation/validator";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import Button from "../../Button/Button";
import {profileType} from "../../../redux/types/types";


type ownPropsType={
    profile:profileType
}


const maxLength20 = maxLengthCreator(20);
const maxLength200 = maxLengthCreator(200);

const ProfileForm:React.FC<InjectedFormProps<profileType, ownPropsType> & ownPropsType> = ({handleSubmit, profile, error}) => {
    return (
        <form onSubmit={handleSubmit} className={classes.profileForm} >
                <span className={classes.spanForm}> Редактирование профиля</span>
                <b className={classes.bForm}>Введите имя</b>
                <Field name={'fullName'}
                       component={Input}
                       validate={[requiredField, maxLength20]}/>
                <b className={classes.bForm}> O себе</b>
                <Field name={'aboutMe'}
                       component={Textarea}
                       validate={[requiredField, maxLength200]}/>
                <b className={classes.bForm}> Профессиональные навыки </b>
                <Field name={'lookingForAJobDescription'} placeholder={'введите текст'}
                       component={Textarea}
                       validate={[requiredField, maxLength200]}/>
                <b className={classes.bForm}>Ищу работу:
                     <Field name={'lookingForAJob'}
                            type="checkbox"
                            component={'input'} />
                </b>
                <div className={classes.socialIcons}>
                    {
                        Object.keys(profile.contacts).map(key =>{
                            return <div key={key}>
                                <b className={classes.bForm}>{key}
                                    <Field name={'contacts.'+ key}
                                           component={Input} /></b>
                                    </div>
                        })
                    }
                </div>
            {
                error && <div className={classes.formSummaryError}> {error}</div>
            }
             <Button value = "Сохранить" />
        </form>
    )
};


const ProfileDataReduxForm = reduxForm<profileType, ownPropsType>({
        form: 'profile'//form: - это название не связано с form из store.ts
    })(ProfileForm);//-ется редаксформ над презентационной компонентой


export  default ProfileDataReduxForm;



