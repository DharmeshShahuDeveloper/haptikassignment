import React, { useEffect, useState } from "react";
import 'font-awesome/css/font-awesome.min.css';

function Pagination(props) {
  
  const itemsPerPage = 3;

  const pageNumberLimit = 4;

  //max range of shown pagination
  const [maxPageNumberLimit, setmaxPageNumberLimit] = useState(4);

  //min range of shown pagination
  const [minPageNumberLimit, setminPageNumberLimit] = useState(0);

  
  const pages = [];

  //pagination range
  for (let i = 1; i <= Math.ceil(props.data.length / itemsPerPage); i++) {
    pages.push(i);
  }

  //render pagination numbers
  const renderPageNumbers = pages.map((number) => {
    if (number < maxPageNumberLimit + 1 && number > minPageNumberLimit) {
      return (
        <li
          key={number}
          id={number}
          onClick={()=>{
            props.setCurrentPage(number-1);
          }}
          className={props.currentPage === number-1 ? "numberedli active" : "numberedli"}
        >
          {number}
        </li>
      );
    } else {
      return null;
    }
  });

  //handling range of pagination on change of current page number
  useEffect(()=>{
    if ((props.currentPage + 1)  > maxPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit + pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit + pageNumberLimit);
    }
    if ((props.currentPage + 1)  <= minPageNumberLimit) {
      setmaxPageNumberLimit(maxPageNumberLimit - pageNumberLimit);
      setminPageNumberLimit(minPageNumberLimit - pageNumberLimit);
    }
    if ((props.currentPage)  < 1) {
      setmaxPageNumberLimit(4);
      setminPageNumberLimit(0);
    }
    
  },[props.currentPage]);
  
  let pageDecrementBtn = null;
  if (minPageNumberLimit >= 1) {
    pageDecrementBtn = <li className="edgebtns" onClick={()=>{
      props.setCurrentPage(minPageNumberLimit-1);
    }}> &hellip; </li>;
  }

  let pageIncrementBtn = null;
  if (pages.length > maxPageNumberLimit) {
    pageIncrementBtn = <li className="edgebtns" onClick={()=>{
      props.setCurrentPage(maxPageNumberLimit);
    }}> &hellip; </li>;
  }


  return (
    <div className="pagination">
      <ul >
        <li 
            className={props.currentPage === 0 ? "edgebtns disabled" : "edgebtns"}
            onClick={()=> props.setCurrentPage(props.currentPage - 1)}
          >
            <i class="fa fa-angle-double-left" aria-hidden="true"></i>
        </li>
        {pageDecrementBtn}
        {renderPageNumbers}
        {pageIncrementBtn}

        <li
            className={props.currentPage === pages.length - 1 ? "edgebtns disabled" : "edgebtns"}
            onClick={()=> props.setCurrentPage(props.currentPage + 1)}
          >
            <i class="fa fa-angle-double-right" aria-hidden="true"></i>
        </li>
      </ul>
      </div>
  );
}

export default Pagination;