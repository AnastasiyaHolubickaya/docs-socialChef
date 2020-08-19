import React, {useState} from "react";
import classes from './Paginator.module.css';

const Pagination = ({currentPage,pageSize,userCount,onPageChange}) =>{

    let portionSize  = 10;

    let pagesCount = Math.ceil(userCount / pageSize);

    let pages = [];
    for(let i=1; i<=pagesCount; i++){
        pages.push(i);
    }

    let portionCount = Math.ceil( pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber-1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return(

            <div>
                {portionNumber > 1 &&
                    <button onClick={() =>{setPortionNumber(portionNumber-1)}}> &#9668; </button>
                }
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p =>{
                   return  <span className={currentPage === p && classes.currentPage}
                                 key={p}
                                 onClick={(e) => {onPageChange(p)}}> {p} </span>
                    })
                }
                {portionCount > portionNumber &&
                <button onClick={()=> {setPortionNumber(portionNumber+1)}}> &#9658; </button>
                }
            </div>
    )
};
export  default Pagination;