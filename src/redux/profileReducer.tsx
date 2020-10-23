import face from "../img/hotpng.com (2).png";
import img2 from "../img/links/photo_2020-09-27_22-49-04.jpg";
import img1 from "../img/links/photo_2020-09-27_23-09-47.jpg";
import img3 from "../img/links/photo_2020-09-27_23-14-45.jpg";
import {profileApi} from "../api/api";
import {stopSubmit} from "redux-form";
import {dataMyPostsType, photoType, profileType} from "./types/types";

//reducer  - это функция, которая преобразовывает  state  через объект action ( у которого есть как минимум  type)
//каждый reducer отвечает за свою часть стейта, получает   action, часть стейта
// и преобразовывает  state инъютабельно (не перерисовывает входящий стейт а работает с копией)

const ADD_POST = 'ADD-POST';
const  SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const  SET_STATUS = 'SET_STATUS';//2
const DELETE_POST = 'DELETE_POST';
const SET_PHOTO = 'SET_PHOTO';

type initialStateType ={
    dataMyPosts: Array <dataMyPostsType>
    profile:any
    status:string
}

type addPostActionType={
    type: typeof ADD_POST
    post:string
}
type setUsersProfileActionType={
    type: typeof SET_USERS_PROFILE
    profile:profileType
}
type setStatusActionType={
    type: typeof SET_STATUS
    status:string
}
type deletePostActionType={
    type: typeof DELETE_POST
    id:number
}
type setphotoActionType={
    type: typeof SET_PHOTO
    photos:photoType
}


let initialState:initialStateType = {
    dataMyPosts:[
        {id: 1, img:img1, mess:"способ отложенной загрузки изображений для максимальной производительности.", link:"https://blog.prototyp.digital/best-way-to-lazy-load-images-for-maximum-performance", like:15},
        {id: 2, img:img2, mess:"Веб-разработчику: 10 полезных инструментов.", link:"https://habr.com/ru/company/ruvds/blog/515004", like:4},
        {id: 3, img:img3, mess:"Анимируйте SVG viewBox с помощью React.", link:"https://elijahmanor.com/blog/react-svg-viewbox", like:4},
        {id: 4, img:null, mess:"5 самых раздражающих особенностей веб-сайтов...", link:"https://bighack.org/5-most-annoying-website-features-i-face-as-a-blind-screen-reader-user-accessibility", like:4}
        ],
    profile: null,
    status:"",//1

};

   const profileReducer =  (state = initialState, action:any):initialStateType => {
       // eslint-disable-next-line default-case

       switch (action.type) {
           case ADD_POST: {
               return {
                   ...state,
                   dataMyPosts: [...state.dataMyPosts,{img:face, mess: action.post, like:0  }]
               };
            }
           case SET_USERS_PROFILE:
              { return {...state, profile: action.profile};}
           case SET_STATUS://3
           { return {...state, status: action.status};}
           case DELETE_POST:
           { return {...state, dataMyPosts: state.dataMyPosts.filter(p=> p.like !== action.id)};}
           case SET_PHOTO:
           {
               return {...state, profile: {...state.profile, photos: action.photos}};
           }
           default:
               return state;
       }
};

export const addPostActionCreator =(post:string):addPostActionType=> ({type: ADD_POST, post });// если функция только возвращает  можно не ставить return
export const setUsersProfile = (profile:profileType):setUsersProfileActionType => ({type: SET_USERS_PROFILE, profile});
export const setStatus = (status:string):setStatusActionType => ({type: SET_STATUS, status});//4
export const deletePost = (id:number):deletePostActionType => ({type: DELETE_POST,id});
export const setPhoto = (photos:photoType):setphotoActionType => ({type: SET_PHOTO, photos});

// thunk
export  const  getProfileThunkCreator = (userId:number) => async (dispatch:any) => {
   let response = await profileApi.getProfile(userId);
        dispatch(setUsersProfile(response.data));
};
export  const  getStatusThunkCreator = (userId:number) => async (dispatch:any) => {//5
    let response = await profileApi.getStatus(userId);
        dispatch(setStatus(response.data));
};
export  const  updateStatusThunkCreator = (status:string) => async (dispatch:any) => {
    try {
        const response = await profileApi.updateStatus(status);
        if(response.data.resultCode === 0)
            dispatch(setStatus(status));
    } catch (e) {
    }
};
export  const  updateProfilePhotoThunkCreator = (file:any) => async (dispatch:any) => {
    let response = await profileApi.addPhoto(file);
        if(response.data.resultCode === 0)
            dispatch(setPhoto(response.data.data.photos));
};
export  const  saveProfileThunkCreator = (profile:profileType) => async (dispatch:any, getState:any) => {
    const  userId = getState().auth.userId;// достаем из стейта текущего пользователя
   const response = await profileApi.saveProfile(profile);
        if(response.data.resultCode === 0){
            dispatch(getProfileThunkCreator(userId));
        } else {
            let message = response.data.messages.length >0 ? response.data.messages[0] : " Ошибка";
            dispatch(stopSubmit("profile",{_error: message}));// stopSubmit() - это action creator из redux form , останавливает отправку формы в скабках указываем какую именно форму останавливаем (name)
            return  Promise.reject({_error: message})// для остановки отправки формы в случае ошибки
        }

};


   export default profileReducer;