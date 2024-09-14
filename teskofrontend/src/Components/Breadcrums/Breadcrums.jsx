import React from 'react'
import "./Breadcrums.css"

const Breadcrums = ({category,name,brand}) => {
  return (
    <div className='Breadcrums'>
     HOME / products <i class="fa-solid fa-arrow-right"></i> {brand}<i class="fa-solid fa-arrow-right"></i>{category}<i class="fa-solid fa-arrow-right"></i> {name}
    </div>
  )
}

export default Breadcrums