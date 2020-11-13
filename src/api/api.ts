import axios from "axios";

export const instance =  axios.create({
    withCredentials: true,
    headers: {
        "api-key":"2a358658-5509-4853-b559-d1ee110511e4"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
});


export enum resultCodeEnum{
    success = 0,
    error = 1
}
export  enum resultCodeCaptchaEnum{
    captchaIsRequired = 10
}
export type responseType={
    data:{}
    resultCode: resultCodeEnum
    messages: Array<string>
}
//создаем обобщенный тип (generic),  который можно уточнить
export type ResponseType<D={}, RC=resultCodeEnum>={
    data:D
    messages: Array<string>
    resultCode:RC
}

