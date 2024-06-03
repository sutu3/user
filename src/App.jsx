
import { useEffect } from 'react'
import '../App.css'
import Navbar from './component/trangchu/Navbar/index'

import { useDispatch } from 'react-redux'
import {FetchProduct} from './component/redux/ProductSlice'
function App() {
  const dispatch=useDispatch();
  useEffect(()=>{
    const defaultCart = [
  {product: [] },
];
if (!localStorage.getItem("product")) {
  localStorage.setItem("product", JSON.stringify(defaultCart));
}
    dispatch(FetchProduct())
  },[])
  return (
    <div className='w-dvw m-0 trang1 relative'>
    <Navbar/>
    
    </div>
  )
}

export default App
