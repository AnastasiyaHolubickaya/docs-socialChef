import React, {Component} from 'react';
import './App.css';
import './Media.css';
import './Fonts.css';
import Header from "./components/header/header";
import News from "./components/news/news";
import ProfileAPI from "./components/profile/profileAPI";

import Home from "./components/Home/Home";
import Register from "./components/Register/Register";
import Recipes from "./components/Recipes/Recipes";
import Universal from "./components/Universal/Universal";
import Login from "./components/Login/Login";

import {Route, withRouter} from "react-router-dom";
import AllUsersAPI from "./components/AllUsers/AllUsersAPI";
//import MessageApi from "./components/Message/MessageApi";
import {connect} from "react-redux";
import {compose} from "redux";
import {InitializationThunkCreator} from "./redux/appReducer";
import Preloader from "./components/Preloader/Preloader";
import {WithSuspense} from "./hoc/WithSuspense";// hook

const MessageApi = React.lazy(() => import('./components/Message/MessageApi'));

class App extends Component {// делаем app классовой компонентой, т к нам нужен жизненный цикл componentDidMount

    componentDidMount(){

        this.props.InitializationThunkCreator();

    }

    render() {
        if(!this.props.initialization){
            return <Preloader/>
        }
        return (

            <div className="App">
                <header><Header/></header>
                <nav> </nav>
                <div className='content'>
                    <Route exact path='/'
                           render={() => <Home/>}/>

                    <Route exact path='/recipes' render={() => <Recipes/>}/>
                    <Route path='/news' render={() => <News/>}/>
                    <Route path='/dialogs' render={WithSuspense(MessageApi)}/>
                    <Route path='/register' render={() => <Register/>}/>
                    <Route path='/soup' render={() => <Universal/>}/>
                    <Route path='/meet' render={() => <Universal/>}/>
                    <Route path='/fish' render={() => <Universal/>}/>
                    <Route path='/bread' render={() => <Universal/>}/>
                    <Route path='/cookis' render={() => <Universal/>}/>
                    <Route path='/profile/:userId?' render={() =>
                        <ProfileAPI//:userId? - добавляем параметр к пути, чтоб можно было его получить из match.params.userId

                        />}/>
                    <Route path='/login' render={() => <Login/>}/>
                    <Route path='/users' render={() => <AllUsersAPI/>}/>
                </div>

                {/*<Profile/>*/}
            </div>

        );
    }
}
const mapStateToProps=(state) => ({
    initialization: state.app.initialization
});

// когда мы коннектим компоненту сбивается Route ,
// поэтому оборачивает connect в withRouter, чтоб корректно работали Route
export default compose (
    withRouter,
    connect (mapStateToProps, {InitializationThunkCreator})
)( App);






/*dataDialogs = {props.state.dialogs.dataDialogs}
                dispatch = {props.dispatch}
                newText = {props.state.dialogs.newText}

                dataMyPosts = {props.state.profile.dataMyPosts}
                  dispatch = {props.dispatch}
                  newText = {props.state.profile.newText}

 */