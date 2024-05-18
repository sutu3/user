import {createSlice} from '@reduxjs/toolkit'
const CartSlice=createSlice({
    name: 'cart',
    initialState:{
        Cart:[]
    },
    reducers:{
        addCart: (state, action) => {
                state.Cart = [...state.Cart, action.payload];
                console.log(state.Cart);
            }
    }
})
export default CartSlice;