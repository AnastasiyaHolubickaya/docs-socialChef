//https://habr.com/ru/company/ruvds/blog/445276/ полное руководство по hook Дена Абрамова
// hook useState

import React, {useEffect, useState} from "react";


const ProfileStatusHook = (props) => {
// hook useState возвращает массив из двух элементов (state хранится не в самой функции, а где то в React   )
//делаем деструктуризированное присваивание (*)

   let [status, setStatus] = useState(props.status);
    let [editMode, setEditMode] = useState(false);

    useEffect( () =>{// hook который что то выполняет когда компонента отрисовалась (после отрисовки компоненты)
        setStatus (props.status);
        },[props.status]);//[props.status] зависимость (если не поставить зависимость - useEffect будет выполняться после каждой отрисовки компоненты - произойдет зацикливание, если оставить зависимость пустой - []- react точно не будет знать от чего зависит давнный useEffect - так делать не рекомендуется)
// в данном случае зависит от  пропсов (точнее статуса пришедшего в пропсах) поэтому срабатывать он будет при изменении статуса в пропсах
    const onStatusChange = (e) => {
        setStatus(e.currentTarget.value)
        };
    const activeEditeMode = () =>{
        setEditMode(true)
    };

    const deActivateEditMode =() => {
        setEditMode(false);
        props.updateStatus(status);
    };
    //(*)современная альтернатива  наже написанного
    /*
    let  mass = useState(false);
    let editMode = mass[0];// первый элемент массива -  наш закинутый false
    let setEditMode = mass[1];//второй элемент массива - функция, которая может изменять (устанавливать значение)первый элемент
    */


        return(

            <div className=''>
                { !editMode &&
                    <span onDoubleClick={activeEditeMode}>... {props.status || 'no status'}</span>
                }
                {  editMode &&
                    <input onChange={onStatusChange} onBlur={deActivateEditMode} autoFocus={true} type='text' value={status}/>
                }


            </div>

        )
    };



export  default  ProfileStatusHook;