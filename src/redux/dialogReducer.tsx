import face from "../img/icons/user.jpg";
import {dataUsersType} from "./types/types";
import {InferActionType} from "./store";


type initialStateType = {
    dataDialogs:Array<dataUsersType>
}
type ActionsType=InferActionType<typeof actionsDialog>;

let initialState:initialStateType = {
    dataDialogs: [
        {photos:{small:face}, id: 1, name: 'АНАСТАСИЯ', mess: 'hi'},
        {photos:{small:face}, id: 2, name: 'SAMURAI DIMYCH', mess: 'hi'},
        {photos:{small:face}, id: 3, name: 'ALEXANDERKHODARYONOK', mess: 'hi' },
        {photos:{small:face}, id: 4, name: 'MARINA', mess: 'hi'},
        {photos:{small:face}, id: 5, name: 'ESSEDGER', mess: 'hi'}
    ]
};

 const dialogReducer =  (state = initialState, action:ActionsType):initialStateType => {
     switch (action.type) {
         case  "ADD_MESS":
             return {//делаем копию объекта, т.к. не имеет право менять state напрямую, и сразу возвращаем его
                 ...state,
                 dataDialogs: [...state.dataDialogs, {photos:{small:action.photo}, mess: action.message,  name:action.login, id: action.userId}]
             };
             // dataDialogs: [...state.dataDialogs - глубоко копируем только то, что будем менять
         default:
             return state;
     }
};

 export const actionsDialog={
     addMessActionCreator:(message:string|null, login:string|null, photo:string, userId:number)=> ({type: "ADD_MESS", login,message,photo,userId} as const)
};

export default dialogReducer;

/*let newArr = state.dataDialogs[state.dataDialogs.length-1];
             let id = newArr.id;
             id=id+1;*/