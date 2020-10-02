import face from "../img/icons/user.jpg";



const ADD_MESS = 'ADD-MESS';

let initialState = {
    dataDialogs: [
        {photos:{small:face}, id: 1, name: 'vlad', mess: 'hi'},
        {photos:{small:face}, id: 2, name: 'alex', mess: 'тру ля ля'},
        {photos:{small:face}, id: 3, name: 'anna', mess: 'бла бла' },
        {photos:{small:face}, id: 4, name: 'mark', mess: 'ку ку'},
        {photos:{small:face}, id: 5, name: 'john', mess: 'цук цук'}
    ],
    dataMessages: [
        {id: 1, },
        {id: 2, },
        {id: 3, },
        {id: 4, },
        {id: 5, }
    ]

};


 const dialogReducer =  (state = initialState, action) => {
     switch (action.type) {

         case  ADD_MESS:
             let newArr = state.dataDialogs[state.dataDialogs.length-1];
             let id = newArr.id;
             id+=1;
             //let body = action.message;
             // {img:face, mess: state.newText, id:id, name:"unknow"} - формируем новый объект со значениями (mess берем из state, так как функция changePost его уже обновила)
             return {//делаем копию объекта, т.к. не имеет право менять state напрямую, и сразу возвращаем его
                 ...state,
                 dataDialogs: [...state.dataDialogs, {photos:face, mess: action.message, id:id, name:"unknow"}]
                 // пушим его в dataMyPosts
             };
             // dataDialogs: [...state.dataDialogs - глубоко копируем только то, что будем менять

         default:
             return state;
     }



};
export const addMessActionCreator =(message)=> ({type: ADD_MESS, message });// если функция только возвращает  можно не ставить return



export default dialogReducer;