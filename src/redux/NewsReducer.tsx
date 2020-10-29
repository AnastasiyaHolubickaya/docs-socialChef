import photo1 from "../img/links/img.png";
import photo2 from "../img/links/photo_2020-09-27_23-14-45.jpg";
import photo3 from "../img/links/photo_2020-09-28_15-41-54.jpg";
import photo4 from "../img/links/photo_2020-09-28_15-43-51.jpg";
import photo5 from "../img/links/photo_2020-09-28_15-47-29.jpg";
import photo6 from "../img/links/photo_2020-09-28_15-49-18.jpg";
import photo7 from "../img/links/test.png";
import photo8 from "../img/links/1.gif";
import photo9 from "../img/links/modal.jpg";
import photo10 from "../img/links/photo_2020-10-23_11-26-56.jpg";
import photo11 from "../img/links/photo_2020-10-23_11-32-08.jpg";
import photo12 from "../img/links/photo_2020-10-23_11-43-42.jpg";
import {newsType} from "./types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./store";
import {Dispatch} from "redux";
import {HomeApi} from "../api/home_api";

const SET_NEWS = 'SET_NEWS';
const SET_CURRENT_PAGE = 'SET_CURRENT_PAGE';
const SET_NEWS_COUNT = 'SET_NEWS_COUNT';

type initialStateType ={
    news: Array<newsType>
    pageSize: number|null
    newsCount: number|null
    currentPage: number|null
}

let initialState:initialStateType = {
    news:[
        {id:1, title:"Тестовые Email и Password", img:photo7, description:"логин и пароль для тестирования приложения ", link:""},
        {id:2, title:"как должны работать модальные окна", img:photo9, description:"В этом материале автор постарался собрать максимально полный свод правил, рекомендаций и примеров реализации по которым модальные окна должны работать ", link:"https://habr.com/ru/post/521422"},
        {id:3, title:"Lazy-loading видео", img:photo10, description:"Обычно видео загружаются с помощью тега video (хотя, появился альтернативный метод с использованием img, правда, его возможности ограничены). Способ реализации отложенной загрузки видео зависит от варианта его использования. Давайте обсудим несколько сценариев, для каждого из которых требуется своё решение.", link:"https://habr.com/ru/company/funcorp/blog/520594"},
        {id:4, title:"BGJar", img:photo1, description:"BGJar - бесплатный генератор svg-фонов для ваших сайтов.", link:"https://bgjar.com"},
        {id:5, title:"Анимируйте SVG viewBox с помощью React.", img:photo2, description:"В этом посте я буду анимировать комикс, используя новую версию Popmotion, которая является универсальной библиотекой анимации, а также Фреймер Motion, который построен поверх Popmotion и является специфичным для React.", link:"https://elijahmanor.com/blog/react-svg-viewbox"},
        {id:6, title:"Архитектура Front-end: стабильные и изменчивые зависимости.", img:photo3, description:"Правильное проектирование зависимостей является важным навыком для архитектора интерфейсных приложений. Первый шаг к созданию хорошего дизайна-это идентификация стабильных и изменчивых зависимостей и их соответствующее лечение. В этом посте вы узнаете, как это сделать.", link:"https://dmitripavlutin.com/frontend-architecture-stable-and-volatile-dependencies/"},
        {id:7, title:"Как не закопаться в рефакторинге на фронте. Советы новичку.", img:photo4, description:"Имея опыт с действительно долгосрочными историями, автор статьи собрал несколько советов о том, как не “стрелять в ноги” себе, своим коллегам и тем, кто придет на проект после вас.", link:"https://habr.com/ru/company/maxilect/blog/515082"},
        {id:8, title:"Новое CSS-свойство content-visibility ускоряет отрисовку страницы в несколько раз.", img:photo5, description:"5 августа 2020 разработчики Google анонсировали новое CSS-свойство content-visibility в версии Chromium 85. Оно должно существенно повлиять на скорость первой загрузки и первой отрисовки на сайте", link:"https://habr.com/ru/company/vdsina/blog/514760"},
        {id:9, title:"Практическое руководство по интеграции Google Maps в React. ", img:photo6, description:"Есть ряд причин, по которым вы можете интегрировать Карты Google в свое приложение React, и мы рассмотрим одну из самых популярных: отображение вашего служебного адреса. Затем вы можете использовать это в качестве основы для других, более сложных случаев, если хотите.", link:"https://blog.logrocket.com/a-practical-guide-to-integrating-google-maps-in-react"},
        {id:10, title:"Каркасные экраны: реализация в React", img:photo8, description:" На смену лоадерам пришли \"каркасные\" экраны (skeleton screens), которые не просто \"тянут время\", но и лучше обозначают прогресс загрузки, уменьшая негативные ощущения юзера (loading-time frustration). Другими словами, создают иллюзию того, что контент вот-вот появится.", link:"https://proglib.io/p/karkasnye-ekrany-realizaciya-v-react-2020-10-07"},
        {id:11, title:"npmx - продвинутый CLI интерфейс для npm", img:photo11, description:"", link:"https://github.com/terminal-junkies/npmx"},
        {id:12, title:"Сделайте ваше PWA больше похожим на приложение", img:photo12, description:"Сделайте свое прогрессивное веб-приложение не похожим на веб-сайт, а похожим на  приложение", link:"https://web.dev/app-like-pwas"},
    ],
    pageSize: 6,
    newsCount: 0,
    currentPage: 1
};

type setNewsType ={
    type: typeof SET_NEWS
    news:Array<newsType>
}
type setCurrentPageType ={
    type: typeof SET_CURRENT_PAGE
    currentPage:number
}
type setNewsCountType ={
    type: typeof SET_NEWS_COUNT
    newsCount:number
}
type actionsType = setNewsType | setCurrentPageType | setNewsCountType
type thuncType = ThunkAction<Promise<void>,AppStateType,unknown, actionsType>
type dispatchType= Dispatch<actionsType>

const newsReducer =  (state = initialState, action:actionsType):initialStateType => {
    switch (action.type) {
        case SET_NEWS:
            return {
                ...state,
                news: action.news
            };
        case SET_CURRENT_PAGE:
            return {
                ...state, currentPage: action.currentPage
            };
        case SET_NEWS_COUNT:
            return {
                ...state, newsCount: action.newsCount
            };
        default:
            return state;
    }

};
export const setNews = (news:Array<newsType>):setNewsType => ({type: SET_NEWS, news});
 const setCurrentPage = (currentPage:number):setCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});
 const setNewsCount = (newsCount:number):setNewsCountType => ({type: SET_NEWS_COUNT, newsCount});


export  const  getNewsThunkCreator = (currentPage:number,pageSize:number):thuncType => async (dispatch:dispatchType) => {
        dispatch(setCurrentPage(currentPage));
        let response = await  HomeApi.getNews(currentPage, pageSize);
    if(response.data.resultCode === 0) {
        dispatch(setNews(response.items));
        dispatch(setNewsCount(response.totalCount));
    }
        };


export default newsReducer;