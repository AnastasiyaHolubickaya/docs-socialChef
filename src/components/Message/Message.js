import React from "react";
import classes from './Message.module.css';
import AddMessageContainer from "./AddMessage/AddMessageContainer";
import SearchUsersContainer from "../SearchUsers/SearchUsersContainer";




let Counter = (props) =>{
  return  (<div className={classes.counterUsers}>
      <span className={classes.text}>всего пользователей online</span>
      <span className={classes.numbers}>5</span>
  </div>)
};



const Message = (props) =>{
    //console.log(props);
    return(
        <div className={classes.dialogs}>
            <h1>Чат</h1>
            <SearchUsersContainer/>
            <Counter/>

            <AddMessageContainer />

        </div>
    )
};
export  default Message;

/*<div className={classes.dialogItems}>
                {<DialogItem  dataDialogs = {props.dataDialogs}/>}
</div>
<div className={classes.messageItems}>
{<MessageItem  dataMessages = {props.dataMessages}/>}
</div>*/