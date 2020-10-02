import classes from "../Message/Message.module.css";
import React from "react";
import Button from "../Button/Button";
import {Field, reduxForm} from "redux-form";
import {Input} from "../commons/FormControls/FormControls";
import Users from "../Message/Users/Users";



const SearchUsersForm = (props) =>{
    return(
        <form onSubmit={props.handleSubmit}>
            <div className={classes.search}>
            <div className={classes.inputSearch}><Field  type="text" name={'searchUsers'} placeholder={'введите имя'} component={Input} /></div>
            <div className={classes.buttonSearch}> <Button  value="поиск"/></div>
            </div>
        </form>
    )
};
const SearchUsersReduxForm = reduxForm({//контейнерная компонента,созда-
    // a unique name for the form
    //каждая форма должна иметь уникальное строковое имя (для распознавания ее редаксформом)
    form: 'searchUsers'//form: - это название не связано с form из store.js
})(SearchUsersForm);//-ется редаксформ над презентационной компонентой



const SearchUsers = (props) =>{
    const onSubmit = (formData) => {// сюда придут данные их формы, передаем эту  функцию в LoginReduxForm чтоб получить эти данные из формы
        props.getUsersSearchThunkCreator(formData.searchUsers);
    };


    return ( <div className={classes.searchUsers}>
                 <SearchUsersReduxForm onSubmit = {onSubmit}/><br/>
                 <div>
                     <Users massUsers={props.users}/>
                 </div>
            </div>)
};

export  default SearchUsers;