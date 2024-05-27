//import React from 'react'
const product={name:'Áo thun nam Cotton Compact'
,price:'299.000đ',size:['S','M','L','XL','2XL']
,url1:'https://img.lazcdn.com/g/p/483dc4558e79095cd7e3d9ea3d67cb24.jpg_720x720q80.jpg'
,state:'đáng mua',color:['#CDFADB','#F6FDC3','#FFCF96','#FF8080']}
const index = () => {
  return (
    <div className="bg-blue-500 w-[25%] h-96 top-24 sticky block rounded-lg">
    <div className=" flex flex-row h-28 m-2 gap-3">
            <input type="checkbox" name="" id="" />
            <img className="w-20 h-full rounded-sm" src={product.url1} alt="" />
            <div >
                <div className="text-sm">{product.name}</div>
            </div>
    </div>
    </div>
  )
}

export default index
