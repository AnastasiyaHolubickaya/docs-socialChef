import React, {useEffect} from "react";
import classes from "./AddMessage.module.css";
import Users from "../Users/Users";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validation/validator";
import {Textarea} from "../../commons/FormControls/FormControls";
import Button from "../../Button/Button";
import {addMessActionCreator} from "../../../redux/dialogReducer";

const maxLength300 = maxLengthCreator(100);

const MessageForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div><Field name={'message'} placeholder={'message'} component={Textarea} validate={[requiredField, maxLength300]}/></div>
            <div className={classes.divButtonSend}> <Button  value="отправить"/></div>
        </form>
    )
};
const MessageReduxForm = reduxForm({//контейнерная компонента,создается редаксформ над презентационной компонентой
    // a unique name for the form
    //каждая форма должна иметь уникальное строковое имя (для распознавания ее редаксформом)
    form: 'message'//form: - это название не связано с form из store.js
})(MessageForm);


class AddMessage extends  React.Component {
    //
    componentDidMount(){
       this.props.getProfileThunkCreator(this.props.userId);
    }

    onSubmit = (formData) => {// сюда придут данные их формы, передаем эту  функцию в LoginReduxForm чтоб получить эти данные из формы
       this.props.addMessActionCreator(formData.message,this.props.login, this.props.profile.photos.small, this.props.profile.userId);
    };


    render() {
        return(
            <div className={classes.block}>
                <Users massUsers={this.props.dataDialogs}/>
                <h3>Добавить сообщение</h3>
                <MessageReduxForm onSubmit = {this.onSubmit}/>
            </div>
        )

    }


}
export  default  AddMessage;

/*const AddMessage = (props) =>{
    //console.log(props)
   // let inputRef = React.createRef();

    let addMess = ()=>{//функция добавления mess
        props.addNewMess();
       // props.dispatch(addMessActionCreator());// вызываем (из пропсов) функцию из BLL
    };
    let changePost = (e) =>{ //функция изменения состояния значения инпута
        let text =e.target.value;// берем введенное значение
        props.changeMess(text);
       // props.dispatch(changePostActionCreator(text));// передаем в функцию из BLL
    };

    return(
        <div className={classes.block}>
            <Users dataDialogs = {props.dataDialogs}/>
            <h3>добавить сообщение</h3>
            <input onChange={changePost} value={props.newText}  type="text" className={`${classes.input_text} ${classes.reset_properties}`}  placeholder='your news...'/>
            <button onClick={addMess} className={`${classes.send_btn} ${classes.reset_properties}`}>Send </button>


        </div>

    )*/