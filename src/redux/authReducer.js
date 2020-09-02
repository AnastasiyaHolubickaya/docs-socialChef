import {authApi} from "../api/api";
import {stopSubmit} from "redux-form";
//процессит текущего пользователя

const  SET_USERS_DATA = 'SET_USERS_DATA';
const  SET_CAPTCHA = 'SET_CAPTCHA';

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaUrl: null
};


const authReducer =  (state = initialState, action) => {
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
export const setAuthUsersData =(userId, email, login, isAuth)=> ({type: SET_USERS_DATA, data:{userId,email,login,  isAuth} });// если функция только возвращает  можно не ставить return
const setCaptcha = (captchaUrl) => ({type: SET_CAPTCHA, data: {captchaUrl}});
//thunk
export  const  AuthThunkCreator = () => (dispatch) => {
   return   authApi.authentication()
       .then(response => {
            if(response.data.resultCode === 0){
                let{id, email, login} = response.data.data;

                dispatch(setAuthUsersData(id, email, login,  true));
            }
        })

    };

//thunk
export  const  LoginThunkCreator = (email, password, rememberMe, captchaUrl) => (dispatch) => {
        authApi.login(email, password, rememberMe, captchaUrl).then(response => {
            if(response.data.resultCode === 0){
                dispatch(AuthThunkCreator())
            } else {
                if(response.data.resultCode === 10){
                    dispatch(getCaptchaThunkCreator());
                }
                let message = response.data.messages.length >0 ? response.data.messages[0] : " Ошибка";
                dispatch(stopSubmit("login",{_error: message}));// stopSubmit() - это action creator из redux form , останавливает отправку формы в скабках указываем какую именно форму останавливаем (name)
            }
        });

    };

//thunk
export  const  LogoutThunkCreator = () => (dispatch) => {
        authApi.logout().then(response => {
            if(response.data.resultCode === 0) {
                dispatch(setAuthUsersData(null, null, null, false));
            }
        });

    };
export const getCaptchaThunkCreator = () => async (dispatch) => {
   const response = await authApi.getCaptcha();
   const capchaUrl = response.data.url;
    dispatch(setCaptcha(capchaUrl));
};

export default authReducer;