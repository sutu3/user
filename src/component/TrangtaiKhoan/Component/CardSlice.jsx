import React from 'react'
import { Link } from 'react-router-dom'
const arr=[
    {
        name:'Pending',
        value:'Đang Chuẩn bị',
        color:'#edf5ff'
    },
    {
        name:'Complete',
        value:'Hoàn Thành',
        color:'#e9fce6'
    },
    {
        name:'Delete',
        value:'Bị Hủy',
        color:'#fcf3ec'
    },
    {
        name:'Cancle',
        value:'Đã hủy',
        color:'#fcf3ec'
    },
]
const CardSlice = ({el}) => {
    const stateDetails = arr.find((state) => state.name === el.status);
    console.log(stateDetails)
  return (
    <div className={`m-3 rounded-sm rounded-s-lg border-b-2 bg-[${stateDetails.color}] border-slate-500 justify-around p-3 transition duration-300 ease-in-out hover:shadow-inner flex flex-row`}>
      <div className='flex flex-col gap-4 m-3'>
        <div className='flex flex-row gap-4'>
            <div className='font-bold font-serif'>Order #{el.orders_id}</div>
            <Link className='underline-offset-2 underline text-xs flex justify-center items-center'>View Detail></Link>
        </div>
        <div  className='flex flex-row gap-4 text-sm text-slate-400'>
            <div>{el.created_at.split('T')[0]} at {el.created_at.split('T')[1]}</div>
            <div>Shipping No:1234567890</div>
        </div>
      </div>
      <div className='flex flex-col m-3 gap-3'>
        <div>{arr.map((el1)=>el1.name==el.status?el1.value:"")}</div>
        <div className='text-slate-400 text-sm'>Last Update :{el.updated_at?el.updated_at.split('T')[0]:el.created_at.split('T')[0]}</div>
      </div>
      <div className='flex flex-col m-3 gap-2'>
        <div className='font-bold font-mono text-xl'>${el.orderItems.reduce(
                    (el, el1) => el + el1.product_price * el1.quantity,
                    0
                  )}</div>
        <div className='text-slate-400 text-sm'>Last Update :{el.updated_at?el.updated_at.split('T')[0]:el.created_at.split('T')[0]}</div>
      </div>
    </div>
  )
}

export default CardSlice
