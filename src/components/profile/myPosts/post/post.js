
import React from "react";
import classes from "./post.module.css";


const Post = (props) =>{
   let post = [...props.dataMyPosts].reverse().map(p=>
       <div className={classes.item}>
           <img src={p.img} alt=""/>
           <span>{p.mess}</span> <br/>
           <button>Like {p.like}</button>

       </div>
   );

    return(
        <div> {post}</div>
    )



};
export  default  Post;