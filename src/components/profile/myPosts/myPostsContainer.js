
import MyPosts from "./myPosts";
import {addPostActionCreator} from "../../../redux/profileReducer";
import {connect} from "react-redux";


let mapStateToProps = (state) => {
    return {
        dataMyPosts: state.profile.dataMyPosts
    }

};
let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (post) => {
            dispatch(addPostActionCreator(post));
        }
    }
};

const MyPostsContainer = connect (mapStateToProps,mapDispatchToProps)(MyPosts);




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