import {createSelector} from "reselect";

export  const getUsers = (state) => {
        return state.usersPage.users;
    };
  export  const getPageSize = (state) => {
      return state.usersPage.pageSize;
  };
  export  const getUsersCount = (state) => {
      return state.usersPage.usersCount;
  };
  export  const getCurrentPage = (state) => {
      return state.usersPage.currentPage;
  };
  export  const getIsFetching = (state) => {
      return state.usersPage.isFetching;
  };
  export  const getIsFollowingProgress = (state) => {
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

//сложная зависимость от нескольтких селекторов
export const getUsersReselect2 = createSelector(getUsers,getIsFetching,
    (users, isFetching) =>{//
    return users.filter(u=>true);
});