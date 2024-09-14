import axios from "axios";
import { CART_ADD_ITEM,CART_ADD_FAIL,CART_ADD_REQUEST, 
    CART_REMOVE_ITEM,CART_REMOVE_FAIL,CART_REMOVE_REQUEST,
    ORDER_ADD_REQUEST,ORDER_ADD_ITEM,ORDER_ADD_FAIL,
    SHIPPINGORDER_ADD_REQUEST,SHIPPINGORDER_ADD_ITEM,
    ORDERITEM_ADD_REQUEST,ORDERITEM_ADD_ITEM} from "../constants/cardConstants"

export const addToCart = (id, productId, qty, size) => async (dispatch, getState) => {


    try {
        dispatch({ type: CART_ADD_REQUEST })
        const { data: singledata } = await axios.get(`http://127.0.0.1:8000/api/products/${productId}`)

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post("http://127.0.0.1:8000/api/users/addcartdata/",
            {
                userid: id,
                id: productId,
                name: singledata.name,
                countInStock: singledata.countInStock,
                qty: qty,
                size: size,
                price: singledata.price,
                image: singledata.image,
            },
            config
        )

      
        dispatch({
            type: CART_ADD_ITEM,
            payload: data,
        });

        localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
    } catch (error) {
        dispatch({
            type: CART_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}

export const getDataCart = (userid) => async (dispatch, getState) => {
    try {
        dispatch({ type:CART_ADD_REQUEST })
        const { data } = await axios.get(`http://127.0.0.1:8000/api/users/addcartdata/${userid}`)

        dispatch({
            type: CART_ADD_ITEM,
            payload: data,
        });
    } catch (error) {
        dispatch({
            type:  CART_ADD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }

}



export const removeFromCart = (productId, userid) => async (dispatch, getState) => {
   

    try {
        dispatch({ type:CART_REMOVE_REQUEST })
        const response = await axios.delete(`http://localhost:8000/api/users/addcartdata/${userid}/${productId}`);
        if (response.status === 204) {
         
        }
        dispatch({
            type: CART_REMOVE_ITEM,
            payload: productId,
        });
    } catch (error) {
        dispatch({
            type:  CART_REMOVE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }

    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const proceedCartOrder = (userid, total_items, cartItems, mobile, address, postalcode, country, city) => async (dispatch, getState) => {
    // creating Order
    try {
        dispatch({ type: ORDER_ADD_REQUEST })
        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }
        const { data } = await axios.post("http://127.0.0.1:8000/api/users/proceedcartorder/",
            {
                user: userid,
                totalPrice: total_items,
                cartItems: cartItems,
                mobile: mobile,
                address: address,
                postalCode: postalcode,
                country: country,
            },
            config
        )
   console.log(data, "ORDER")

        dispatch({
            type: ORDER_ADD_ITEM,
            payload:data ,
        });

       

    
   
        dispatch({ type:SHIPPINGORDER_ADD_REQUEST })
    
        const Shippingdata = await axios.post("http://127.0.0.1:8000/api/users/shippingcartdata/",
            {
                orderid: data[0]['_id'],
                mobile: mobile,
                address: address,
                city: city,
                postalCode: postalcode,
                country: country,
                shippingprice: 0,
            },
            config
        )

      

        dispatch({
            type: SHIPPINGORDER_ADD_ITEM,
            payload: Shippingdata.data,
        });
        


        // products adiing in models
        dispatch({ type:ORDERITEM_ADD_REQUEST })

        const Productdata = await axios.post("http://127.0.0.1:8000/api/users/OrderProductdata/",
            {
                product: cartItems,
                user: userid,
                orderid: data[0]['_id'],
            },
            config
        )
        
       
        dispatch({
            type: ORDERITEM_ADD_ITEM,
            payload: Productdata.data,
        });
       


    } catch (error) {
        dispatch({
            type:[ORDER_ADD_FAIL],
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message,
        });
    }
}

