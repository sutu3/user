import  { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AccountSlice from "../redux/AccountSlice.js";
import { UpdateInfor } from "../redux/selector";
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
  console.log(1);
  const [infor1, setinfor1] = useState(infor);
  const [showPassword, setShowPassword] = useState(false);
  const InforUser = useSelector(UpdateInfor);
  const dispatch = useDispatch();
  console.log(infor1);
  return (
    <div className="w-full m-20 relative">
      <div className=" w-3/4">
        <div className="flex flex-col gap-2">
          <h3 className="p-3 uppercase text-3xl font-sans">Tài Khoản</h3>
          <div className="flex text-2xl gap-6">
            <span className="font-bold text-gray-300 font-mono">
              Tên Tài Khoản:{" "}
            </span>
            <div>{infor.accountusername}</div>
          </div>
          <div className="flex text-2xl gap-6">
            <span className="font-bold text-gray-300 font-mono">
              Mật Khẩu:{" "}
            </span>
            <div className="flex gap-5">
              <div className="flex items-center">
                {showPassword
                  ? infor.accountpassword
                  : "*".repeat(infor.accountpassword.length)}
              </div>
              <button
                className="bg-white h-10 w-20 text-sm border-black border-solid bodder-2"
                onClick={() => {
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <h3 className="p-3 uppercase text-3xl font-sans">Người dùng</h3>
          <div className="flex text-xl gap-6">
            <span className="font-bold text-gray-300 font-mono">
              Chiều Cao:{" "}
            </span>
            <div>{infor.accountheight} cm</div>
          </div>
          <div className="flex text-xl gap-6">
            <span className="font-bold text-gray-300 font-mono">
              Cân Nặng:{" "}
            </span>
            <div>{infor.accountweight} Kg</div>
          </div>
          <div className="flex text-xl gap-6">
            <span className="font-bold text-gray-300 font-mono">Email: </span>
            <div>{infor.accountemail}</div>
          </div>
          <div className="flex text-xl gap-6">
            <span className="font-bold text-gray-300 font-mono">SĐT: </span>
            <div>{infor.accountphonenumber}</div>
          </div>
          <div className="flex text-xl gap-6">
            <span className="font-bold text-gray-300 font-mono">
              Giới Tính:{" "}
            </span>
            <div>{infor.accountgender}</div>
          </div>
          <div className="flex text-xl gap-6">
            <span className="font-bold text-gray-300 font-mono">
              Ngày Sinh:{" "}
            </span>
            <div>{infor.accountdayofbrith}</div>
          </div>
        </div>
        <button
          onClick={() => {
            dispatch(AccountSlice.actions.updateInforL(!InforUser));
          }}
          className="bg-white h-10 flex justify-center items-center"
        >
          Cập Nhập
        </button>
      </div>
      <div>
        {InforUser && (
          <div
            style={{
              perspective: "20px",
            }}
            onClick={() => {
              dispatch(AccountSlice.actions.updateInforL(false));
            }}
            className=" backdrop-hue-rotate-90 bg-black/70 z-40 absolute  
            -top-[250px] w-screen h-[820px]  -left-[500px] transition duration-700 ease-in-out"
          >
            <div
              style={{
                transformStyle: "preserve-3d",
              }}
              onClick={(e) => e.stopPropagation()}
              className="drop-shadow-lg shadow-sm shadow-black 
              m-auto flex flex-col gap-5 bg-white w-2/4 opacity-100 
              z-50 h-fit rounded-xl mt-32 relative"
            >
              <div
                onClick={() => {
                  dispatch(AccountSlice.actions.updateInforL(false));
                }}
                className=" absolute left-[96%] -top-[3%] 
                font-sans shadow-md shadow-black hover:text-white
            h-12 w-12 rounded-full flex justify-center text-3xl 
            outline outline-offset-2 outline-1 outline-white
            items-center bg-red-500"
              >
                X
              </div>
              <div className="text-3xl uppercase p-10 pb-0 font-serif">
                Chỉnh sửa thông tin tài khoản
              </div>
              <Date
                date={infor1.accountdayofbrith}
                infor={infor1}
                change={setinfor1}
              />
              <Gender
                gender1={infor1.accountgender}
                infor={infor1}
                change={setinfor1}
              />
              <EmailTelephone
                sdt={infor1.accountphonenumber}
                infor={infor1}
                change={setinfor1}
                email={infor1.accountemail}
              />
              <Ranger
                height={infor.accountheight}
                infor={infor1}
                change={setinfor1}
              />
              <Ranger1
                weight={infor.accountweight}
                infor={infor1}
                change={setinfor1}
              />
            <button className="hover:bg-slate-600 bg-transparent hover:text-white transition duration-300 ease-in-out
            w-3/4 m-auto border-1 border-solid border-black mb-5">Xác Nhận</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Infor;
