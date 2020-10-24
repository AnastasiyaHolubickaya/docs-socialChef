
import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getProfileThunkCreator,
    getStatusThunkCreator, saveProfileThunkCreator,
    updateProfilePhotoThunkCreator,
    updateStatusThunkCreator
} from "../../redux/profileReducer";
import {withRouter} from "react-router-dom";
import {compose} from "redux";
import {getFollowedUsersThunkCreator} from "../../redux/usersReducer";
import {profileType, usersType} from "../../redux/types/types";
import {AppStateType} from "../../redux/store";

type mapStatePropsType={
    profile: profileType
    status: string|null,
    userId: number|null,
    isAuth: boolean,
    usersFollowed:Array<usersType>
    friend:boolean
}

type mapDicpatchPropeType={
    getFollowedUsersThunkCreator:(friend:boolean)=>void
    getProfileThunkCreator:(userId:number)=>void
    getStatusThunkCreator:(userId:number)=>void
    updateStatusThunkCreator:(status:string)=>void
    updateProfilePhotoThunkCreator:(file:any)=>void
    saveProfileThunkCreator:(profile:profileType)=>void
}
type ownPropsType={
    match:any
}
type propsType= mapStatePropsType & mapDicpatchPropeType & ownPropsType;



class ProfileAPI extends  React.Component<propsType>{
    refresh() {
        //получаем id юзера из url (.../profile/1100)
        let userId = this.props.match.params.userId;// match относится к компоненте withRouter , через него узнаем id кликнутого пользователя match.params.userId
        if (!userId){
            userId = this.props.userId;
            if(!userId){
                // @ts-ignore
                this.props.history.push('/login');// програмный редирект
            }
        }
        this.props.getProfileThunkCreator(userId);
        this.props.getStatusThunkCreator (userId);
        this.props.getFollowedUsersThunkCreator(this.props.friend)
    }

// в componentDidMount() можно делать side effects (ajax запросы, setTimeOut, обращение к дом элементам напрямую)
    componentDidMount(){
        this.refresh();
    }
    componentDidUpdate(prevProps:propsType, prevState:any, snapshot:any) {//используем обязательно с условием, чтоб не зациклить
        if(this.props.match.params.userId !== prevProps.match.params.userId){
            this.refresh();
        }
    }

    render() {
       return(
           <Profile {...this.props}
                    profile={this.props.profile}
                    status={this.props.status}
                    updateStatus={this.props.updateStatusThunkCreator}
                    clickUserId = {!this.props.match.params.userId}
                    savePhoto = {this.props.updateProfilePhotoThunkCreator}
                    saveProfile = {this.props.saveProfileThunkCreator}
                    usersFollowed = {this.props.usersFollowed}
           />
       )
   }
}
let mapStateToProps = (state:AppStateType):mapStatePropsType  =>({
    profile:state.profile.profile,
    status: state.profile.status,
    userId: state.auth.userId,
    isAuth: state.auth.isAuth,
    usersFollowed: state.usersPage.usersFollowed,
    friend: state.usersPage.friend
});
export  default compose(
    connect<mapStatePropsType, mapDicpatchPropeType, ownPropsType, AppStateType>(mapStateToProps,{getFollowedUsersThunkCreator, getProfileThunkCreator, getStatusThunkCreator, updateStatusThunkCreator, updateProfilePhotoThunkCreator, saveProfileThunkCreator}),
    withRouter
)(ProfileAPI);

//let AuthRedirectComponent = WithAuthRedirect(ProfileAPI);
//withRouter - компонента высшего порядка, в нее через пропсы придут данные о маршруте (url) в котором мы находимся
// оборачиваем нашу ProfileAPI в компоненту withRouter для того, чтоб получить  url - /2314(...profile/2314 )
//let Url = withRouter(AuthRedirectComponent);
//export  default connect(mapStateToProps,{getProfileThunkCreator}) (Url);
//connect создает контейнерную компоненту над презентационной,
// которая подписывается на изменения в store, берет из него данные и
// передает в mapStateToProps, там данные сравниваются и если изменились
// компонента переисовывается
//также запускает mapdispatchtoprops, получает колбеки и передает внутрь
// презентационной компоненты, которую отрисовывает