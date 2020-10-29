
import {AuthThunkCreator} from "./authReducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {Dispatch} from "redux";

const  SET_INITIALIZATION = ' SET_INITIALIZATION';

let initialState = {
    initialization: false
};
export type initialStateType  = typeof initialState;
type actionType = {
    type: typeof SET_INITIALIZATION
}
type thuncType = ThunkAction<Promise<void>,AppStateType,unknown, actionType>
type dispatchType= Dispatch<actionType>

const appReducer =  (state = initialState, action:actionType):initialStateType => {
    switch (action.type) {
        case  SET_INITIALIZATION:
            return {
                ...state,
                initialization: true
            };
        default:
            return state;
    }
};

 const setInitialization =():actionType=> ({type: SET_INITIALIZATION });// если функция только возвращает  можно не ставить return

//thunk
export  const  InitializationThunkCreator = () => (dispatch:any) => {
       let promise =  dispatch(AuthThunkCreator());
    Promise.all ([promise])
        .then( () =>{// если промисов несколько оборачиваем их в массив - Promise.all ([promise]).then...
              dispatch(setInitialization() );
        });
        };

export default appReducer;