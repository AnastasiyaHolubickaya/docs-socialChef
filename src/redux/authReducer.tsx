import {resultCodeCaptchaEnum, resultCodeEnum} from "../api/api";
import {stopSubmit} from "redux-form";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {Dispatch} from "redux";
import {authApi} from "../api/auth_api";
//процессит текущего пользователя

const  SET_USERS_DATA = 'SET_USERS_DATA';
const  SET_CAPTCHA = 'SET_CAPTCHA';

export type initialStateType={
    userId: number|null,
    login: string|null,
    email: string|null,
    isAuth: boolean,
    captchaUrl?: string|null
}
let initialState:initialStateType = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};
type usersDataType ={
    userId:number|null
    login: string|null,
    email: string|null,
    isAuth: boolean
}
type usersDataActionType = {
    type: typeof SET_USERS_DATA
    data: usersDataType
}
type captchaActionType={
    type: typeof SET_CAPTCHA
    data:{captchaUrl:string}
}
type actionsType= usersDataActionType | captchaActionType
type thuncType = ThunkAction<Promise<void>,AppStateType,unknown, actionsType>
type dispatchType= Dispatch<actionsType>

const authReducer =  (state = initialState, action:actionsType):initialStateType => {
    switch (action.type) {
        case    SET_USERS_DATA:
        case    SET_CAPTCHA:
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
};
export const setAuthUsersData =(userId:number|null, email:string|null, login:string|null, isAuth:boolean):usersDataActionType=> ({type: SET_USERS_DATA, data:{userId,email,login,  isAuth} });// если функция только возвращает  можно не ставить return
const setCaptcha = (captchaUrl:string):captchaActionType => ({type: SET_CAPTCHA, data: {captchaUrl}});
//thunk
export  const  AuthThunkCreator = ():thuncType => async (dispatch:dispatchType) => {
   let authData = await authApi.authentication();
            if(authData.resultCode === resultCodeEnum.success){
                let{id, email, login} = authData.data;
                dispatch(setAuthUsersData(id, email, login,  true));
            }
    };

//thunk
export  const  LoginThunkCreator = (email:string, password:string, rememberMe:boolean, captchaUrl:string|null):thuncType => async (dispatch:any) => {
      let loginData = await  authApi.login(email, password, rememberMe, captchaUrl);
            if(loginData.resultCode === resultCodeEnum.success){
                dispatch(AuthThunkCreator())
            } else {
                // @ts-ignore
                if(loginData.resultCode === resultCodeCaptchaEnum.captchaIsRequired){
                    dispatch(getCaptchaThunkCreator());
                }
                let message = loginData.messages.length >0 ? loginData.messages[0] : " Ошибка";
                dispatch(stopSubmit("login",{_error: message}));// stopSubmit() - это action creator из redux form , останавливает отправку формы в скабках указываем какую именно форму останавливаем (name)
            }
    };

//thunk
export  const  LogoutThunkCreator = ():thuncType => async (dispatch:dispatchType) => {
      let logoutData = await  authApi.logout();
            if(logoutData.resultCode === resultCodeEnum.success) {
                dispatch(setAuthUsersData(null, null, null, false));
            }
    };
export const getCaptchaThunkCreator = ():thuncType => async (dispatch:dispatchType) => {
   const data = await authApi.getCaptcha();
   const capchaUrl = data.url;
    dispatch(setCaptcha(capchaUrl));
};

export default authReducer;