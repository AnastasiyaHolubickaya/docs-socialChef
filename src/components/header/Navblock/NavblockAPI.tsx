
import React from "react";
import {connect} from "react-redux";
import { LogoutThunkCreator} from "../../../redux/authReducer";
import {AppStateType} from "../../../redux/store";
/*
type mapStatePropsType ={
    isAuth: boolean,
    login: string|null
}
type mapDispatchPropsType={
    LogoutThunkCreator:()=>void
}
type ownPropsType={}
type propsType= mapDispatchPropsType & mapStatePropsType & ownPropsType;

class NavblockAPI extends  React.Component<propsType>{
    render() {
        return(
            <div> </div>
        )
    }
}
const mapStateToProps=(state:AppStateType) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
});
export default connect (mapStateToProps, { LogoutThunkCreator})(NavblockAPI);
*/
