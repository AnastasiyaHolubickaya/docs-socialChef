import * as axios from "axios";

const instance =  axios.create({
    withCredentials: true,
    headers: {
        "api-key":"2a358658-5509-4853-b559-d1ee110511e4"
    },
    baseURL: "https://social-network.samuraijs.com/api/1.0/"
});

export const usersApi = {
    getUsers (currentPage, pageSize)  {

        return instance.get(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })

    },
    unSubscribeUsers(usersId) {
        return instance.delete(`follow/${usersId}`)
            .then(response => {
                return response.data
            })
    },
    subscribeUsers(usersId) {
        return instance.post(`follow/${usersId}`)
            .then(response => {
                return response.data
            })
    }

};
 export const authApi = {
     authentication () {
         return    instance.get(`auth/me`);
     },
     login(email, password, rememberMe = false, captcha = null){
         return    instance.post(`auth/login`,{email, password, rememberMe,captcha });
     },
     logout(){
         return    instance.delete(`auth/login`);

     },
     getCaptcha(){
         return  instance.get(`security/get-captcha-url`);
     }
 };

 export const profileApi  = {
    getProfile(userId) {
        return instance.get(`profile/`+ userId);

    },
    getStatus(userId) {
        return instance.get(`profile/status/`+ userId);
    },
     updateStatus (status){
         //отправляем на сервер объект у которого есть свойство status: (эти данные
         // берем из API документации, которую нам должен предоставить backend разработчик
         return instance.put(`profile/status/`,{status: status});

     },
     addPhoto (file){
         //отправляем на сервер объект у которого есть свойство status: (эти данные
         // берем из API документации, которую нам должен предоставить backend разработчик
        let formData = new FormData();
        formData.append("image",file);
         return instance.put(`profile/photo/`,formData,{
             headers:{
                 "Content-Type": "multipart/form-data"
             }
         });

     },
     saveProfile (profile){
         return instance.put(`profile/`,profile);

     },


 };