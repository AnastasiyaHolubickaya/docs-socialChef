import React from "react";
import classes from './Login.module.css';
import {Field, InjectedFormProps, reduxForm} from "redux-form";//инсталируем redux form - npm install redux-form   в store.ts комбайним редаксовский редьюсер
import {CreateField, getStringKeys, Input} from "../commons/FormControls/FormControls";
import {maxLengthCreator, requiredField} from "../../utils/validation/validator";
import {useDispatch, useSelector} from "react-redux";
import { LoginThunkCreator} from "../../redux/authReducer"
import {Redirect} from "react-router-dom";
import Button from "../Button/Button";
import {AppStateType} from "../../redux/store";


type ownPropsType={
    captchaUrl?: string|null
}
type propsType=  ownPropsType;

const maxLength30 = maxLengthCreator(30);
const maxLength10 = maxLengthCreator(20);

const LoginForm:React.FC<InjectedFormProps<formDataType>& ownPropsType> = ({handleSubmit,error,captchaUrl}) =>{

    //handleSubmit - колбек функция, приходящая в пропсы LoginForm из reduxForm,
// вешаем ее на событие onSubmit
//  в ней происходят:
//  e.preventDefault,
//  сбор всех данных с полей формы (упаковываются в объект),
// вызов  props.onSubmit(formData)
    return(
            <form className={classes.loginForm} onSubmit={handleSubmit}>

                <div className={classes.loginFormInput}><Field name={'email'} placeholder={'email'}// Field поля формы reduxform
                            component={Input}
                            validate={[requiredField, maxLength30]}/></div>
                <div className={classes.loginFormInput}><Field name={'password'} placeholder={'password'} type="password"
                            component={Input}
                            validate={[requiredField, maxLength10]}/></div>
                <div className={classes.loginFormRememberMe}><Field name={'rememberMe'} type="checkbox"
                            component={'input'} /> <b>запомнить меня</b></div>
               {
                 error && <div className={classes.formSummaryError}> {error}</div>
               }
                {captchaUrl &&
                    <div>
                        <img src={captchaUrl} alt="captcha"/>
                        {CreateField<formDataKeysProps>(undefined, "captchaUrl",
                        [requiredField],Input, {type:"text"})}
                    </div>
                }
                <div className={classes.loginFormButton}> <Button value = "Войти"/> </div>
            </form>
    )
};
// reduxForm - функция редаксформ, которая возвращает hoc - в нашем случае LoginReduxForm, которая инкапсулирует в себе всю работу со стейтом
const LoginReduxForm = reduxForm<formDataType, ownPropsType>({//контейнерная компонента,созда-
    // a unique name for the form
    //каждая форма должна иметь уникальное строковое имя (для распознавания ее редаксформом)
    form: 'login'//form: - это название не связано с form из store.ts
})(LoginForm);//-ется редаксформ над презентационной компонентой
type formDataType={
    captchaUrl: string
    rememberMe: boolean
    password: string
    email: string
}
type formDataKeysProps= getStringKeys <formDataType>// получаем объект ключей ( Extract - означает берем только (в нашем случае) string):  captchaUrl,rememberMe,password,email. (урок 8 (2), время 1.08.58))

export const Login:React.FC<propsType> = () =>{

    const  captchaUrl = useSelector((state:AppStateType) => state.auth.captchaUrl);
    const isAuth = useSelector((state:AppStateType) => state.auth.isAuth);
    const dispatch = useDispatch();


    const onSubmit = (formData:formDataType) => {// сюда придут данные из формы, передаем эту  функцию в LoginReduxForm чтоб получить эти данные из формы
        //console.log(formData);
        dispatch (LoginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captchaUrl ))//отправляем взятые из формы данные на сервер
    };
    if(isAuth){
        return  <Redirect to = {`/profile`}/>
    }
    return(
        <div className={classes.wrapperBlockForm}>
            <div className={classes.blockForm}>
                <h1>Вход в аккаунт</h1>
                <LoginReduxForm
                    onSubmit = {onSubmit}
                    captchaUrl={captchaUrl}
                />
            </div>
        </div>

    )
};




//рисуем форму с исполтзованием собственной функции CreateField
// LoginForm...
//form...
//{CreateField <formDataKeysProps>("email", "login", [requiredField], Input)}
//{CreateField <formDataKeysProps>("password", "password", [requiredField], Input,{type:"password"})}
//{CreateField <formDataKeysProps>(undefined, "rememberMe", [], Input,{type:"checkbox"},"remember me")}