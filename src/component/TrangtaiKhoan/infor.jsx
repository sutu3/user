import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Statedisplay, Cart, CheckLogin } from "../redux/selector";
import CardSlice1 from "./Component/CardSlice"
const Infor = () => {
  const user = useSelector(User);
  const CartList = useSelector(Cart);
  const check = useSelector(CheckLogin);
  const statedisplay = useSelector(Statedisplay);
  const [infor1, setinfor1] = useState(user);
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  return (
    <div className="w-[1100px] flex flex-row h-[600px]  relative">
      <div className="w-[30%] h-full ">
        <div className="h-[400px] flex flex-col" >
          <div className="w-full h-full ">
          <div
            className="bg-no-repeat m-5 rounded-full outline-2 outline-offset-1 outline-double outline-black bg-center bg-cover w-20 h-20"
            style={{
              backgroundImage:
                "url(https://demos.creative-tim.com/argon-dashboard-chakra-pro/static/media/avatar4.54d5c1de.png)",
            }}
          ></div>
        </div>
        <div className="m-5 mb-0">
          <div className="font-bold font-serif">UserName</div>
          <div className="text-sm text-slate-400">{infor1.username}</div>
        </div>
        <div className="m-5  mb-0">
          <div className="font-bold font-serif">Email</div>
          <div className="text-sm text-slate-400">{infor1.email}</div>
        </div>
        <div className="m-5  mb-0">
          <div className="font-bold font-serif">Contract no</div>
          <div className="text-sm text-slate-400">{infor1.phoneNumber}</div>
        </div>
        <div className="m-5  mb-0">
          <div className="font-bold font-serif">Address</div>
          {
            infor1.addresses?<div className="text-sm text-slate-500">{infor1.addresses[0].title}: <span className="text-slate-400">
            {infor1.addresses[0].state},{infor1.addresses[0].city},{infor1.addresses[0].country}
          </span></div>:"Chưa Cập nhập địa chỉ"
          }
          

        </div>
        </div>
      </div>
      <div className="w-full h-full">
          <div className="font-mono text-lg p-4">
            Previous Order
          </div>
          <div className="">
            {infor1.orders.map((el)=><CardSlice1 el={el}/>)}
          </div>
      </div>
    </div>
  );
};

export default Infor;
