import React from "react";
import classes from './Message.module.css';
import AddMessage from "./AddMessage/AddMessage";
import {dataUsersType, profileType} from "../../redux/types/types";


type propsType={
    dataDialogs: Array<dataUsersType>
    login: string|null
    userId: number|null
    profile: profileType|null
    addMessActionCreator:(message:string|null, login:string|null, photo:string, userId:number)=>void
    getProfileThunkCreator:(userId:number)=>void
}

let Counter = () =>{
  return  (<div className={classes.counterUsers}>
      <span className={classes.text}>всего пользователей online</span>
      <span className={classes.numbers}>5</span>
  </div>)
};



const Message:React.FC<propsType> = ({dataDialogs,login,userId,profile,addMessActionCreator,getProfileThunkCreator}) =>{
    return(
        <div className={classes.dialogs}>
            <h1>Чат</h1>

            <Counter/>

            <AddMessage
                dataDialogs = {dataDialogs}
                login={login}
                userId={userId}
                profile={profile}
                addMessActionCreator = {addMessActionCreator}
                getProfileThunkCreator={getProfileThunkCreator}
            />
        </div>
    )
};
export  default Message;