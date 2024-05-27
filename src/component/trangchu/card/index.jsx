//import React from 'react'
import { useState } from "react"
import {useDispatch} from 'react-redux'
import CartSlice,{CheckCartid} from "../../redux/CartSlice"
const product={name:'Áo thun nam Cotton Compact'
,price:'299.000đ',size:['S','M','L','XL','2XL']
,url1:'https://img.lazcdn.com/g/p/483dc4558e79095cd7e3d9ea3d67cb24.jpg_720x720q80.jpg'
,state:'đáng mua',color:['#CDFADB','#F6FDC3','#FFCF96','#FF8080']}
const Index = ({name,price,size,id,url}) => {
  console.log(url)
  const [color,setcolor]=useState(product.color[0])
  const [display1,setdisplay]=useState('none')
  const dispatch = useDispatch()
  return (
    <div className="bg-slate-100 w-[23%] h-96 rounded-lg">
      <div className="w-full m-auto h-64 relative" onMouseEnter={()=>{
        setdisplay('flex');
      }}
      onMouseLeave={()=>{
        setdisplay('none');
      }}
      >
      <span className="absolute 
      top-0 left-36 m-2 p-1 
      rounded-lg w-fit h-fit z-10 bg-red-500 text-xs text-white " >{product.state}</span>
        <img className="w-full h-full rounded-t-lg absolute top-0 left-0" src={product.url1} alt="" />
        <ul style={{display:display1, flexWrap:'wrap'}}
        className="gap-1 flex-wrap transition duration-700 ease-in-out
        flex-row absolute  backdrop-blur-md 
        w-48 h-32 top-2/3 left-1/2 rounded-lg
        -translate-x-1/2 -translate-y-1/2 justify-center items-center">
        <span className="w-full">Chọn size</span>
        {product.size.map((el,index)=>{return <li onClick={()=>{
          console.log(CartSlice.actions.addCart)
          dispatch(CheckCartid({
            productid:id,
            accountid:3,
            timeorder:Date.now(),
            clientname:'dai',
            clientphonenumber:'123456789',
            clientemail:'minhdai@gmail.com',
            clientcity:'',
            clientward:'',
            clientdistrict:'',
            clientstreet:'',
            productbuy:1
        }))}
        }
         className="w-10 m-1 p-2
         bg-white text-gray-800 rounded-lg transition-colors 
         hover:bg-slate-700 hover:text-white hover:ease-in 
          h-10 items-center justify-center 
         flex " key={index}>{el}</li>})}
      </ul>
      </div>
      <div className="grid-rows-3 text-gray-900 p-0 text-left" >
      <ul className="w-40 flex flex-row gap-2 m-4 mb-0">
        {product.color.map((el,index)=>{return <li
        onClick={()=>{
          setcolor(el)
        }}
         key={index}
        style={{backgroundColor:el}}
        className="w-28 h-4 rounded-lg hover:outline outline-offset-1 outline-blue-200 hover:duration-200"
        ></li>})}
      </ul>
        <p className="uppercase font-bold m-3 mb-0">{product.name}</p>
        <span className="underline font-xs m-3 ">{product.price}</span>
      </div>
    </div>
  )
}

export default Index
