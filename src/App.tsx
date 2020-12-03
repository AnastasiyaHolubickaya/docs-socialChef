import React, {Component} from 'react';
import './App.css';
import './Media.css';
import './Fonts.css';
import Header from "./components/header/header";
import ProfileAPI from "./components/profile/profileAPI";
import HomeApi from "./components/Home/HomeApi";
import Register from "./components/Register/Register";
import {Route,  withRouter} from "react-router-dom";
import {connect} from "react-redux";
import {compose} from "redux";
import {InitializationThunkCreator} from "./redux/appReducer";
import Preloader from "./components/Preloader/Preloader";
import {WithSuspense} from "./hoc/WithSuspense";
import {AppStateType} from "./redux/store";
import { AllUsers } from './components/AllUsers/AllUsers';
import {Login} from "./components/Login/Login";

// hook
const MessageApi = React.lazy(() => import('./components/Message/MessageApi'));

type mapStatePropsType= ReturnType<typeof mapStateToProps>
type mapDispatchPropsType={
    InitializationThunkCreator:()=>void
}

const Chat = WithSuspense(MessageApi);

class App extends Component<mapDispatchPropsType& mapStatePropsType> {// делаем app классовой компонентой, т к нам нужен жизненный цикл componentDidMount

    catchAllUnhandledErrors=(promiseRejectionEvent:PromiseRejectionEvent) => {// глобальный перехват ошибок, либо локально try catch
        console.log(promiseRejectionEvent);
    };

    componentDidMount(){
        this.props.InitializationThunkCreator();
        window.addEventListener("unhandledrejection",this.catchAllUnhandledErrors );//side effect можем позволить тут - но вызывая событие прослушки*
    }
    componentWillUnmount() {
        window.removeEventListener("unhandledrejection",this.catchAllUnhandledErrors );//* обязательно снимаем его когда компонента размонтировалась
    }

    render() {
        if(!this.props.initialization){
            return <Preloader/>
        }


        return (

            <div className="App">
                <header><Header/></header>
                <div className='content'>
                        <Route path='/dialogs' render={() => <Chat/>}/>
                        <Route path='/register' render={() => <Register/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileAPI/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/users' render={() => <AllUsers/>}/>
                        <Route exact path='/' render={() => <HomeApi/>}/>
                </div>
            </div>
        );
    }
}
const mapStateToProps=(state:AppStateType) => ({
    initialization: state.app.initialization
});

// когда мы коннектим компоненту сбивается Route ,
// поэтому оборачивает connect в withRouter, чтоб корректно работали Route
export default compose (
    withRouter,
    connect (mapStateToProps, {InitializationThunkCreator})
)( App)as React.ComponentType;

/*со <Switch/> не работает переход - в адресной строке меняется адрес а перехода на страницу не происхоит
// <Switch/> нужен для распознавания более уточненных адресов, например

"/login/treyteyte" - если встретится на пути такой адрес (более уточненный), Switch дальше не пойдет
"/login" поэтому короткие адреса вставляем ниже по иерархии
*/

//<Route path='*' render={() => <div> 404 not found </div>}/>


/*dataDialogs = {props.state.dialogs.dataDialogs}
                dispatch = {props.dispatch}
                newText = {props.state.dialogs.newText}

                dataMyPosts = {props.state.profile.dataMyPosts}
                  dispatch = {props.dispatch}
                  newText = {props.state.profile.newText}
//:userId? - добавляем параметр к пути, чтоб можно было его получить из match.params.userId
 */
