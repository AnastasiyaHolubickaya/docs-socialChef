
import React from "react";
import Home from "./Home";
import {connect} from "react-redux";


const HomeApi = ({news}) =>{
    return(
        <Home news = {news} />
    )
};

let mapStateToProps = (state)  =>({
    news:state.news.news
});

export  default connect(mapStateToProps)(HomeApi);


