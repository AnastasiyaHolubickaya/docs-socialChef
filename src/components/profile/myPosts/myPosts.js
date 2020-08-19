
import React from "react";
import classes from "./myPosts.module.css";
import Post from "./post/post";
import {Field, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validation/validator";
import {Textarea} from "../../commons/FormControls/FormControls";
import Button from "../../Button/Button";

const maxLength10 = maxLengthCreator(10);// обязательно создаем за пределами формы иначе возникнет цикличночть

const AddMyPostForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div><Field name={'post'} placeholder={'post'} component={Textarea} validate={[requiredField, maxLength10]}/></div>
            <div> <Button value="добавить"/></div>
        </form>
    )
};
// reduxForm - функция редаксформ, которая возвращает hoc - в нашем случае LoginReduxForm, которая инкапсулирует в себе всю работу со стейтом
const AddMyPostReduxForm = reduxForm({
    form: 'mypost'//form: - это название не связано с form из store.js
})(AddMyPostForm);

const MyPosts = (props) =>{
    console.log('render');
    const onSubmit = (formData) => {// сюда придут данные их формы, передаем эту  функцию в LoginReduxForm чтоб получить эти данные из формы
        props.addPost(formData.post);// вызываем (из пропсов) функцию из BLL
    };

    return(
            <div className={classes.block}>
                <h3>My posts</h3>
                <AddMyPostReduxForm onSubmit = {onSubmit}/>
                <Post dataMyPosts = {props.dataMyPosts}/>

            </div>

    )
};
export  default  MyPosts;

/*const MyPosts = (props) =>{
    //console.log(props);


    let addPosts = ()=>{//функция добавления поста
        props.addPost();// вызываем (из пропсов) функцию из BLL
    };
    let changePost = (e) =>{ //функция изменения состояния значения инпута
        let text =e.target.value;// берем введенное значение
        props.changePost(text);// передаем в функцию из BLL
    };

    return(
            <div className={classes.block}>
                <h3>My posts</h3>
                <input onChange={changePost} value={props.newText}  type="text" className={`${classes.input_text} ${classes.reset_properties}`}  placeholder='your news...'/>
                <button onClick={addPosts} className={`${classes.send_btn} ${classes.reset_properties}`}>Send </button>
                <Post dataMyPosts = {props.dataMyPosts}/>

            </div>

    )
};*/