
import React from "react";
import profileReducer, {actionsProfile} from "./profileReducer";
import face from "../img/photo_2020-07-26_23-35-01.jpg";


let state = {
    dataMyPosts:[
        {img:face, mess:"fgdheyri vjjv ffff", like:15},
        {img:face, mess:"sdfswerw fdg", like:4},
        {img:face, mess:"dsfs", like:1}
    ],
    profile: null,
    status:""

};

test('new post should be add', () => {
    //1. тестовые данные (начальные)
    let action = actionsProfile.addPostActionCreator("rrrrrrrrrrrrr");
    //2. что хотим сделать
   let  newState = profileReducer (state,action);
   //3. ожидаемый результат
  expect(newState.dataMyPosts.length).toBe(4);
});
test('mess "rrrrrrrrrrrrr"', () => {
    let action = actionsProfile.addPostActionCreator("rrrrrrrrrrrrr");
    let  newState = profileReducer (state,action);
    expect(newState.dataMyPosts[3].mess).toBe("rrrrrrrrrrrrr");
});
test('after delete length ', () => {
    let action = actionsProfile.deletePost(15);
    let  newState = profileReducer (state,action);
    expect(newState.dataMyPosts.length).toBe(2);
});