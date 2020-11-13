/*
import face from "../img/avatar.jpg";
import profileReducer from "./profileReducer";
import dialogReducer from "./dialogReducer";



let store = {
    _state: {
        dialogs: {
            dataDialogs: [
                {img:face, id: 1, name: 'vlad', mess: 'hi'},
                {img:face, id: 2, name: 'alex', mess: 'тру ля ля'},
                {img:face, id: 3, name: 'anna', mess: 'бла бла' },
                {img:face, id: 4, name: 'mark', mess: 'ку ку'},
                {img:face, id: 5, name: 'john', mess: 'цук цук'}
            ],
            dataMessages: [
                {id: 1, },
                {id: 2, },
                {id: 3, },
                {id: 4, },
                {id: 5, }
            ],
            newText:'введите сообщение'
        },
        profile:{
            dataMyPosts:[
                {img:face, mess:"fgdheyri vjjv ffff", like:15},
                {img:face, mess:"sdfswerw fdg", like:4},
                {img:face, mess:"dsfs", like:1}
            ],
            newText:'введите сообщение'
        }

    },
    _reRender(){ },

    getState(){
        return this._state;
    },
    subscribe(observer){//это паттерн observer (наблюдатель) по этому же паттерну работают addEventListener onClick и т.д.
        this._reRender = observer;
    },
    dispatch(action){
        this._state.profile =  profileReducer(this._state.profile, action);
        this._state.dialogs =  dialogReducer(this._state.dialogs, action);
        this._reRender(this._state);
    }



};






window.store = store;*/
/*

//для того, чтоб не создавать циклическую зависимость (не импортировать в этот файл функцию reRender из index.tsx)
// объявляем функцию пустую
let reRender = () =>{ };

// создаем наблюдателя (который получает некий параметр), експортируем его (в файл index.tsx)
//в index.tsx вызываем и передаем параметром функцию reRender (subscribe(reRender);)
//переопределям нашу пустую (let reRender = () =>{ };) в observer (а тут уже находится функция перерисовки состояния)
export  const subscribe = (observer)=>{//это паттерн observer (наблюдатель) по этому же паттерну работают addEventListener onClick и т.д.
    reRender = observer;
};

 export let addPost = ()=>{
     let newPost ={img:face, mess: state.profile.newText, like:0 };// формируем новый объект со значениями (mess берем из state, так как функция changePost его уже обновила)
     state.profile.dataMyPosts.push(newPost);// пушим его в dataMyPosts
     state.profile.newText=''; //обнуляем значение newText (чистим поле ввода)
     reRender(state);
 };
export let changePost = (newText) =>{ //функция принимает  значение из UI
    state.profile.newText = newText; // переписывает значение newText в state
    reRender(state);
};



export default store;
*/