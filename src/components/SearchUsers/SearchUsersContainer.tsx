
import {connect} from "react-redux";
import {getUsersSearchThunkCreator} from "../../redux/usersReducer";
import SearchUsers from "./SearchUsers";
import {AppStateType} from "../../redux/store";
import {usersType} from "../../redux/types/types";

type mapStatePropsType={
    users: Array<usersType>
}
type mapDispatchPropsType={
    getUsersSearchThunkCreator: (name:string)=>void
}
type ownProps={}
let mapStateToProps = (state:AppStateType):mapStatePropsType => {
    return {
        users: state.usersPage.searchUsersForName
    }
};


const SearchUsersContainer = connect <mapStatePropsType, mapDispatchPropsType,ownProps,AppStateType> (mapStateToProps,{getUsersSearchThunkCreator} )(SearchUsers);//сoздаем контейнерную компоненту для AddMessage с помощью библиотеки react-redux (connect)



export  default SearchUsersContainer;

