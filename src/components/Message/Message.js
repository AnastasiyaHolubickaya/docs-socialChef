import React from "react";
import classes from './Message.module.css';
import AddMessageContainer from "./AddMessage/AddMessageContainer";




let Search = (props) =>{
  return ( <div className={classes.searchUsers}>
      <div className={classes.title}>
          <h1>Сообщения</h1>
      </div>
      <div className={classes.search}>
          <input className={classes.inputSearch} type="text" placeholder='введите имя'/>
          <button className={classes.buttonSearch}> поиск</button>
      </div>
  </div>)
};

let Counter = (props) =>{
  return  (<div className={classes.counterUsers}>
      <span className={classes.text}>всего пользователей</span>
      <span className={classes.numbers}>26</span>
  </div>)
};

let Viewing = (props) =>{
  return  (
      <div className={classes.viewingInfo}> Просмотр 1 - 20 из {26} активных пользователей </div>
  )
};



const Message = (props) =>{
    //console.log(props);
    return(
        <div className={classes.dialogs}>
            <Search/>
            <Counter/>
            <Viewing/>
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