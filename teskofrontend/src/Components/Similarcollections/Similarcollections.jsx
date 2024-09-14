import React from 'react'
import "./Similarcollections.css"
import {Row,Col} from "react-bootstrap"
import Card from '../Card/Card'


const Similarcollections = ({product,products}) => {


  return (
    <>
  <Row className="rowdata">
  {products.map((item) => {
    if (product.category === item.category) {
      return <Col key={item._id} sm={12} md={6} lg={4} xl={3} xxl={2} className="d-flex justify-content-center p-0" >
            <Card prods={item} key={item._id} />
            </Col>;
    } else {
      return null;
    }
  })}
</Row>
    </>
  )
}

export default Similarcollections