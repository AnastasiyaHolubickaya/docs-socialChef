import React from "react";
import classes  from './MessageItem.module.css'
//import {NavLink} from "react-router-dom";


const MessageItem = (props) =>{
   let message = props.dataMessages.map(e=>
       <div key={e.id} className={classes.message}> {e.mess}</div>
   );
    return <div> {message}</div>
};

export  default  MessageItem;