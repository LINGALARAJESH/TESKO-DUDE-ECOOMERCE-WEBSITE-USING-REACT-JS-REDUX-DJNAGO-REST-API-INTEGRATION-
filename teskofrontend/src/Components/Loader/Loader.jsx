import React from 'react'
import "./Loader.css"
import { Spinner } from 'react-bootstrap'
const Loader = () => {
  return (
    <div className="spinn">
    <Spinner className="sr-only-data" animation="border" role="status" style={{height:"50px" ,width:"50px", margin:"auto",display:'block'}}>
        <span className="sr-only">Loading</span>
    </Spinner>
    </div>
  )
}

export default Loader