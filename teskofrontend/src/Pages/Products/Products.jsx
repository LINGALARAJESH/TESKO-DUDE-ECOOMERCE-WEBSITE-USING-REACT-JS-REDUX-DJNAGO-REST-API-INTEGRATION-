import React from 'react'
import Aside from "../../Components/Aside/Aside"
import Productcontent from '../../Components/Productcontent/Productcontent'
import "./Products.css"
const Products = () => {
  return (
   <div className='productdata'>
   <Aside/>

   <div className='productasidecontent'>
    <Productcontent/>
   </div>
   </div>
  )
}

export default Products