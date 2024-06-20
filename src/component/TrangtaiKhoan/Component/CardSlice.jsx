import React from 'react'
import { Link } from 'react-router-dom'
const arr=[
    {
        name:'Pending',
        value:'Đang Chuẩn bị'
    },
    {
        name:'Complete',
        value:'Hoàn Thành'
    },
    {
        name:'Delete',
        value:'Bị Hủy'
    },
    {
        name:'Cancle',
        value:'Đã hủy'
    },
]
const CardSlice = ({el}) => {
  return (
    <div className='m-3 rounded-sm rounded-s-lg border-b-2 border-slate-500 p-3 transition duration-150 ease-in-out hover:shadow-inner flex flex-row'>
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
      <div></div>
    </div>
  )
}

export default CardSlice
