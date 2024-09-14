import axios from "axios";


export const  addShippingData =(orderid,mobile,address,city,postalcode,country)=> async (dispatch,getState)=>{
    window.alert(` Alldatarecived ,${orderid},${mobile}, ${address},${city},${postalcode},${country}`)
    const config={
        headers:{
            'Content-type':'application/json'
        }
    }
    const {data}=await axios.post("http://127.0.0.1:8000/api/users/shippingcartdata/",
        {  
            orderid:orderid,
            mobile:mobile,
            address:address,
            city:city,
            postalCode:postalcode,
            country:country,
            shippingprice:0,
        },
        config
    )

    

    const {Shippingdata}=await axios.post("http://127.0.0.1:8000/api/users/shippingcartdata/",
        {  
            orderid:data._id,
            mobile:mobile,
            address:address,
            city:city,
            postalCode:postalcode,
            country:country,
            shippingprice:0,
        },
        config
    )
    
    localStorage.setItem('cartItems',JSON.stringify(getState().cart.cartItems))
    
}