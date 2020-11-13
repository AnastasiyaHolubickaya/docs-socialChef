import React from "react";

import {Redirect} from "react-router-dom";
import {connect} from "react-redux";
import {AppStateType} from "../redux/store";

let  mapStateToPropsRedirect = (state:AppStateType) =>({
    isAuth: state.auth.isAuth
}as mapStatePropsType);
type mapStatePropsType={
    isAuth:boolean
}
type mapDispatchPropsType={
}
 export function WithAuthRedirect <CP>(Component:React.ComponentType<CP>) {
     const RedirectComponent:React.FC<mapStatePropsType & mapDispatchPropsType> = (props) => {
        let {isAuth, ...restProps}=props
         if (!isAuth) return <Redirect to='/login'/>;
         return <Component{...restProps as CP}/>
     }

     let ConnectAuthRedirect = connect<mapStatePropsType,mapDispatchPropsType,CP, AppStateType> (mapStateToPropsRedirect)(RedirectComponent);//дважды оборачиваем компоненту в connect чтоб взять из пропсов необходимое let  mapStateToPropsRedirect =...

    return ConnectAuthRedirect;
}
//WithAuthRedirect - hoc (компонента высшего порядка) функция, которая принимает
//как параметр компоненту и возвращает к ней контейнерную компоненту
// в данном случаее hoc делает перенаправление (с помошью компоненты Redirect)на другую страницу согласно условия