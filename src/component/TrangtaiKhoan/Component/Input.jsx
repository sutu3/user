import React from 'react'

const Input = ({name,change ,value,infor1, header, placehoder}) => {
  return (
    <div className='flex flex-col gap-3'>
      <div className='font-bold text-[13px] font-sans'>{header} </div>
      <input type="text" value={value} onChange={(e)=>{
        change({...infor1,[name]:e.target.value})
      }} placeholder={`eg. ${placehoder}`} className='pl-5 w-96 border-[1.5px] border-slate-200 rounded-md p-[6px]' />
    </div>
  )
}

export default Input
