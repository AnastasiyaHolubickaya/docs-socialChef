import React, {useState} from "react";
import classes from './Paginator.module.css';
import  cn from "classnames"

type propsType = {
    currentPage: number
    pageSize: number
    userCount: number
    onPageChange:(pageNumber:number)=>void
}

const Pagination:React.FC<propsType>= ({currentPage,pageSize,userCount,onPageChange}) =>{

    let portionSize  = 10;

    let pagesCount = Math.ceil(userCount / pageSize);

    let pages:Array<number> = [];
    for(let i=1; i<=pagesCount; i++){
        pages.push(i);
    }

    let portionCount = Math.ceil( pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);//useState функция дженерик, поэтому можем уточнить тип принимаемых данных useState<number|null>
    let leftPortionPageNumber = (portionNumber-1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return(

            <div className={ classes.block}>
                {portionNumber > 1 &&
                    <button  onClick={() =>{setPortionNumber(portionNumber-1)}}> &#9668; </button>
                }
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p =>{
                   return  <span className={cn (currentPage === p && classes.currentPage)}
                                 key={p}
                                 onClick={(e) => {onPageChange(p)}}> {p} </span>
                    })
                }
                {portionCount > portionNumber &&
                <button  onClick={()=> {setPortionNumber(portionNumber+1)}}> &#9658; </button>
                }
            </div>
    )
};
export  default Pagination;