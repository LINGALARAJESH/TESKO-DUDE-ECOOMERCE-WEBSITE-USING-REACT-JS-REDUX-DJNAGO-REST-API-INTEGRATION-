import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../constants/cardConstants";
import {
    ORDER_ADD_REQUEST, ORDER_ADD_ITEM, ORDER_ADD_FAIL,
    SHIPPINGORDER_ADD_REQUEST, SHIPPINGORDER_ADD_ITEM,
    ORDERITEM_ADD_REQUEST, ORDERITEM_ADD_ITEM
} from "../constants/cardConstants"

export const cartReducer = (state = { cartItems: [] }, action) => {

    const item = action.payload
    switch (action.type) {
        case CART_ADD_ITEM:
            return { cartItems: [...item] }

        case CART_REMOVE_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter(x => x.product !== action.payload)
            }

        default:
            return state

    }
}

export const OrderReducer = (state = { Reducerdata: [] }, action) => {

    switch (action.type) {
        case ORDER_ADD_REQUEST:
            return { loading: true, Reducerdata: [] }
        case ORDER_ADD_ITEM:
            return { loading: false, Reducerdata: action.payload }
        case ORDER_ADD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}

export const ShippingReducer = (state = { Shippingdata: [] }, action) => {
    switch (action.type) {
        case SHIPPINGORDER_ADD_REQUEST:
            return { loading: true, Shippingdata: [] }
        case SHIPPINGORDER_ADD_ITEM:

            return { loading: false, Shippingdata: action.payload }
        case ORDER_ADD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}
export const OrderItemReducer = (state = { OrderItemdata: [] }, action) => {
    switch (action.type) {
        case ORDERITEM_ADD_REQUEST:
            return { loading: true, OrderItemdata: [] }
        case ORDERITEM_ADD_ITEM:

            return { loading: false, OrderItemdata: action.payload }
        case ORDER_ADD_FAIL:
            return { loading: false, error: action.payload }

        default:
            return state
    }
}