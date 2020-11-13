import {instance, responseType, ResponseType, resultCodeCaptchaEnum, resultCodeEnum} from "./api";


type authResponseDataType = {
     id: number, email: string, login: string
}
type loginResponseDataType = {
     userId: number
}
type captchType = {
    url: string
}

export const authApi = {
    authentication() {
        return instance.get<ResponseType<authResponseDataType>>(`auth/me`).then(res => res.data);
    },
    login(email: string, password: string, rememberMe = false, captcha: string | null = null) {
        return instance.post<ResponseType<loginResponseDataType, resultCodeEnum | resultCodeCaptchaEnum>>(`auth/login`, {
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