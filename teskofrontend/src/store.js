import { createStore,combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import {composeWithDevTools} from "redux-devtools-extension"
import {productListReducers} from "./reducers/productReducers"
import { productDetailsReducers } from './reducers/productReducers';
import { cartReducer } from './reducers/cartReducers';
import {userLoginReducers} from "./reducers/userReducers"
import {userRegisterReducers} from "./reducers/userReducers"
import {OrderItemReducer,ShippingReducer,OrderReducer} from './reducers/cartReducers';


const reducer=combineReducers({
    productList:productListReducers,
    productDetails:productDetailsReducers,
    cart:cartReducer,
    userLogin:userLoginReducers,
    userRegister:userRegisterReducers,
    orderdata:OrderReducer,
    shippingdata:ShippingReducer,
    orderitemdata:OrderItemReducer,
})

const userInfoFromStorage=localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')):null

const initialState={
  userLogin:{userInfo:userInfoFromStorage}
}
const middleware=[thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
  );
  
export default store;