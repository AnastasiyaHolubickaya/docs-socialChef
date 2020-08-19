
import React from "react";
import {connect} from "react-redux";
import Navblock from "./Navblock";
import { LogoutThunkCreator} from "../../../redux/authReducer";



class NavblockAPI extends  React.Component{



    render() {
        return(
            <Navblock {...this.props} />


        )
    }


}

const mapStateToProps=(state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    userId: state.auth.userId
});
export default connect (mapStateToProps, { LogoutThunkCreator})(NavblockAPI);

