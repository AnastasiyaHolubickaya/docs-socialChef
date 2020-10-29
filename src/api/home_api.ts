import {instance} from "./api";

export const HomeApi = {
    getNews(currentPage: number, pageSize: number) {
        return instance.get(`news?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                return response.data
            })
    },
};