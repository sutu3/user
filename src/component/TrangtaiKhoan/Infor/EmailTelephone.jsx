//import React from 'react'

const EmailTelephone = ({ sdt, email,change,infor }) => {
  return (
    <div className="w-full flex gap-2 flex-col">
      <div className="w-full flex">
        <div className="w-20 flex items-center">Email: </div>
        <input
        onChange={(e)=>{
          change({
            ...infor,
              accountemail: e.target.value,
          })
          console.log(email);
        }}
          value={email}
          placeholder="Enter Email"
          className=" pl-3 border-solid border-black border-2 p-1 rounded-lg"
          type="email"
          name=""
          id=""
        />
      </div>
      <div className="w-full flex">
        <div className="w-20 flex items-center">SĐT: </div>
        <input

        onChange={(e)=>{
          change({
            ...infor,
              accountphonenumber: e.target.value,
          })
          console.log(email);
        }}
          value={sdt}
          placeholder="Enter Telephone"
          className=" pl-3 border-solid border-black border-2 p-1 rounded-lg"
          type="email"
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default EmailTelephone;
