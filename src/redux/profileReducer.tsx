import face from "../img/hotpng.com (2).png";
import img2 from "../img/links/photo_2020-09-27_22-49-04.jpg";
import img1 from "../img/links/photo_2020-09-27_23-09-47.jpg";
import img3 from "../img/links/photo_2020-09-27_23-14-45.jpg";
import {FormAction, stopSubmit} from "redux-form";
import {dataMyPostsType, photoType, profileType} from "./types/types";
import {BaseThuncType, InferActionType} from "./store";
import {profileApi} from "../api/profile_api";

//reducer  - это функция, которая преобразовывает  state  через объект action ( у которого есть как минимум  type)
//каждый reducer отвечает за свою часть стейта, получает   action, часть стейта
// и преобразовывает  state инъютабельно (не перерисовывает входящий стейт а работает с копией)


export type initialStateType  = typeof initialState;
type ActionsType= InferActionType<typeof actionsProfile>;
type ThuncType = BaseThuncType<ActionsType| FormAction>
//type dispatchType= Dispatch<ActionsType>
//type getStateType=()=>AppStateType

let initialState = {
    dataMyPosts:[
        {id: 1, img:img1, mess:"способ отложенной загрузки изображений для максимальной производительности.", link:"https://blog.prototyp.digital/best-way-to-lazy-load-images-for-maximum-performance", like:15},
        {id: 2, img:img2, mess:"Веб-разработчику: 10 полезных инструментов.", link:"https://habr.com/ru/company/ruvds/blog/515004", like:4},
        {id: 3, img:img3, mess:"Анимируйте SVG viewBox с помощью React.", link:"https://elijahmanor.com/blog/react-svg-viewbox", like:4},
        {id: 4, img:null, mess:"5 самых раздражающих особенностей веб-сайтов...", link:"https://bighack.org/5-most-annoying-website-features-i-face-as-a-blind-screen-reader-user-accessibility", like:4}
        ] as Array<dataMyPostsType>,
    profile: null as profileType | null,
    status:"",//1
};

   const profileReducer =  (state = initialState, action:ActionsType):initialStateType => {
       // eslint-disable-next-line default-case
       switch (action.type) {
           case "ADD_POST": {
               return {
                   ...state,
                   dataMyPosts: [...state.dataMyPosts,{img:face, mess: action.post, like:0  }]
               };
            }
           case "SET_USERS_PROFILE":
              { return {...state, profile: action.profile};}
           case "SET_STATUS"://3
           { return {...state, status: action.status};}
           case "DELETE_POST":
           { return {...state, dataMyPosts: state.dataMyPosts.filter(p=> p.like !== action.id)};}
           case "SET_PHOTO":
           {
               // @ts-ignore
               return {...state, profile: {...state.profile, photos: action.photos}};
           }
           default:
               return state;
       }
};


export const actionsProfile={
    addPostActionCreator:(post:string)=> ({type: "ADD_POST", post } as const),
    setUsersProfile: (profile:profileType) => ({type: "SET_USERS_PROFILE", profile} as const),
    setStatus: (status:string) => ({type: "SET_STATUS", status} as const),//4
    deletePost: (id:number) => ({type: "DELETE_POST",id} as const),
    setPhoto: (photos:photoType) => ({type: "SET_PHOTO", photos} as const)
};


// thunk
export  const  getProfileThunkCreator = (userId:number|null):ThuncType => async (dispatch) => {
   let profileData = await profileApi.getProfile(userId);
        dispatch(actionsProfile.setUsersProfile(profileData));
};
export  const  getStatusThunkCreator = (userId:number):ThuncType => async (dispatch) => {//5
    let response = await profileApi.getStatus(userId);
        dispatch(actionsProfile.setStatus(response.data));
};
export  const  updateStatusThunkCreator = (status:string):ThuncType => async (dispatch) => {
    try {
        const updateStatusData = await profileApi.updateStatus(status);
        if(updateStatusData.resultCode === 0)
            dispatch(actionsProfile.setStatus(status));
    } catch (e) {
    }
};
export  const  updateProfilePhotoThunkCreator = (file:File):ThuncType => async (dispatch) => {
    let photoData = await profileApi.addPhoto(file);
        if(photoData.resultCode === 0)
            dispatch(actionsProfile.setPhoto(photoData.data));
};
export  const  saveProfileThunkCreator = (profile:profileType):ThuncType => async (dispatch, getState) => {
    const  userId = getState().auth.userId;// достаем из стейта текущего пользователя
   const saveProfileData = await profileApi.saveProfile(profile);
        if(saveProfileData.resultCode === 0){
            dispatch(getProfileThunkCreator(userId));
        } else {
            let message = saveProfileData.messages.length >0 ? saveProfileData.messages[0] : " Ошибка";
            dispatch(stopSubmit("profile",{_error: message}));// stopSubmit() - это action creator из redux form , останавливает отправку формы в скабках указываем какую именно форму останавливаем (name)
            return  Promise.reject({_error: message})// для остановки отправки формы в случае ошибки
        }

};


   export default profileReducer;