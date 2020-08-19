import face from "../img/photo_2020-07-26_23-35-01.jpg";
import {profileApi} from "../api/api";


const ADD_POST = 'ADD-POST';
const  SET_USERS_PROFILE = 'SET_USERS_PROFILE';
const  SET_STATUS = 'SET_STATUS';//2
const DELETE_POST = 'DELETE_POST';

let initialState = {
    dataMyPosts:[
        {img:face, mess:"fgdheyri vjjv ffff", like:15},
        {img:face, mess:"sdfswerw fdg", like:4},
        {img:face, mess:"dsfs", like:1}
    ],
    profile: null,
    status:""//1
};

   const profileReducer =  (state = initialState, action) => {
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
           default:
               return state;
       }

};

export const addPostActionCreator =(post)=> ({type: ADD_POST, post });// если функция только возвращает  можно не ставить return
export const setUsersProfile = (profile) => ({type: SET_USERS_PROFILE, profile});
export const setStatus = (status) => ({type: SET_STATUS, status});//4
export const deletePost = (id) => ({type: DELETE_POST,id});
// thunk
export  const  getProfileThunkCreator = (userId) => (dispatch) => {
    profileApi.getProfile(userId).then(response => {
        dispatch(setUsersProfile(response.data));
    })
};

export  const  getStatusThunkCreator = (userId) => (dispatch) => {//5
    profileApi.getStatus(userId).then(response => {
        dispatch(setStatus(response.data));
    })
};

export  const  updateStatusThunkCreator = (status) => (dispatch) => {
    profileApi.updateStatus(status).then(response => {
        if(response.data.resultCode === 0)
        dispatch(setStatus(status));
    })
};



   export default profileReducer;