import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";
//импортируем редаксовский редьюсер


let reducers = combineReducers(
    {
        profile: profileReducer,
        dialogs: dialogReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,//редаксовский
        app: appReducer

    }

);
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__|| compose;//для подключения к проекту расширения REDUX для google chrom
const store = createStore(reducers, composeEnhancers(
    applyMiddleware(thunkMiddleware)
));
/*
  let store = createStore(reducers,applyMiddleware(thunkMiddleware));
  window.store = store;// сохранили store в глобальный объект window
*/
export default store;