import React from "react";
import classes from './Home.module.css';
import styled from "styled-components";
import img from "../../img/links/photo_2020-09-28_00-46-32.jpg"


const StyledLink = styled.a `
  padding: 10px;
  font-size: 9px;
  color: #00BCDF;
  font-weight: 900;
  text-decoration: none;
  :hover {
    color: #8EF3EB;
    cursor: pointer;
  }
  @media (max-width: 576px) {
   
  }
`;


const Home = ({news}) =>{
    return(
        <div className={classes.pageHome}>
            <div>
                    <h1>Интересное для frontend разработчиков</h1>
                    <div className={classes.items}>
                        {news.map(n =>
                            <div key={n.id} className={classes.item}>
                                <h5 className={classes.title}>{n.title} </h5>
                                <img src={n.img} alt=""/>
                                <p className={classes.text}>{n.description}</p>
                                <StyledLink href={n.link}>{n.link}</StyledLink>
                            </div>

                        )}
                    </div>
            </div>
        </div>
    )
};
export  default  Home;