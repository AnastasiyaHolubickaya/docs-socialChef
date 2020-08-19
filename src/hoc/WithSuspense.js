import React from "react";
import Preloader from "../components/Preloader/Preloader";



export const WithSuspense = (Component) =>{
    return (props) => {
        return <React.Suspense fallback={<Preloader/>}>
                     <Component {...props}/>
                </React.Suspense>
    }
};
//WithAuthRedirect - hoc (компонента высшего порядка) функция, которая принимает
//как параметр компоненту и возвращает к ней контейнерную компоненту
// в данном случаее hoc делает перенаправление (с помошью компоненты Redirect)на другую страницу согласно условия