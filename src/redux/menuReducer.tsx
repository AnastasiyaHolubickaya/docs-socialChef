

const  SET_MENU = ' SET_MENU';

type menuItemsType = {
    id: number
    title:string|null
    path:string|null
}
type initialStateType = {
    menuItems: Array<menuItemsType>
}
type dataType = {
    id: number
    title: string|null
    path:string|null
}
type actionType={
    type: typeof SET_MENU
    data: dataType
}

let initialState:initialStateType = {
    menuItems:[
        {id:1, title: "главная", path:"/#"},
        {id:2, title: "чат", path:"/dialogs"},
        {id:3, title: "пользователи", path:"/users"}
    ]
};


const menuReducer =  (state = initialState, action:actionType):initialStateType => {
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
export const setMenu =(id:number, title:string, path:string)=> ({type: SET_MENU, data: {id, title, path} });// если функция только возвращает  можно не ставить return



export default menuReducer;