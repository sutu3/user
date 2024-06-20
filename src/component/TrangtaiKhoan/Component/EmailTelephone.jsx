//import React from 'react'

const EmailTelephone = ({  value,change,infor,name }) => {
  return (
    <div className="w-96 flex gap-2 h-14 flex-col pl-24">
      <div className="w-[500px] justify-between flex h-10 flex-row ">
        <div className="w-20 h-full flex text-[20px] items-center bg-transparent font-serif font-bold z-20">{name}</div>
        <input
        onChange={(e)=>{
          change({
            ...infor,
             [name === "Email" ? email :name==="UserName"?username:name==="PassWord"?password: phoneNumber]: e.target.value,
          })
          console.log(value);
        }}
        disabled={name==="Email"?true:false}
          value={value}
          placeholder="Enter Email"
          className="w-[300px] text-[20px] justify-end bg-transparent border-solid outline-none border-0 p-2 rounded-md"
          type={name==='Email'?"email":"text"}
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default EmailTelephone;
