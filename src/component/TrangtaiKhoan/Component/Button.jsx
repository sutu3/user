import React from 'react'
import { useDispatch } from 'react-redux'
const Button = ( {UpdateInforAccount,data,infor1}) => {
    const dispatch = useDispatch()
  return (
    <div className=' justify-end w-full flex p-2'>
    <button onClick={()=>{
        dispatch(UpdateInforAccount(data))
    }} className='w-24 bg-[#feb715] text-white text-center '>
        Save
    </button>
  </div>)
}

export default Button
