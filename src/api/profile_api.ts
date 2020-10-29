import {photoType, profileType} from "../redux/types/types";
import {instance, responseType, resultCodeEnum} from "./api";

export const profileApi = {
    getProfile(userId: number | null) {
        return instance.get<profileType>(`profile/` + userId).then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get(`profile/status/` + userId);
    },
    updateStatus(status: string) {
        //отправляем на сервер объект у которого есть свойство status: (эти данные
        // берем из API документации, которую нам должен предоставить backend разработчик
        return instance.put<responseType>(`profile/status/`, {status: status}).then(res => res.data);
    },
    addPhoto(file: any) {
        //отправляем на сервер объект у которого есть свойство status: (эти данные
        // берем из API документации, которую нам должен предоставить backend разработчик
        let formData = new FormData();
        formData.append("image", file);
        return instance.put<updatePhotoType>(`profile/photo/`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => res.data);

    },
    saveProfile(profile: profileType) {
        return instance.put<responseType>(`profile/`, profile).then(res => res.data);
    },
};
type updatePhotoType = {
    resultCode: resultCodeEnum
    messages: Array<string>
    data: photoType
}