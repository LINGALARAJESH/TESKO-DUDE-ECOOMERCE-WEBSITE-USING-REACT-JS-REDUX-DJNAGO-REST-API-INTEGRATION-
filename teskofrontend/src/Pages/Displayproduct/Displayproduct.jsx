import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import "./Displayproduct.css"
import Breadcrums from '../../Components/Breadcrums/Breadcrums'
import Rating from '../../Components/Rating/Rating'
import Similarcollections from '../../Components/Similarcollections/Similarcollections'
import { useDispatch,useSelector } from 'react-redux'
import {listProductDetails} from "../../actions/productAction"
import Loader from '../../Components/Loader/Loader'
import Message from '../../Components/Alert/Alert'
import { useNavigate} from 'react-router-dom'
import { listProducts } from '../../actions/productAction'

const Displayproduct = () => {
  const navigate =useNavigate()
  const [qty,setqty]=useState(0)
  const [size,setsize]=useState('S')
  const dispatch=useDispatch();
  const mainproducts=[]
  
  const userLogin =useSelector(state=>state.userLogin)
  const {userInfo}=userLogin


  useEffect(()=>{

    dispatch((listProducts()));
 },[dispatch])
 

  const {id}=useParams()
  
  const productDetails=useSelector((state)=>state.productDetails);
  const {error,loading,product}=productDetails;

  useEffect(() => {
    dispatch((listProductDetails(id)));
  }, [dispatch,id]);

  const extraitems = () => {
    products.forEach((item) => {
      if (product && product.category === item.category) {
        mainproducts.push(item);
      }
    });
  };


  const productList=useSelector((state)=>state.productList);
    const products=productList.product;
    extraitems()
  

    
  

  const addToCartHandler=()=>{
    userInfo ? navigate(`/Cart/${id}?qty=${qty}=size=${size}`):navigate(`/login`)
  }



  return (
    <>
     {loading?(
      <Loader/>
    ):error ? ( <Message variant='danger'>{error}</Message>):( 

<section id="prodetails" className="section-p1">
<div className="single-pro-image">
<div className="imgg"><img width="100%" src={ `http://127.0.0.1:8000/${product.image}`}  id="Mainimg" alt="" /></div>
<div className="small-img-group">
    <div className="small-img-col">
      
    {mainproducts.length > 1 && (
  <img className="small-img" width="100%" src={`http://127.0.0.1:8000/${mainproducts[1].image}`} alt="" />)}
    </div>
    <div className="small-img-col">
    {mainproducts.length > 1 && (
  <img className="small-img" width="100%" src={`http://127.0.0.1:8000/${mainproducts[2].image}`} alt="" />)}
    </div>
    <div className="small-img-col">
    {mainproducts.length > 1 && (
  <img className="small-img" width="100%" src={`http://127.0.0.1:8000/${mainproducts[3].image}`} alt="" />)}
    </div>
    <div className="small-img-col">
    {mainproducts.length > 1 && (
  <img className="small-img" width="100%" src={`http://127.0.0.1:8000/${mainproducts[4].image}`} alt="" />)}
    </div>
</div>
</div> 
<div className="single-pro-details">
<Breadcrums category={product.category} name={product.name} brand={product.brand}/>
<h2>{product.brand}</h2>
<h4>{product.name}</h4>
 <div className="rangee">
            <p>
              <i className="fa-solid fa-indian-rupee-sign"></i> {product.price} -{" "}
              <i className="fa-solid fa-indian-rupee-sign"></i> 9,9999{" "}{" "}{" "} [{" "} {product.countInStock===0?<><i style={{color:"red"}} class="fa-solid fa-exclamation"></i>{" "}<p style={{display:"inline", color:"red"}}>Sorry Out of Stock</p> </>:<><p style={{display:"inline", color:"#ff5e00"}} >Limited Time only {product.countInStock} is available.</p></>}{" "} ]
            </p>
</div>
<Rating prods={product}/>
<br />
<div>
<select className='selectsize' name="" id=""  value={size} onChange={(e)=>setsize(e.target.value)}>
    <option value=""> Select Size</option>
    <option className='selectsize' value="S">S</option>
    <option className='selectsize' value="L">L</option>
    <option className='selectsize' value="XL">XL</option>
    <option className='selectsize' value="XXL">XXL</option>
    <option className='selectsize' value="XXXL">XXXL</option>
</select>
<select className='selectsize' style={{width:"100px"}}   as="select" value={qty} onChange={(e)=>setqty(e.target.value)}>
  <option value="">Qty</option>
  {[...Array(product.countInStock).keys()].map((x)=>(
    <option className='selectsize' key={x+1} value={x+1}>{x+1}</option>
  ))}

</select>

<button disabled={product.countInStock === 0} onClick={addToCartHandler} className="normal">Add to Cart</button>
</div>
<br />
<h4 className="descriptionheading">Product Details</h4>
<span className="description">{product.description}</span>
<div className="review">
    <h2>REVIEWS</h2>
    <i class="fa-solid fa-thumbs-up"></i>
</div>
</div>
</section>
   )}
<section id="product1" className="section-p1">
    <h2>Similar Products</h2>
    <p>Summer collection  New Morden Design</p>
    <Similarcollections product={product} products={products}/>
</section>
</>
  );
}

export default Displayproduct