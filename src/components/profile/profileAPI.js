
import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {getProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator} from "../../redux/profileReducer";

import { WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import {withRouter} from "react-router-dom";
import {compose} from "redux";


class ProfileAPI extends  React.Component{

    componentDidMount(){
        //получаем id юзера из url (.../profile/1100)
        let userId = this.props.match.params.userId;// match относится к компоненте withRouter , через него узнаем id кликнутого пользователя match.params.userId
        if (!userId){
            userId = this.props.userId;
            if(!userId){
                this.props.history.push('/login');// програмный редирект
            }
        }
            this.props.getProfileThunkCreator(userId);
            this.props.getStatusThunkCreator (userId);
    }

    render() {
       return(
           <Profile {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatusThunkCreator}
           />


       )
   }


}




let mapStateToProps = (state)  =>({
    profile:state.profile.profile,
    status: state.profile.status,
    userId: state.profile.userId,
    isAuth: state.auth.isAuth

});


//let AuthRedirectComponent = WithAuthRedirect(ProfileAPI);
//withRouter - компонента высшего порядка, в нее через пропсы придут данные о маршруте (url) в котором мы находимся
// оборачиваем нашу ProfileAPI в компоненту withRouter для того, чтоб получить  url - /2314(...profile/2314 )
//let Url = withRouter(AuthRedirectComponent);
//export  default connect(mapStateToProps,{getProfileThunkCreator}) (Url);
export  default compose(
    connect(mapStateToProps,{getProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator}),
    withRouter,
    WithAuthRedirect
)(ProfileAPI);



