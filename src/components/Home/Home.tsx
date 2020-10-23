import React from "react";
import classes from './Home.module.css';
import styled from "styled-components";
import img from "../../img/links/photo_2020-09-28_00-46-32.jpg"
import {newsType} from "../../redux/types/types";


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

type propsType={
    news:Array<newsType>
}

const Home:React.FC<propsType> = ({news}) =>{


    return(
        <div className={classes.pageHome}>
            <div>
                    <h1>Интересное для frontend разработчиков</h1>
                    <h4>(информация взята из телеграмм-группы <a href="https://t.me/FrontendKlondike"> Frontend Klondike</a>)</h4>
                    <div className={classes.items}>
                        {news.map(n =>
                            <div key={n.id} className={classes.item}>
                                <h5 className={classes.title}>{n.title} </h5>
                                { // @ts-ignore
                                     }<img src={n.img} alt=""/>

                                <p className={classes.text}>{n.description}</p>
                                { // @ts-ignore
                                }<StyledLink href={n.link}>{n.link}</StyledLink>

                            </div>
                        )}
                    </div>
            </div>
        </div>
    )
};
export  default  Home;