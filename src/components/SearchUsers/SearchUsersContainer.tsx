
import {connect} from "react-redux";

import {AppStateType} from "../../redux/store";
import {usersType} from "../../redux/types/types";
import SearchUsers from "./SearchUsers";

type mapStatePropsType={
    users: Array<usersType>
}
type mapDispatchPropsType={

}
type ownProps={}
let mapStateToProps = (state:AppStateType) => {

};


const SearchUsersContainer = connect  (mapStateToProps,{} )(SearchUsers);//сoздаем контейнерную компоненту для AddMessage с помощью библиотеки react-redux (connect)



export  default SearchUsersContainer;

