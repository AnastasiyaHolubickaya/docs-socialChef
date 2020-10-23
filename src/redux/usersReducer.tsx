import {usersApi} from "../api/api";
import {updateMass} from "../utils/mapingState";
import {usersType} from "./types/types";


const FOLLOW = 'FOLLOW';
const  UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_SEARCH_USERS_FOR_NAME = "SET_SEARCH_USERS_FOR_NAME";
const SET_FOLLOWED_USERS = 'SET_FOLLOWED_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';

type followActionType={
    type:typeof FOLLOW
    userId:number
}
type setUsersActionType={
    type:typeof SET_USERS
    users:usersType
}
type unfollowActionType={
    type:typeof UNFOLLOW
    userId:number
}
type setFollowedUsersActionType={
    type:typeof SET_FOLLOWED_USERS
    usersFollowed:usersType
}
type setCurrentPageActionType={
    type:typeof SET_CURRENT_PAGE
    currentPage:number
}
type setUsersCountActionType={
    type:typeof SET_USERS_COUNT
    usersCount:number
}
type ToggleIsFetchingActionType={
    type:typeof TOGGLE_IS_FETCHING
    isFetching:boolean
}
type setToggleIsFollowingActionType={
    type:typeof TOGGLE_IS_FOLLOWING
    isFollowingProgress:any
    userId:number
}
type setSearchUsersActionType={
    type:typeof SET_SEARCH_USERS_FOR_NAME
    users:usersType
}

let initialState = {
    users:[] as Array<usersType>,
    searchUsersForName:[] as Array<usersType>,
    usersFollowed:[] as Array<usersType>,
        /*{id:1, foto: face, followod: true, fullName:"Alex D.", usersStatus:'всем привет :)', locations:{city:'minsk',country:'belarus'}},
        {id:2, foto: face, followod: false, fullName:"John D.", usersStatus:'всем привет :)', locations:{city:'minsk',country:'belarus'}},
        {id:3, foto: face, followod: true, fullName:"Bikki D.", usersStatus:'всем привет :)', locations:{city:'minsk',country:'belarus'}}*/
    pageSize: 5,
    usersCount: 0,
    currentPage: 1,
    friend: true,
    isFetching: false,//  приставка is для названия переменных с булевым значением: true/false
    isFollowingProgress: [] as Array<number>//массив id пользователей
};
type initialStateType  = typeof initialState;
const usersReducer =  (state = initialState, action:any):initialStateType=> {
    switch (action.type) {

        case FOLLOW:
            return  {
                ...state,
                users:updateMass(state.users, action.userId,'id', {followed: true})
            };
        case UNFOLLOW:
            return  {
                ...state,
                users:updateMass(state.users, action.userId,'id', {followed: false})// рефакторинг
            };
        case SET_USERS:
            return {
                ...state,
                users: action.users
                };
        case SET_SEARCH_USERS_FOR_NAME:
            return {
                ...state,
                searchUsersForName: action.users
            };
        case SET_FOLLOWED_USERS:
            return {
                ...state,
                usersFollowed: action.usersFollowed
            };

        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
               //кстарому массиву добавили новый (который получаем из БД)
            };
        case SET_USERS_COUNT:
            return {
                ...state, usersCount: action.usersCount
                //кстарому массиву добавили новый (который получаем из БД)
            };
        case TOGGLE_IS_FETCHING:
            return {
                ...state, isFetching: action.isFetching
            };
        case TOGGLE_IS_FOLLOWING:
            return {
                ...state,
                isFollowingProgress: action.isFollowingProgress
                    ? [...state.isFollowingProgress, action.userId]
                    : state.isFollowingProgress.filter(id => id !== action.userId)
            };
        default:
            return state;
    }
};

