import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";
import usersReducer from "./usersReducer";
import authReducer from "./authReducer";
import thunkMiddleware from "redux-thunk";
import { reducer as formReducer } from 'redux-form'
import appReducer from "./appReducer";
import menuReducer from "./menuReducer";
import newsReducer from "./NewsReducer";

//импортируем редаксовский редьюсер
// redux  - библиотека,  состоит из store  у которого есть  state и  reducers

let reducers = combineReducers(
    {
        profile: profileReducer,
        dialogs: dialogReducer,
        usersPage: usersReducer,
        auth: authReducer,
        form: formReducer,//редаксовский
        app: appReducer,
        headerMenu: menuReducer,
        news: newsReducer

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
// у store есть 3 основных метода -
// store.getState(), получить актуальные данные из state
// store.Subckriber(subskriber), подписаться на изменения
// store.dispatch(action) преобразовать state