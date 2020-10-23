
import React from "react";
import classes from "./post.module.css";
import face from "../../../../img/hotpng.com (2).png";
import styled from "styled-components";
import {dataMyPostsType} from "../../../../redux/types/types";
type propsType={
    dataMyPosts: Array <dataMyPostsType>
}

const StyledLink = styled.a `
  font-size:14px;
  color: #00BCDF;
  font-weight: 900;
  text-decoration: none;
  :hover {
    color: #8EF3EB;
    cursor: pointer;
  }
  @media (max-width: 576px) {
   font-size: 8px;
  }
`;



const Post:React.FC<propsType> = ({dataMyPosts}) =>{
   let post = [...dataMyPosts].reverse().map(p=>
       <div key={p.id} className={classes.item}>
           <img src={p.img||face} alt=""/>
           <div>
               <span> {p.mess}</span>
                <StyledLink href={p.link}> {p.link} </StyledLink>
           </div>


       </div>
   );

    return(
        <div> {post}</div>
    )



};
export  default  Post;