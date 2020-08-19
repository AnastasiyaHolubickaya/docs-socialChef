import React from "react";

import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

let  mapStateToPropsRedirect = (state) =>({
    isAuth: state.auth.isAuth
});

 export const WithAuthRedirect = (Component) =>{
    class RedirectComponent extends  React.Component{
        render() {
            if (!this.props.isAuth) return <Redirect to = '/login'/>;
            return <Component{...this.props}/>
        }
    }
    let ConnectAuthRedirect = connect (mapStateToPropsRedirect)(RedirectComponent);//дважды оборачиваем компоненту в connect чтоб взять из пропсов необходимое let  mapStateToPropsRedirect =...

    return ConnectAuthRedirect;
};
//WithAuthRedirect - hoc (компонента высшего порядка) функция, которая принимает
//как параметр компоненту и возвращает к ней контейнерную компоненту
// в данном случаее hoc делает перенаправление (с помошью компоненты Redirect)на другую страницу согласно условия