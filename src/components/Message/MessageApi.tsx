import React from "react";
import {connect} from "react-redux";
import { WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import Message from "./Message";
import {compose} from "redux";
import {addMessActionCreator} from "../../redux/dialogReducer";
import {getProfileThunkCreator} from "../../redux/profileReducer";
import {dataUsersType, profileType} from "../../redux/types/types";
import {AppStateType} from "../../redux/store";


type mapStatePropsType={
    dataDialogs: Array<dataUsersType>
    login: string|null
    userId: number|null
    profile: profileType
}
type mapDispatchPropsType={
    addMessActionCreator:(message:string|null, login:string|null, photo:string, userId:number)=>void
    getProfileThunkCreator:(userId:number)=>void
}
type ownProps={}

type propsType = mapStatePropsType & mapDispatchPropsType & ownProps;


class MessageApi extends  React.Component<propsType>{

    componentDidMount(){
    }

    render() {
        return(
            <Message
                dataDialogs = {this.props.dataDialogs}
                login={this.props.login}
                  userId={this.props.userId}
                  profile={this.props.profile}
                 addMessActionCreator = {this.props.addMessActionCreator}
                  getProfileThunkCreator={this.props.getProfileThunkCreator}
            />
        )
    }


}

let mapStateToProps = (state:AppStateType):mapStatePropsType =>({
    dataDialogs: state.dialogs.dataDialogs,
    login: state.auth.login,
    userId: state.auth.userId,
    profile: state.profile.profile
});
// чтоб каждый раз не передавать через пропсы данные, необходимые hoc , одорачиваем ее в connect дважды - см WithAuthRedirect.js
//заменяем оборачивание компонент  одной функцией - compose (идем снизу вверх)
//let AuthRedirectComponent = WithAuthRedirect(MessageApi);
//export  default connect(mapStateToProps) (AuthRedirectComponent);
export  default compose(
    connect (
        mapStateToProps,
        {addMessActionCreator, getProfileThunkCreator}),//2 export  default connect(mapStateToProps) (AuthRedirectComponent)
    WithAuthRedirect//1 WithAuthRedirect(MessageApi)
)(MessageApi)//(MessageApi)


