import React from "react";
import {connect} from "react-redux";
import { WithAuthRedirect} from "../../hoc/WithAuthRedirect";
import Message from "./Message";
import {compose} from "redux";


class MessageApi extends  React.Component{

    componentDidMount(){

    }

    render() {
        return(
            <Message {...this.props} />


        )
    }


}




let mapStateToProps = (state)  =>({
    //isAuth: state.auth.isAuth чтоб каждый раз не передавать через пропсы данные, необходимые hoc , одорачиваем ее в connect дважды - см WithAuthRedirect.js
});

//заменяем оборачивание компонент  одной функцией - compose (идем снизу вверх)
//let AuthRedirectComponent = WithAuthRedirect(MessageApi);
//export  default connect(mapStateToProps) (AuthRedirectComponent);
export  default compose(
    connect(mapStateToProps),//2 export  default connect(mapStateToProps) (AuthRedirectComponent)
    WithAuthRedirect//1 WithAuthRedirect(MessageApi)
)(MessageApi)//(MessageApi)


