import React, { useState } from "react";
import Ranger from "./Infor/Ranger";
import Ranger1 from "./Infor/Ranger1";
import EmailTelephone from "./Infor/EmailTelephone";
import Gender from "./Infor/Gender";
import Date from "./Infor/Date";
const infor = {
  //thông tin khách hàng
  accountgender: "Nam",
  accountheight: "130",
  accountweight: "50",
  accountdayofbrith: "03/26/2003",
  //thông tin quan trọng
  accountemail: "minhdaimk111@gmail.com",
  accountphonenumber: "0589559354",
  //thông tin tài khoản
  accountusername: "minhdailun",
  accountpassword: "minhdai3",
};

const Infor = () => {
  console.log(1)
  const [infor1,setinfor1]=useState(infor);
  const [showPassword, setShowPassword] = useState(false);
  const [InforUser,setInforUser]=useState(true);
console.log(infor1)
  return (
    <div className="w-full m-20 relative">
      <div className=" w-3/4">
        <div className="flex flex-col gap-2">
          <h3 className="p-3 uppercase text-3xl font-sans">Tài Khoản</h3>
          <div className="flex text-2xl gap-6">
          <span className="font-bold text-gray-300 font-serif">Tên Tài Khoản: </span>
          <div>{infor.accountusername}</div>
          </div>
          <div className="flex text-2xl gap-6">
          <span className="font-bold text-gray-300 font-serif">Mật Khẩu: </span>
          <div className="flex gap-5">
      <div className="flex items-center">
        {showPassword ? infor.accountpassword : "*".repeat(infor.accountpassword.length)}
      </div>
      <button className="bg-white h-10 w-20 text-sm border-black border-solid bodder-2"
      onClick={()=>{
        setShowPassword(!showPassword);
      }}>
        {showPassword ? "Hide" : "Show"}
      </button>
    </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="p-3 uppercase text-3xl font-sans">Người dùng</h3>
          <div className="flex text-xl gap-6">
          <span className="font-bold text-gray-300 font-serif">Chiều Cao: </span>
          <div>{infor.accountheight} cm</div>
          </div>
          <div className="flex text-xl gap-6">
          <span className="font-bold text-gray-300 font-serif">Cân Nặng: </span>
          <div>{infor.accountweight} Kg</div>
          </div>
          <div className="flex text-xl gap-6">
          <span className="font-bold text-gray-300 font-serif">Email: </span>
          <div>{infor.accountemail}</div>
          </div>
          <div className="flex text-xl gap-6">
          <span className="font-bold text-gray-300 font-serif">SĐT: </span>
          <div>{infor.accountphonenumber}</div>
          </div>
          <div className="flex text-xl gap-6">
          <span className="font-bold text-gray-300 font-serif">Giới Tính: </span>
          <div>{infor.accountgender}</div>
          </div>
          <div className="flex text-xl gap-6">
          <span className="font-bold text-gray-300 font-serif">Ngày Sinh: </span>
          <div>{infor.accountdayofbrith}</div>
          </div>
        </div>
      </div>
      <div className="absolute bg-blue-500 top-0">
        {InforUser&& (<div>
            <Date date={infor1.accountdayofbrith} infor={infor1} change={setinfor1}/>
            <Gender gender1={infor1.accountgender} infor={infor1} change={setinfor1}/>
            <EmailTelephone sdt={infor1.accountphonenumber} infor={infor1} change={setinfor1} email={infor1.accountemail}/>
            <Ranger height={infor.accountheight} infor={infor1} change={setinfor1} />
            <Ranger1 weight={infor.accountweight} infor={infor1} change={setinfor1}/>

        </div>)}
      </div>
    </div>
  );
};

export default Infor;
