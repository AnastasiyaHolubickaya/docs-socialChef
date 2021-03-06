
import React from "react";
import classes from "./myPosts.module.css";
import Post from "./post/post";
import {Field, InjectedFormProps, reduxForm} from "redux-form";
import {maxLengthCreator, requiredField} from "../../../utils/validation/validator";
import {Textarea} from "../../commons/FormControls/FormControls";
import Button from "../../Button/Button";
import {dataMyPostsType} from "../../../redux/types/types";

type propsType={
    dataMyPosts: Array <dataMyPostsType>
    addPostActionCreator: (post:string) =>void
}
type formDataType={
    post: string
}
const maxLength300 = maxLengthCreator(300);// обязательно создаем за пределами формы иначе возникнет цикличночть

const AddMyPostForm:React.FC<InjectedFormProps<formDataType>> = ({handleSubmit}) =>{
    return(
        <form onSubmit={handleSubmit} className={classes.formAddPost}>
            <div><Field name={'post'} placeholder={'post'} component={Textarea} validate={[requiredField, maxLength300]}/></div>
            <div> <Button value="добавить"/></div>
        </form>
    )
};
// reduxForm - функция редаксформ, которая возвращает hoc - в нашем случае LoginReduxForm, которая инкапсулирует в себе всю работу со стейтом
const AddMyPostReduxForm = reduxForm<formDataType>({
    form: 'mypost'//form: - это название не связано с form из store.ts
})(AddMyPostForm);


const MyPosts:React.FC<propsType> = ({dataMyPosts,addPostActionCreator }) =>{
    const onSubmit = (formData:formDataType) => {// сюда придут данные их формы, передаем эту  функцию в LoginReduxForm чтоб получить эти данные из формы
        addPostActionCreator(formData.post);// вызываем (из пропсов) функцию из BLL
    };

    return(
            <div className={classes.block}>
                <h3>My posts</h3>

                <Post dataMyPosts = {dataMyPosts}/>
                <AddMyPostReduxForm onSubmit = {onSubmit}/>
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