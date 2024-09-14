import React,{useEffect}from 'react'
import Card from "../Card/Card"
import {Row,Col} from "react-bootstrap"
import "./Itemproducts.css"
import { useDispatch,useSelector } from 'react-redux'
import {listProducts} from "../../actions/productAction"
import Loader from '../Loader/Loader'
import Message from '../Alert/Alert'

const Products = () => {
 
  const dispatch=useDispatch();
  const productList=useSelector((state)=>state.productList);
  const {error,loading,product}=productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);


  
  return (
    <>
    <section id="product1" className="section-p1">
    <h2>New Arraivals</h2>
    <p>Summer collection  New Morden Design</p>
    </section>
    {loading?(
      <Loader/>
    ):error ? ( <Message variant='danger'>{error}</Message>):(

      <Row className="rowdata" style={{margin:"1px"}}>
        {product.map((prods)=>(
           <Col key={prods._id} sm={12} md={6} lg={4} xl={3} xxl={2} className="d-flex justify-content-center p-0">
              <Card prods={prods}/>
           </Col>
        ))} 
      </Row>

       )
      }
    </>
  )
}

export default Products