
import { AuthThunkCreator} from "./authReducer";
import { BaseThuncType, InferActionType} from "./store";
import {FormAction} from "redux-form";

let initialState = {
    initialization: false
};
export type initialStateType  = typeof initialState;

type ActionsType= InferActionType<typeof  actions>;
type thuncType = BaseThuncType<ActionsType| FormAction>

const appReducer =  (state = initialState, action:ActionsType):initialStateType => {
    switch (action.type) {
        case  "SET_INITIALIZATION":
            return {
                ...state,
                initialization: true
            };
        default:
            return state;
    }
};

export const actions={
     setInitialization:()=> ({type: "SET_INITIALIZATION" }as const)// если функция только возвращает  можно не ставить return
 };
//thunk
export  const  InitializationThunkCreator = ():thuncType=> async (dispatch) => {
       let promise = await dispatch(AuthThunkCreator());
    Promise.all ([promise])
        .then( () =>{// если промисов несколько оборачиваем их в массив - Promise.all ([promise]).then...
              dispatch(actions.setInitialization() );
        });
        };

export default appReducer;