import { instance, resultCodeEnum} from "./api";
import {usersType} from "../redux/types/types";

 type getUsersType={
    items: Array<usersType>
    totalCount:number
    error:string
}
 type followUnfollowType={
    data:{}
    resultCode: resultCodeEnum
    messages: Array<string>
}

export const usersApi = {
    getUsers(currentPage: number, pageSize: number) {
        return instance.get<getUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then(res => {
                return res.data
            })
    },
    getUsersForName(name: string) {
        return instance.get<getUsersType>(`users?term=${name}`)
            .then(res => {
                return res.data
            })
    },
    getFollowedUsers(friend: boolean) {
        return instance.get<getUsersType>(`users?friend=${friend}`)
            .then(res => {
                return res.data
            })
    },
    unSubscribeUsers(usersId: number) {
        return instance.delete<followUnfollowType>(`follow/${usersId}`)
            .then(res => {
                return res.data
            })
    },
    subscribeUsers(usersId: number) {
        return instance.post<followUnfollowType>(`follow/${usersId}`)
            .then(res => {
                return res.data
            })
    }
};