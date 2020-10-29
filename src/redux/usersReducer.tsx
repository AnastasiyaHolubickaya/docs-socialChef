import {updateMass} from "../utils/mapingState";
import {usersType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionType} from "./store";
import {Dispatch} from "redux";
import {usersApi} from "../api/users_api";

/*
const FOLLOW = 'FOLLOW';
const  UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_SEARCH_USERS_FOR_NAME = "SET_SEARCH_USERS_FOR_NAME";
const SET_FOLLOWED_USERS = 'SET_FOLLOWED_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';
*/

type ActionsType= InferActionType<typeof  actions>;

let initialState = {
    users:[] as Array<usersType>,
    searchUsersForName:[]as Array<usersType>,
    usersFollowed:[] as Array<usersType>,
    pageSize: 5,
    usersCount: 0,
    currentPage: 1,
    friend: true,
    isFetching: false,//  приставка is для названия переменных с булевым значением: true/false
    isFollowingProgress: [] as Array<number>//массив id пользователей
};
type initialState  = typeof initialState;
const usersReducer =  (state = initialState, action:ActionsType):initialState=> {
    switch (action.type) {

        case "FOLLOW":
            return  {
                ...state,
                users:updateMass(state.users, action.userId,'id', {followed: true})
            };
        case "UNFOLLOW":
            return  {
                ...state,
                users:updateMass(state.users, action.userId,'id', {followed: false})// рефакторинг
            };
        case "SET_USERS":
            return {
                ...state,
                users: action.users
                };
        case "SET_SEARCH_USERS_FOR_NAME":
            return {
                ...state,
                searchUsersForName: action.users
            };
        case "SET_FOLLOWED_USERS":
            return {
                ...state,
                usersFollowed: action.usersFollowed
            };

        case "SET_CURRENT_PAGE":
            return {
                ...state, currentPage: action.currentPage
               //кстарому массиву добавили новый (который получаем из БД)
            };
        case "SET_USERS_COUNT":
            return {
                ...state, usersCount: action.usersCount
                //кстарому массиву добавили новый (который получаем из БД)
            };
        case "TOGGLE_IS_FETCHING":
            return {
                ...state, isFetching: action.isFetching
            };
        case "TOGGLE_IS_FOLLOWING":
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
export const actions={
     follow:(userId:number)=> ({type: "FOLLOW", userId } as const),// если функция только возвращает  можно не ставить return
     unfollow: (userId:number) =>({ type: "UNFOLLOW", userId}as const),
     setUsers: (users:Array<usersType>) => ({type: "SET_USERS", users}as const),
     setFollowedUsers: (usersFollowed:Array<usersType>) => ({type: "SET_FOLLOWED_USERS", usersFollowed}as const),
     setCurrentPage: (currentPage:number) => ({type: "SET_CURRENT_PAGE", currentPage}as const),
     setUsersCount: (usersCount:number) => ({type: "SET_USERS_COUNT", usersCount}as const),
     setToggleIsFetching: (isFetching:boolean) =>({type: "TOGGLE_IS_FETCHING", isFetching}as const),
      setToggleIsFollowing: (isFollowingProgress:boolean, userId:number) => ({type: "TOGGLE_IS_FOLLOWING", isFollowingProgress, userId}as const),
     setSearchUsers: (users:Array<usersType>) => ({type: "SET_SEARCH_USERS_FOR_NAME", users}as const),

};

//делаем thunc - функция котоая диспатчит action creaters если санке нужны какие-то данные, оборачиваем ее
// в функцию высшего порядка ThuncCreater (может принимать данные и возвращает Thunc)
// и в нее передаем неолбходимые данные
type thuncType = ThunkAction<Promise<void>,AppStateType,unknown, ActionsType>
type dispatchType= Dispatch<ActionsType>

export  const  getUsersThunkCreator = (currentPage:number,
                                       pageSize:number): thuncType => async (dispatch) => {
    dispatch(actions.setToggleIsFetching(true));
    dispatch(actions.setCurrentPage(currentPage));
   let data= await usersApi.getUsers(currentPage, pageSize);
       dispatch(actions.setToggleIsFetching(false));
       dispatch(actions.setUsers(data.items));
       dispatch(actions.setUsersCount(data.totalCount));
};
export  const  getUsersSearchThunkCreator = (name:string):thuncType => async (dispatch) => {
    let data= await usersApi.getUsersForName(name);
            dispatch(actions.setSearchUsers(data.items));
    };
export  const  getFollowedUsersThunkCreator = (friend:boolean):thuncType => async (dispatch) => {
    let data= await usersApi.getFollowedUsers(friend);
            dispatch(actions.setFollowedUsers(data.items));
    };

//т к в санках follow/unfollow есть дублирующийся код, делаем рефакторинг ,
// для этого создаем универсальную функцию
// а затем ее уже будем вызывать в санках
    const followUnfollow = async (dispatch:dispatchType, id:number, apiMethod:any, actionCreator:(id:number)=> ActionsType) => {
        dispatch(actions.setToggleIsFollowing(true, id));
        let data = await apiMethod(id);
        if(data.resultCode === 0){
            dispatch(actionCreator(id));
        }
        dispatch(actions.setToggleIsFollowing(false, id));
    };
    export  const  followThunkCreator = (id:number):thuncType => {
        return async (dispatch) => {
            followUnfollow(dispatch, id, usersApi.subscribeUsers.bind(usersApi), actions.follow);
        }
    };
    export  const  unFollowThunkCreator = (id:number):thuncType => {
        return async (dispatch) => {
            followUnfollow(dispatch, id, usersApi.unSubscribeUsers.bind(usersApi), actions.unfollow);
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