import {resultCodeCaptchaEnum, resultCodeEnum} from "../api/api";
import {FormAction, stopSubmit} from "redux-form";
import { InferActionType, BaseThuncType} from "./store";
import {authApi} from "../api/auth_api";

//процессит текущего пользователя



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

type ActionsType= InferActionType<typeof actionsReducer>;
type thuncType = BaseThuncType<ActionsType| FormAction>

const authReducer =  (state = initialState, action:ActionsType):initialStateType => {
    switch (action.type) {
        case    "SET_USERS_DATA":
        case    "SET_CAPTCHA":
            return {
                ...state,
                ...action.data,
            };
        default:
            return state;
    }
};

export const actionsReducer={
    setAuthUsersData:(userId:number|null, email:string|null, login:string|null, isAuth:boolean)=> ({type: "SET_USERS_DATA", data:{userId,email,login,  isAuth} }as const),// если функция только возвращает  можно не ставить return
    setCaptcha: (captchaUrl:string) => ({type: "SET_CAPTCHA", data: {captchaUrl}} as const)
};


//thunk
export  const  AuthThunkCreator = ():thuncType => async (dispatch) => {
   let authData = await authApi.authentication();
            if(authData.resultCode === resultCodeEnum.success){
                let{id, email, login} = authData.data;
                dispatch(actionsReducer.setAuthUsersData(id, email, login,  true));
            }
    };

//thunk
export  const  LoginThunkCreator = (email:string, password:string, rememberMe:boolean, captchaUrl:string|null):thuncType => async (dispatch) => {
      let loginData = await  authApi.login(email, password, rememberMe, captchaUrl);
            if(loginData.resultCode === resultCodeEnum.success){
                dispatch(AuthThunkCreator())
            } else {
                if(loginData.resultCode === resultCodeCaptchaEnum.captchaIsRequired){
                    dispatch(getCaptchaThunkCreator());
                }
                let message = loginData.messages.length >0 ? loginData.messages[0] : " Ошибка";
                dispatch(stopSubmit("login",{_error: message}));// stopSubmit() - это action creator из redux form , останавливает отправку формы в скабках указываем какую именно форму останавливаем (name)
            }
    };

//thunk
export  const  LogoutThunkCreator = ():thuncType => async (dispatch) => {
      let logoutData = await  authApi.logout();
            if(logoutData.resultCode === resultCodeEnum.success) {
                dispatch(actionsReducer.setAuthUsersData(null, null, null, false));
            }
    };
export const getCaptchaThunkCreator = ():thuncType => async (dispatch) => {
   const data = await authApi.getCaptcha();
   const capchaUrl = data.url;
    dispatch(actionsReducer.setCaptcha(capchaUrl));
};

export default authReducer;