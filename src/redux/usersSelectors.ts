import {createSelector} from "reselect";
import {AppStateType} from "./store";

export  const getUsers = (state:AppStateType) => {
        return state.usersPage.users;
    };
  export  const getPageSize = (state:AppStateType) => {
      return state.usersPage.pageSize;
  };
  export  const getUsersCount = (state:AppStateType) => {
      return state.usersPage.usersCount;
  };
  export  const getCurrentPage = (state:AppStateType) => {
      return state.usersPage.currentPage;
  };
  export  const getIsFetching = (state:AppStateType) => {
      return state.usersPage.isFetching;
  };
  export  const getIsFollowingProgress = (state:AppStateType) => {
      return state.usersPage.isFollowingProgress;
  };



//реселект используем для сложных селекторов,
// передаем ему параметром простой селектор (getUsers) и что он возвращает(users)
// и уже эти данные обрабатываем.
// т.е. у реселектора есть в памяти зависимости - users
// и если users не меняется в  state, то функция (getUsersReselect) перезапускаться впустую не будет
export const getUsersReselect = createSelector(getUsers,(users) =>{//
    return users.filter(u=>true);
});
export const getUsersFollowReselect = createSelector(getUsers,(users) =>{//
    return users.filter(u => u.followed === true);
});
//сложная зависимость от нескольтких селекторов
export const getUsersReselect2 = createSelector(getUsers,getIsFetching,
    (users, isFetching) =>{//
    return users.filter(u=>true);
});