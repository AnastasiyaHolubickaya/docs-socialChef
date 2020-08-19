
import {AuthThunkCreator} from "./authReducer";



const  SET_INITIALIZATION = ' SET_INITIALIZATION';

let initialState = {
    initialization: false
};


const appReducer =  (state = initialState, action) => {
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
 const setInitialization =()=> ({type: SET_INITIALIZATION });// если функция только возвращает  можно не ставить return

//thunk
export  const  InitializationThunkCreator = () => (dispatch) => {
       let promise =  dispatch(AuthThunkCreator());

    Promise.all ([promise])
        .then( () =>{// если промисов несколько оборачиваем их в массив - Promise.all ([promise]).then...
              dispatch(setInitialization() );

        });

        };

export default appReducer;