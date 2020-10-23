import React from "react";
import classes from './Login.module.css';
import {Field, reduxForm} from "redux-form";//инсталируем redux form - npm install redux-form   в store.ts комбайним редаксовский редьюсер
import {Input} from "../commons/FormControls/FormControls";
import {maxLengthCreator, requiredField} from "../../utils/validation/validator";
import {connect} from "react-redux";
import { LoginThunkCreator} from "../../redux/authReducer"
import {Redirect} from "react-router-dom";
import Button from "../Button/Button";
import {AppStateType} from "../../redux/store";

type loginFormTypeProps={
    handleSubmit: any
    error: string
    captchaUrl?: string|null
}
type mapStatePropsType ={
    captchaUrl?: string|null
    isAuth: boolean
}
type mapDispatchPropsType={
    LoginThunkCreator:(email:string, password:string, rememberMe:boolean, captchaUrl:string|null)=>void
}
type ownPropsType={}
type propsType= mapStatePropsType & mapDispatchPropsType & ownPropsType;

const maxLength30 = maxLengthCreator(30);
const maxLength10 = maxLengthCreator(20);

const LoginForm:React.FC<loginFormTypeProps> = ({handleSubmit,error, captchaUrl }) =>{
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
                        <Field name={'captcha'} type="text"
                               component={Input}
                               validate={[requiredField, maxLength10]}/>
                    </div>
                }
                <div className={classes.loginFormButton}> <Button value = "Войти"/> </div>
            </form>
    )
};
// reduxForm - функция редаксформ, которая возвращает hoc - в нашем случае LoginReduxForm, которая инкапсулирует в себе всю работу со стейтом
const LoginReduxForm = reduxForm({//контейнерная компонента,созда-
    // a unique name for the form
    //каждая форма должна иметь уникальное строковое имя (для распознавания ее редаксформом)
    form: 'login'//form: - это название не связано с form из store.ts
})(LoginForm);//-ется редаксформ над презентационной компонентой

const Login:React.FC<propsType> = ({isAuth, captchaUrl, LoginThunkCreator}) =>{
    const onSubmit = (formData:any) => {// сюда придут данные из формы, передаем эту  функцию в LoginReduxForm чтоб получить эти данные из формы
        //console.log(formData);
        LoginThunkCreator(formData.email, formData.password, formData.rememberMe, formData.captchaUrl )//отправляем взятые из формы данные на сервер
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

                />
            </div>
        </div>

    )
};
const mapStateToProps =  (state:AppStateType):mapStatePropsType => ({
    isAuth: state.auth.isAuth,
    captchaUrl: state.auth.captchaUrl
});

export  default connect <mapStatePropsType, mapDispatchPropsType, ownPropsType, AppStateType> (
    mapStateToProps,
    {LoginThunkCreator}) (Login);

//captchaUrl = {captchaUrl}