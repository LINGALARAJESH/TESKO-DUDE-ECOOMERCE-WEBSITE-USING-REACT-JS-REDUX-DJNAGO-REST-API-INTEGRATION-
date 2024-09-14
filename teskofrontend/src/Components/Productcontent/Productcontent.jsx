import React from 'react'
import Itemproducts from "../Itemproducts/Itemproducts"
import {useParams } from 'react-router-dom'
import Asideproducts from '../Asideproducts/Asideproducts'

const Productcontent = () => {
  const{data}=useParams()
  return (
    <div className='Productcontentdata'>
         {data===undefined?<Itemproducts/>:<Asideproducts/>}
    </div>
  )
}

export default Productcontent