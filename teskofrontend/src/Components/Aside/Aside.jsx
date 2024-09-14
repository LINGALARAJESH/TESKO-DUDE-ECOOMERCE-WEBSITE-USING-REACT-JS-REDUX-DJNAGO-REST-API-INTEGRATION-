import React from 'react'
import "./Aside.css"
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

const Aside = () => {
  const productList=useSelector((state)=>state.productList);
  const products=productList.product;

  
  let allcategory=[]
  products.forEach((item) => {
    if (!allcategory.includes(item.category)) {
      allcategory.push(item.category);
    }
  });

  return (
    <ul id="subtopnav">
        <Link to={`/products`} style={{textDecoration:"none"}}><li>ALL PRODUCTS</li> </Link>
          { allcategory.map((item)=>{
                  return <Link to={`/products/${item}`} style={{textDecoration:"none"}}> <li key={()=>{
                      products.foreach((val)=>(
                        val.category===item? val._id :''
                      ))
                  }} >{item.toUpperCase()}</li></Link>
                  
          })
       
          }
    </ul>
  )
}

export default Aside