import React, { useState } from "react";

const Ranger = ({ name,value, infor, change }) => {

  return (
    <div className='flex h-12 w-full ml-10 justify-center items-center'>
      <div className='w-full flex gap-2 relative'>
        <div
          className="w-fit left-3 text-center bg-[#f2f2f2] border-solid text-sm absolute -top-5"
        >
          {name==='height'?"Chiều Cao":"Cân Nặng"}
        </div>
        <input type="text" value={value} placeholder={value+`${name==='height'?" cm":" kg"}`} onChange={(e)=>{
          name==='height'?
          change({
              ...infor,
              height: e.target.value,
            }):change({
              ...infor,
              weight: e.target.value,
            })
        }} className="border-2 pl-5 bg-[#e2e8f0] border-slate-500 p-2 text-black rounded-md" name="" id="" />
      </div>
    </div>
  );
};

export default Ranger;