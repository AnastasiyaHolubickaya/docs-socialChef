/*
import {addMessActionCreator} from "../../../redux/dialogReducer";
import AddMessage from "./AddMessage";
import {connect} from "react-redux";
import {getProfileThunkCreator} from "../../../redux/profileReducer";

let mapStateToProps = (state) => {
    return {
        dataDialogs: state.dialogs.dataDialogs,
        login: state.auth.login,
        userId: state.auth.userId,
        profile: state.profile.profile
    }

};


const AddMessageContainer = connect(mapStateToProps,{addMessActionCreator, getProfileThunkCreator} )(AddMessage);//сoздаем контейнерную компоненту для AddMessage с помощью библиотеки react-redux (connect)



export  default AddMessageContainer;


 const AddMessageContainer = (props) =>{
    //console.log(props)
    // let inputRef = React.createRef();
   //

    return(
        <StoreContext.Consumer>
            { (store) => {

                let state = store.getState();
                let addMess = ()=>{//функция добавления mess
                    store.dispatch(addMessActionCreator());// вызываем (из пропсов) функцию из BLL
                };
                let changePost = (text) =>{ //функция изменения состояния значения инпута
                    store.dispatch(changePostActionCreator(text));// передаем в функцию из BLL
                };

        return (   <AddMessage changeMess={changePost}
                       addNewMess = {addMess}
                       dataDialogs = {state.dialogs.dataDialogs}
                       newText = {state.dialogs.newText}
           />)
             }
         }
        </StoreContext.Consumer>
    )
};
*/