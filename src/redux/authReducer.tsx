import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";
//процессит текущего пользователя

const  SET_USERS_DATA = 'SET_USERS_DATA';
const  SET_CAPTCHA = 'SET_CAPTCHA';

export type initialStateType={
    userId: number|null,
    login: string|null,
    email: string|null,
    isAuth: boolean,
    captchaUrl: string|null
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

const authReducer =  (state = initialState, action:any):initialStateType => {
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
export  const  AuthThunkCreator = () => async (dispatch:any) => {
   let response = await authApi.authentication();
            if(response.data.resultCode === 0){
                let{id, email, login} = response.data.data;
                dispatch(setAuthUsersData(id, email, login,  true));
            }
    };

//thunk
export  const  LoginThunkCreator = (email:string, password:string, rememberMe:boolean, captchaUrl:string) => async (dispatch:any) => {
      let response = await  authApi.login(email, password, rememberMe, captchaUrl);
            if(response.data.resultCode === 0){
                dispatch(AuthThunkCreator())
            } else {
                if(response.data.resultCode === 10){
                    dispatch(getCaptchaThunkCreator());
                }
                let message = response.data.messages.length >0 ? response.data.messages[0] : " Ошибка";
                dispatch(stopSubmit("login",{_error: message}));// stopSubmit() - это action creator из redux form , останавливает отправку формы в скабках указываем какую именно форму останавливаем (name)
            }
    };

//thunk
export  const  LogoutThunkCreator = () => async (dispatch:any) => {
      let response = await  authApi.logout();
            if(response.data.resultCode === 0) {
                dispatch(setAuthUsersData(null, null, null, false));
            }
    };
export const getCaptchaThunkCreator = () => async (dispatch:any) => {
   const response = await authApi.getCaptcha();
   const capchaUrl = response.data.url;
    dispatch(setCaptcha(capchaUrl));
};

export default authReducer;