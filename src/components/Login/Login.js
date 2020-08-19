import React from "react";
import classes from './Login.module.css';
//инсталируем redux form - npm install redux-form
// в store.js комбайним редаксовский редьюсер
import {Field, reduxForm} from "redux-form";
import {Input} from "../commons/FormControls/FormControls";
import {maxLengthCreator, requiredField} from "../../utils/validation/validator";
import {connect} from "react-redux";
import { LoginThunkCreator} from "../../redux/authReducer"
import {Redirect} from "react-router-dom";
// Field поля формы reduxform

const maxLength30 = maxLengthCreator(30);
const maxLength10 = maxLengthCreator(20);

const LoginForm = (props) =>{
//handleSubmit - колбек функция, приходящая в пропсы LoginForm из reduxForm,
// вешаем ее на событие onSubmit
//  в ней происходят:
//  e.preventDefault,
//  сбор всех данных с полей формы (упаковываются в объект),
// вызов  props.onSubmit(formData)
    return(
            <form onSubmit={props.handleSubmit}>
                <div><Field name={'email'} placeholder={'email'}
                            component={Input}
                            validate={[requiredField, maxLength30]}/></div>
                <div><Field name={'password'} placeholder={'password'} type="password"
                            component={Input}
                            validate={[requiredField, maxLength10]}/></div>
                <div><Field name={'rememberMe'} type="checkbox"
                            component={'input'} /> запомнить меня</div>
               {
                 props.error && <div className={classes.formSummaryError}> {props.error}</div>
               }
                <div> <button>Login</button></div>
            </form>
    )
};
// reduxForm - функция редаксформ, которая возвращает hoc - в нашем случае LoginReduxForm, которая инкапсулирует в себе всю работу со стейтом
const LoginReduxForm = reduxForm({//контейнерная компонента,созда-
    // a unique name for the form
    //каждая форма должна иметь уникальное строковое имя (для распознавания ее редаксформом)
    form: 'login'//form: - это название не связано с form из store.js
})(LoginForm);//-ется редаксформ над презентационной компонентой

const Login = (props) =>{
    const onSubmit = (formData) => {// сюда придут данные из формы, передаем эту  функцию в LoginReduxForm чтоб получить эти данные из формы
        props.LoginThunkCreator(formData.email, formData.password, formData.rememberMe )//отправляем взятые из формы данные на сервер
    };
    if(props.isAuth){
        return  <Redirect to = {`/profile/`+ props.userId}/>
    }
    return(
        <div className={classes}>
            <h1>login</h1>
            <LoginReduxForm onSubmit = {onSubmit}/>
        </div>
    )
};
const mapStateToProps =  (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId
});
export  default connect (mapStateToProps, {LoginThunkCreator}) (Login);