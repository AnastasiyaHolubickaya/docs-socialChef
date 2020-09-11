
import React from "react";
import classes from "./post.module.css";
import face from "../../../../img/icons/user.jpg";

const Post = (props) =>{
   let post = [...props.dataMyPosts].reverse().map(p=>
       <div key={p.id} className={classes.item}>
           <img src={p.img||face} alt=""/>
           <span>блок My Posts - {p.mess}</span> <br/>
           <button>Like {p.like}</button>

       </div>
   );

    return(
        <div> {post}</div>
    )



};
export  default  Post;