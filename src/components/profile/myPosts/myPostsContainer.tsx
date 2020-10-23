
import MyPosts from "./myPosts";
import {addPostActionCreator} from "../../../redux/profileReducer";
import {connect} from "react-redux";
import {dataMyPostsType} from "../../../redux/types/types";
import {AppStateType} from "../../../redux/store";

type mapStatePropsType={
    dataMyPosts: Array <dataMyPostsType>
}
type mapDispatchPropsType={
    addPostActionCreator:(post:string)=>void
}

let mapStateToProps = (state:AppStateType):mapStatePropsType => ({
        dataMyPosts: state.profile.dataMyPosts
});


// @ts-ignore
const MyPostsContainer = connect  (mapStateToProps,{addPostActionCreator})(MyPosts);




export  default  MyPostsContainer;

/*const MyPostsContainer = (props) =>{
    //console.log(props)


    return(

        <StoreContext.Consumer>
            { (store) =>{

                let state = store.getState();


                let addPosts = ()=>{//функция добавления поста
                    store.dispatch(addPostActionCreator());
                };
                let changePost = (text) =>{ //функция изменения состояния значения инпута
                    store.dispatch(changePostActionCreator(text));
                };


               return(     <MyPosts
                            addPost = {addPosts}
                            changePost = {changePost}
                            dataMyPosts = {state.profile.dataMyPosts}
                            newText = {state.profile.newText}/>
                      )
             }
        }
        </StoreContext.Consumer>
    )
};*/