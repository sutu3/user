//import React from 'react'

const EmailTelephone = ({ sdt, email,change,infor }) => {
  return (
    <div className="w-full flex gap-2 h-28 flex-col ml-10">
      <div className="w-full flex border-solid relative">
        <div className="w-20 h-full flex items-center absolute top-5 left-2 z-20">Email: </div>
        <input
        onChange={(e)=>{
          change({
            ...infor,
              email: e.target.value,
          })
          console.log(email);
        }}
        disabled={true}
          value={email}
          placeholder="Enter Email"
          className="absolute pl-16 w-3/4 border-solid border-black border-2 p-2 rounded-lg"
          type="email"
          name=""
          id=""
        />
      </div>
      <div className="w-full flex border-solid relative translate-y-10">
        <div className="w-20 h-full flex items-center absolute top-5 left-2 z-20">SĐT: </div>
        <input
        onChange={(e)=>{
          change({
            ...infor,
               phoneNumber: e.target.value,
          })
        }}
          value={sdt}
          placeholder="Enter Email"
          className="absolute pl-16 w-3/4 border-solid border-black border-2 p-2 rounded-lg"
          type="email"
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default EmailTelephone;
