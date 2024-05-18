import {configureStore} from '@reduxjs/toolkit'
import ProductSlice from './ProductSlice'
import  AcountSLice  from './AccountSlice'
import CartSlice from './CartSlice'
const store=configureStore({
    reducer:{
       product:ProductSlice.reducer,
       acount:AcountSLice.reducer,
       cart:CartSlice.reducer
    }
})
export default store