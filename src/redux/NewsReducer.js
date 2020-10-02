import {HomeApi} from "../api/api";
import photo1 from "../img/links/img.PNG";
import photo2 from "../img/links/photo_2020-09-27_23-14-45.jpg";
import photo3 from "../img/links/photo_2020-09-28_15-41-54.jpg";
import photo4 from "../img/links/photo_2020-09-28_15-43-51.jpg";
import photo5 from "../img/links/photo_2020-09-28_15-47-29.jpg";
import photo6 from "../img/links/photo_2020-09-28_15-49-18.jpg";
import photo7 from "../img/links/test.PNG"

const SET_NEWS = 'SET_NEWS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_NEWS_COUNT = 'SET_NEWS_COUNT';

let initialState = {
    news:[
        {id:1, title:"Тестовые Email и Password", img:photo7, description:" логин и пароль для тестирования приложения", link:""},
        {id:2, title:"BGJar", img:photo1, description:"BGJar - бесплатный генератор svg-фонов для ваших сайтов.", link:"https://bgjar.com"},
        {id:3, title:"Анимируйте SVG viewBox с помощью React.", img:photo2, description:"В этом посте я буду анимировать комикс, используя новую версию Popmotion, которая является универсальной библиотекой анимации, а также Фреймер Motion, который построен поверх Popmotion и является специфичным для React.", link:"https://elijahmanor.com/blog/react-svg-viewbox"},
        {id:4, title:"Архитектура Front-end: стабильные и изменчивые зависимости.", img:photo3, description:"Правильное проектирование зависимостей является важным навыком для архитектора интерфейсных приложений. Первый шаг к созданию хорошего дизайна-это идентификация стабильных и изменчивых зависимостей и их соответствующее лечение. В этом посте вы узнаете, как это сделать.", link:"https://dmitripavlutin.com/frontend-architecture-stable-and-volatile-dependencies/"},
        {id:5, title:"Как не закопаться в рефакторинге на фронте. Советы новичку.", img:photo4, description:"Имея опыт с действительно долгосрочными историями, автор статьи собрал несколько советов о том, как не “стрелять в ноги” себе, своим коллегам и тем, кто придет на проект после вас.", link:"https://habr.com/ru/company/maxilect/blog/515082"},
        {id:6, title:"Новое CSS-свойство content-visibility ускоряет отрисовку страницы в несколько раз.", img:photo5, description:"5 августа 2020 разработчики Google анонсировали новое CSS-свойство content-visibility в версии Chromium 85. Оно должно существенно повлиять на скорость первой загрузки и первой отрисовки на сайте", link:"https://habr.com/ru/company/vdsina/blog/514760"},
        {id:7, title:"Практическое руководство по интеграции Google Maps в React. ", img:photo6, description:"Есть ряд причин, по которым вы можете интегрировать Карты Google в свое приложение React, и мы рассмотрим одну из самых популярных: отображение вашего служебного адреса. Затем вы можете использовать это в качестве основы для других, более сложных случаев, если хотите.", link:"https://blog.logrocket.com/a-practical-guide-to-integrating-google-maps-in-react"}
    ],
    pageSize: 5,
    newsCount: 0,
    currentPage: 1,
};

const newsReducer =  (state = initialState, action) => {

//console.log(action);
    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.news
            };
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
                //кстарому массиву добавили новый (который получаем из БД)
            };
        case SET_NEWS_COUNT:
            return {
                ...state, newsCount: action.newsCount
                //кстарому массиву добавили новый (который получаем из БД)
            };
        default:
            return state;
    }

};
export const setNews = (news) => ({type: SET_NEWS, news});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const setNewsCount = (newsCount) => ({type: SET_NEWS_COUNT, newsCount});


export  const  getNewsThunkCreator = (currentPage,pageSize) => {
    return (dispatch) => {
        dispatch(setCurrentPage(currentPage));
        HomeApi.getNews(currentPage, pageSize).then(data => {
            dispatch(setNews(data.items));
            dispatch(setNewsCount(data.totalCount));
        });

    }};

export default newsReducer;