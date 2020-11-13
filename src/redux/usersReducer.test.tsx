import usersReducer, {actions, initialState} from "./usersReducer";
import {usersType} from "./types/types";

//исходные данные для теста
let state: initialState;
beforeEach(() => {//после каждого теста state возвращаем в оригинальное состояние
    state = {
        users: [
            {
                id: 0, name: "alex", status: "status1", followed: false,
                photos: {small: null, large: null}
            },
            {
                id: 1, name: "al", status: "status2", followed: true,
                photos: {small: null, large: null}
            },
            {
                id: 2, name: "lex", status: "status3", followed: false,
                photos: {small: null, large: null}
            },
            {
                id: 3, name: "alt", status: "status4", followed: true,
                photos: {small: null, large: null}
            },
        ],
        searchUsersForName: [] as Array<usersType>,
        usersFollowed: [] as Array<usersType>,
        pageSize: 5,
        usersCount: 0,
        currentPage: 1,
        friend: true,
        isFetching: false,
        isFollowingProgress: [] //массив id пользователей
    };
});

test("follow success", () => {
    //что проверяем (follow)
    const newState = usersReducer(state, actions.follow(2));
    //что ожидаем получить
    expect(newState.users[0].followed).toBeFalsy();
    expect(newState.users[2].followed).toBeTruthy();
});
test("unfollow success", () => {
    //что проверяем (unfollow)
    const newState = usersReducer(state, actions.unfollow(3));
    //что ожидаем получить
    expect(newState.users[1].followed).toBeTruthy();
    expect(newState.users[3].followed).toBeFalsy();
});