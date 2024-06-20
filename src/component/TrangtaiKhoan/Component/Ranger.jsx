import React, { useState } from "react";

const Ranger = ({ name,value, infor, change }) => {

  return (
    <div className='flex h-12 w-full mt-2'>
      <div className='w-[520px] flex flex-row pl-24 justify-between items-center'>
        <div
          className="w-[100px] text-center  bg-[#f2f2f2] font-bold text-[20px] border-solid text-sm"
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
        }} className="border-0 outline-none pl-5 bg-transparent border-slate-500 p-2 text-black rounded-md" name="" id="" />
      </div>
    </div>
  );
};

export default Ranger;
