import {usersApi} from "../api/api";
import {updateMass} from "../utils/mapingState";


const FOLLOW = 'FOLLOW';
const  UNFOLLOW = 'UNFOLLOW';
const SET_USERS = 'SET_USERS';
const SET_SEARCH_USERS_FOR_NAME = "SET_SEARCH_USERS_FOR_NAME";
const SET_FOLLOWED_USERS = 'SET_FOLLOWED_USERS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_USERS_COUNT = 'SET_USERS_COUNT';
const TOGGLE_IS_FETCHING = 'TOGGLE_IS_FETCHING';
const TOGGLE_IS_FOLLOWING = 'TOGGLE_IS_FOLLOWING';


let initialState = {
    users:[],
    searchUsersForName:[],
    usersFollowed:[],
        /*{id:1, foto: face, followod: true, fullName:"Alex D.", usersStatus:'всем привет :)', locations:{city:'minsk',country:'belarus'}},
        {id:2, foto: face, followod: false, fullName:"John D.", usersStatus:'всем привет :)', locations:{city:'minsk',country:'belarus'}},
        {id:3, foto: face, followod: true, fullName:"Bikki D.", usersStatus:'всем привет :)', locations:{city:'minsk',country:'belarus'}}*/

    pageSize: 5,
    usersCount: 0,
    currentPage: 1,
    friend: true,
    isFetching: false,//  приставка is для названия переменных с булевым значением: true/false
    isFollowingProgress: []
};

const usersReducer =  (state = initialState, action) => {

//console.log(action);
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
                    /*[...state.users.map(u => {
                    if (u.id === action.userId){
                        return {...u, followed: false }
                    }
                    return u;
                })

                ]//используем map() - он копирует и возвращает новый объект (так делаем если надо изменить элемент в массиве)
           */
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
export const follow =(userId)=> ({type: FOLLOW, userId });// если функция только возвращает  можно не ставить return
export const unfollow = (userId) =>({ type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setFollowedUsers = (usersFollowed) => ({type: SET_FOLLOWED_USERS, usersFollowed});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setUsersCount = (usersCount) => ({type: SET_USERS_COUNT, usersCount});
export const setToggleIsFetching = (isFetching) =>({type: TOGGLE_IS_FETCHING, isFetching});
export const  setToggleIsFollowing = (isFollowingProgress, userId) => ({type: TOGGLE_IS_FOLLOWING, isFollowingProgress, userId});
export const setSearchUsers = (users) => ({type: SET_SEARCH_USERS_FOR_NAME, users});

//делаем thunc - функция котоая диспатчит action creaters если санке нужны какие-то данные, оборачиваем ее
// в функцию высшего порядка ThuncCreater (может принимать данные и возвращает Thunc)
// и в нее передаем неолбходимые данные
export  const  getUsersThunkCreator = (currentPage,pageSize) => {
   return (dispatch) => {
    dispatch(setToggleIsFetching(true));
    dispatch(setCurrentPage(currentPage));
    usersApi.getUsers(currentPage, pageSize).then(data => {
       dispatch(setToggleIsFetching(false));
       dispatch(setUsers(data.items));
       dispatch(setUsersCount(data.totalCount));
    });

}};
export  const  getUsersSearchThunkCreator = (name) => {
    return (dispatch) => {
        usersApi.getUsersForName(name).then(data => {
            dispatch(setSearchUsers(data.items));
        });

    }};


export  const  getFollowedUsersThunkCreator = (friend) => {
    return (dispatch) => {
        usersApi.getFollowedUsers(friend).then(data => {
            dispatch(setFollowedUsers(data.items));
        });

    }};

//т к в санках follow/unfollow есть дублирующийся код, делаем рефакторинг ,
// для этого создаем универсальную функцию
// а затем ее уже будем вызывать в санках
    const followUnfollow = async (dispatch, id, apiMethod, actionCreator) => {
        dispatch(setToggleIsFollowing(true, id));
        let data = await apiMethod(id);
        if(data.resultCode === 0){
            dispatch(actionCreator(id));
        }
        dispatch(setToggleIsFollowing(false, id));
    };
    export  const  followThunkCreator = (id) => {
        return async (dispatch) => {
            followUnfollow(dispatch, id, usersApi.subscribeUsers.bind(usersApi), follow);
        }
    };
    export  const  unFollowThunkCreator = (id) => {
        return async (dispatch) => {
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