
import {connect} from "react-redux";
import {getUsersSearchThunkCreator} from "../../redux/usersReducer";
import SearchUsers from "./SearchUsers";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.searchUsersForName
    }

};


const SearchUsersContainer = connect(mapStateToProps,{getUsersSearchThunkCreator} )(SearchUsers);//сoздаем контейнерную компоненту для AddMessage с помощью библиотеки react-redux (connect)



export  default SearchUsersContainer;

