
import React from "react";
import Home from "./Home";
import {connect} from "react-redux";
import {newsType} from "../../redux/types/types";
import {AppStateType} from "../../redux/store";

type mapStatePropsType ={
    news:Array<newsType>
}
type mapDispatchPropsType={}
type ownPropsType={}
type propsType= mapStatePropsType & mapDispatchPropsType & ownPropsType;


const HomeApi:React.FC<propsType> = ({news}) =>{
    return(
        <Home news = {news} />
    )
};

let mapStateToProps = (state:AppStateType):mapStatePropsType  =>({
    news:state.news.news
});

export  default connect<mapStatePropsType, mapDispatchPropsType, ownPropsType, AppStateType>(mapStateToProps)(HomeApi);


