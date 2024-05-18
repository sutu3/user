//import React from 'react'

const slice2 = () => {
  return (
    <div className="flex w-[70%] m-auto mt-5">
    <span className="flex justify-center items-center">Phân Loại</span>
      <select name="filter" className="h-8 ml-4 rounded-md border-2
       border-solid border-black" >
       <option value="">--Chọn--</option>
        <option value="">Bán Chạy</option>
        <option value="">Giá Cao Đến Thấp</option>
        <option value="">Giá Thấp Đến Cao</option>
</select>
    </div>
  )
}

export default slice2
