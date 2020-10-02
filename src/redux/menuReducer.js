

const  SET_MENU = ' SET_MENU';

let initialState = {
    menuItems:[
        {id:1, title: "главная", path:"/#"},
        {id:2, title: "чат", path:"/dialogs"},
        {id:3, title: "пользователи", path:"/users"}
    ]

};


const menuReducer =  (state = initialState, action) => {
    switch (action.type) {
        case  SET_MENU:
            return {
                ...state,
                menuItems: [...state.menuItems, action.data]
            };
        default:
            return state;
    }



};
export const setMenu =(id, title, path)=> ({type: SET_MENU, data: {id, title, path} });// если функция только возвращает  можно не ставить return



export default menuReducer;