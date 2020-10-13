import face from "../img/icons/user.jpg";




const ADD_MESS = 'ADD-MESS';

type photoType={
    small:string|null
    large?:string|null
}
type dataUsersType ={
    photos:photoType
    id: number|null
    name: string|null
    mess: string|null
}
type initialStateType = {
    dataDialogs:Array<dataUsersType>
}
type actionType={
    type: typeof ADD_MESS
    message: string|null
   photo:string|null
    login: string|null
    userId: number|null
}

let initialState:initialStateType = {
    dataDialogs: [
        {photos:{small:face}, id: 1, name: 'vlad', mess: 'hi'},
        {photos:{small:face}, id: 2, name: 'alex', mess: 'тру ля ля'},
        {photos:{small:face}, id: 3, name: 'anna', mess: 'бла бла' },
        {photos:{small:face}, id: 4, name: 'mark', mess: 'ку ку'},
        {photos:{small:face}, id: 5, name: 'john', mess: 'цук цук'}
    ]
};


 const dialogReducer =  (state = initialState, action:actionType):initialStateType => {
     switch (action.type) {
         case  ADD_MESS:
             return {//делаем копию объекта, т.к. не имеет право менять state напрямую, и сразу возвращаем его
                 ...state,
                 dataDialogs: [...state.dataDialogs, {photos:{small:action.photo}, mess: action.message,  name:action.login, id: action.userId}]
             };
             // dataDialogs: [...state.dataDialogs - глубоко копируем только то, что будем менять

         default:
             return state;
     }



};
export const addMessActionCreator =(message:string|null, login:string|null, photo:string, userId:number):actionType=> ({type: ADD_MESS, login,message,photo,userId});// если функция только возвращает  можно не ставить return



export default dialogReducer;

/*let newArr = state.dataDialogs[state.dataDialogs.length-1];
             let id = newArr.id;
             id=id+1;*/