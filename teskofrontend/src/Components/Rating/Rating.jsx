import React from 'react'
import "./Rating.css"
const Rating = ({prods}) => {
  return (
    <div className="starr">
    <span>
     {prods.rating >=1?<i className="fa-solid fa-star"></i>:prods.rating >=0.5?
    <i className="fa-solid fa-star-half"></i>:<i className="fa-regular fa-star"></i>}
    </span> 
    <span>
     {prods.rating >=2?<i className="fa-solid fa-star"></i>:prods.rating >=1.5?
    <i className="fa-solid fa-star-half"></i>:<i className="fa-regular fa-star"></i>}
    </span> 
    <span>
     {prods.rating >=3?<i className="fa-solid fa-star"></i>:prods.rating >=2.5?
    <i className="fa-solid fa-star-half"></i>:<i className="fa-regular fa-star"></i>}
    </span> 
    <span>
     {prods.rating >=4?<i className="fa-solid fa-star"></i>:prods.rating >=3.5?
    <i className="fa-solid fa-star-half"></i>:<i className="fa-regular fa-star"></i>}
    </span> 
    <span>
     {prods.rating >=5?<i className="fa-solid fa-star"></i>:prods.rating >=4.5?
    <i className="fa-solid fa-star-half"></i>:<i className="fa-regular fa-star"></i>}
    </span> 
     <span >
     {" "}
      ({prods.rating})
      {" -"}
         <i  className="fa-solid fa-user"></i>
         {" "}
         {" ["} {prods.numReviews}{" ]"}
     </span>
   </div>
  )
}

export default Rating