// функции action creaters  - возвращают action
export const follow =(userId:number):followActionType=> ({type: FOLLOW, userId });// если функция только возвращает  можно не ставить return
export const unfollow = (userId:number):unfollowActionType =>({ type: UNFOLLOW, userId});
export const setUsers = (users:usersType):setUsersActionType => ({type: SET_USERS, users});
export const setFollowedUsers = (usersFollowed:usersType):setFollowedUsersActionType => ({type: SET_FOLLOWED_USERS, usersFollowed});
export const setCurrentPage = (currentPage:number):setCurrentPageActionType => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersCount = (usersCount:number):setUsersCountActionType => ({type: SET_USERS_COUNT, usersCount});
export const setToggleIsFetching = (isFetching:boolean):ToggleIsFetchingActionType =>({type: TOGGLE_IS_FETCHING, isFetching});
export const  setToggleIsFollowing = (isFollowingProgress:any, userId:number):setToggleIsFollowingActionType => ({type: TOGGLE_IS_FOLLOWING, isFollowingProgress, userId});
export const setSearchUsers = (users:usersType):setSearchUsersActionType => ({type: SET_SEARCH_USERS_FOR_NAME, users});

//делаем thunc - функция котоая диспатчит action creaters если санке нужны какие-то данные, оборачиваем ее
// в функцию высшего порядка ThuncCreater (может принимать данные и возвращает Thunc)
// и в нее передаем неолбходимые данные
export  const  getUsersThunkCreator = (currentPage:number,pageSize:number) => async (dispatch:any) => {
    dispatch(setToggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
   let data= await usersApi.getUsers(currentPage, pageSize);
       dispatch(setToggleIsFetching(false));
       dispatch(setUsers(data.items));
       dispatch(setUsersCount(data.totalCount));
};
export  const  getUsersSearchThunkCreator = (name:string) => async (dispatch:any) => {
    let data= await usersApi.getUsersForName(name);
            dispatch(setSearchUsers(data.items));
    };
export  const  getFollowedUsersThunkCreator = (friend:boolean) => async (dispatch:any) => {
    let data= await usersApi.getFollowedUsers(friend);
            dispatch(setFollowedUsers(data.items));
    };

//т к в санках follow/unfollow есть дублирующийся код, делаем рефакторинг ,
// для этого создаем универсальную функцию
// а затем ее уже будем вызывать в санках
    const followUnfollow = async (dispatch:any, id:number, apiMethod:any, actionCreator:any) => {
        dispatch(setToggleIsFollowing(true, id));
        let data = await apiMethod(id);
        if(data.resultCode === 0){
            dispatch(actionCreator(id));
        }
        dispatch(setToggleIsFollowing(false, id));
    };
    export  const  followThunkCreator = (id:number) => {
        return async (dispatch:any) => {
            followUnfollow(dispatch, id, usersApi.subscribeUsers.bind(usersApi), follow);
        }
    };
    export  const  unFollowThunkCreator = (id:number) => {
        return async (dispatch:any) => {
            followUnfollow(dispatch, id, usersApi.unSubscribeUsers.bind(usersApi), unfollow);
        }
};
/*
   // санки до рефакторинга
export  const  followThunkCreator = (id) => {
    return (dispatch) => {
        dispatch(setToggleIsFollowing(true, id));
        usersApi.subscribeUsers(id).then(data => {
            if(data.resultCode === 0){
                dispatch(follow(id));
            }
            dispatch(setToggleIsFollowing(false, id));
        });

    }};

export  const  unFollowThunkCreator = (id) => {
    return (dispatch) => {
        dispatch(setToggleIsFollowing(true, id));
        usersApi.unSubscribeUsers(id).then(data => {
            if(data.resultCode === 0){
                dispatch(unfollow(id));
            }
            dispatch(setToggleIsFollowing(false, id));
        });

    }};
*/

export default usersReducer;


/*//делаем thunc - функция котоая диспатчит action creaters,
если санке нужны какие-то данные, оборачиваем ее
в функцию высшего порядка ThuncCreater (может принимать данные и возвращает Thunc)
и в нее передаем неолбходимые данные
export  const  getUsers = (dispatch) => {
    dispatch.setToggleIsFetching(true);
    usersApi.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
       dispatch.setToggleIsFetching(false);
       dispatch.setUsers(data.items);
        dispatch.setUsersCount(data.totalCount);
    });

}
*/