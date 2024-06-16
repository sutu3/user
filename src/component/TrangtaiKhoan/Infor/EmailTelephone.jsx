//import React from 'react'

const EmailTelephone = ({  value,change,infor,name }) => {
  return (
    <div className="w-52 flex gap-2 h-14 flex-col">
      <div className="w-full flex border-solid relative">
        <div className="w-20 h-full flex items-center absolute -top-2 bg-[#fffefe] font-serif font-bold z-20">{name}</div>
        <input
        onChange={(e)=>{
          change({
            ...infor,
             [name === "Email" ? email :name==="Name"?username:name==="Pass"?password: phoneNumber]: e.target.value,
          })
          console.log(value);
        }}
        disabled={name==="Email"?true:false}
          value={value}
          placeholder="Enter Email"
          className="absolute pl-8 w-[300px] bg-slate-200 border-solid border-slate-500 border-2 p-2 rounded-md"
          type={name==='Email'?"email":"text"}
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default EmailTelephone;
