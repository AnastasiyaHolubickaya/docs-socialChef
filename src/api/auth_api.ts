import {instance, responseType, resultCodeEnum} from "./api";

type authResponseType = {
    data: { id: number, email: string, login: string }
    resultCode: resultCodeEnum
    messages: Array<string>
}
type loginResponseType = {
    data: { userId: number }
    resultCode: resultCodeEnum
    messages: Array<string>
}
type captchType = {
    url: string
}
export const authApi = {
    authentication() {
        return instance.get<authResponseType>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<loginResponseType>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(res => res.data);
    },
    logout() {
        return instance.delete<responseType>(`auth/login`).then(res => res.data);
    },
    getCaptcha() {
        return instance.get<captchType>(`security/get-captcha-url`).then(res => res.data);
    }
};