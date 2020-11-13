import {actions, followThunkCreator, unFollowThunkCreator} from "./usersReducer";
import {usersApi} from "../api/users_api";
import {ResponseType, resultCodeEnum} from "../api/api";

//стартовые данные
jest.mock("../api/users_api");
const userApiMock = usersApi as jest.Mocked<typeof usersApi>;

const result: ResponseType = {
    resultCode: resultCodeEnum.success,
    messages: [],
    data: {}
};
userApiMock.subscribeUsers.mockReturnValue(Promise.resolve(result));
userApiMock.unSubscribeUsers.mockReturnValue(Promise.resolve(result));

const dispatchMock = jest.fn();//создаем фейковый диспатч
const getStateMock = jest.fn();//создаем фейковую getState()
beforeEach(() => {//после каждого теста state возвращаем в оригинальное состояние
    dispatchMock.mockClear();
    getStateMock.mockClear();
});

test("followThunk called dispatch", async () => {
    //стартовые данные
    const thunk = followThunkCreator(1);
    //что проверяем (thunk)
    await thunk(dispatchMock, getStateMock, {});
    //что ожидаем получить
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setToggleIsFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.follow( 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setToggleIsFollowing(false, 1))
});

test("unfollowThunk called dispatch", async () => {
    //стартовые данные
    const thunk = unFollowThunkCreator(1);
    //что проверяем (thunk)
    await thunk(dispatchMock, getStateMock, {});
    //что ожидаем получить
    expect(dispatchMock).toBeCalledTimes(3);
    expect(dispatchMock).toHaveBeenNthCalledWith(1, actions.setToggleIsFollowing(true, 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(2, actions.unfollow( 1))
    expect(dispatchMock).toHaveBeenNthCalledWith(3, actions.setToggleIsFollowing(false, 1))
});