import React from "react";
import classes from './Message.module.css';
import AddMessageContainer from "./AddMessage/AddMessageContainer";
import SearchUsers from "../SearchUsers/SearchUsers";




let Counter = (props) =>{
  return  (<div className={classes.counterUsers}>
      <span className={classes.text}>всего пользователей online</span>
      <span className={classes.numbers}>26</span>
  </div>)
};



const Message = (props) =>{
    //console.log(props);
    return(
        <div className={classes.dialogs}>
            <h1>сообщения</h1>
            <SearchUsers/>
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