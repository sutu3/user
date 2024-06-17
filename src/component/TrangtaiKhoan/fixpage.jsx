import { useState } from "react";
import { User } from "../redux/selector";
import AccountSlice, {
  UpdateInforAccount,
  CreateAddress,
} from "../redux/AccountSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Ranger from "./Component/Ranger.jsx";
import Ranger1 from "./Component/Ranger1.jsx";
import Button from "./Component/Button.jsx";
import Address from "./Component/Address.jsx";
import EmailTelephone from "./Component/EmailTelephone.jsx";
import Gender from "./Component/Gender.jsx";
import Date from "./Component/Date.jsx";
const Fixpage = () => {
  const [display1, setdisplay1] = useState(false);
  const [infor, setinfor] = useState({
    title: "",
    city: "",
    country: "",
    state: "",
    flat:true
  });
  const dispatch = useDispatch();
  const user = useSelector(User);
  const [infor1, setinfor1] = useState(user);
  console.log(user);
  console.log(infor1);
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
      }}
      className="
               grid grid-rows-2 grid-flow-col gap-5 bg-white w-[700px] opacity-100 
              z-40 h-fit rounded-xl relative"
    >
      <div className="w-[650px] bg-[#f2f2f2] rounded-md  h-[260px]">
        <div className="w-full flex flex-row justify-between p-2">
          <div className="border-l-4 border-[#feb715] text-[#feb715] font-serif font-bold pl-2">
            Profile
          </div>
          <div className="font-mono">
            Last Update at{" "}
            {infor1.updated_at == null ? infor1.created_at : infor1.updated_at}
          </div>
        </div>
        <div className="flex flex-row justify-between p-2 pt-6 w-full">
          <div className="">
            <EmailTelephone
              name="Email"
              infor={infor1}
              change={setinfor1}
              value={infor1.email}
            />
          </div>
          <div className="-translate-x-24">
            <EmailTelephone
              name="Name"
              infor={infor1}
              change={setinfor1}
              value={infor1.username}
            />
          </div>
        </div>
        <div className="flex flex-row justify-between p-2 pt-6 w-full ">
          <div className="">
            <EmailTelephone
              name="Pass"
              infor={infor1}
              change={setinfor1}
              value={infor1.password}
            />
          </div>
          <div className="-translate-x-24">
            <EmailTelephone
              name="Phone"
              infor={infor1}
              change={setinfor1}
              value={infor1.phoneNumber}
            />
          </div>
        </div>
        <div className="w-full justify-end -translate-y-5">
          <Button
            infor1={infor1}
            UpdateInforAccount={UpdateInforAccount}
            data={{
              account_id: infor1.account_id,
              username: infor1.username,
              password: infor1.password,
              email: infor1.email,
              height: infor1.height,
              weight: infor1.weight,
              phoneNumber: infor1.phoneNumber,
              dayOfBirth: infor1.dayOfBirth,
              gender: infor1.gender,
              addresses: [],
              orders: [],
            }}
          />
        </div>
      </div>
      <div className="w-[650px] bg-[#f2f2f2] rounded-md  h-[260px]">
        <div className="w-full flex flex-row justify-between p-2">
          <div className="border-l-4 border-[#feb715] text-[#feb715] font-serif font-bold pl-2">
            Even
          </div>
          <div className="font-mono">
            Last Update at{" "}
            {infor1.updated_at == null ? infor1.created_at : infor1.updated_at}
          </div>
        </div>
        <div className="flex flex-row justify-between p-2 pt-6 w-full">
          <div className="">
            <Date date={infor1.dayOfBirth} infor={infor1} change={setinfor1} />
          </div>
        </div>
        <div className="flex flex-row justify-between p-2 w-full ">
          <div className="">
            <Gender gender1={infor1.gender} infor={infor1} change={setinfor1} />
          </div>
          <div className="-translate-x-28 flex flex-col gap-4">
            <Ranger
              name="height"
              value={infor1.height}
              infor={infor1}
              change={setinfor1}
            />
            <Ranger
              name="weight"
              value={infor1.weight}
              infor={infor1}
              change={setinfor1}
            />
          </div>
        </div>
        <div className="w-full justify-end -translate-y-16">
          <Button
            infor1={infor1}
            UpdateInforAccount={UpdateInforAccount}
            data={{
              account_id: infor1.account_id,
              username: infor1.username,
              password: infor1.password,
              email: infor1.email,
              height: infor1.height,
              weight: infor1.weight,
              phoneNumber: infor1.phoneNumber,
              dayOfBirth: infor1.dayOfBirth,
              gender: infor1.gender,
              addresses: [],
              orders: [],
            }}
          />
        </div>
      </div>
      <div className="w-[400px] bg-[#f2f2f2] overflow-hidden rounded-md  h-[full] grid-rows-subgrid row-span-2">
        <div className="w-full flex flex-row justify-between p-2 h-10">
          <div className="border-l-4 border-[#feb715] text-[#feb715] font-serif font-bold pl-2">
            Address
          </div>
        </div>
        <div className="relative h-full">
          <div className="absolute top-0 w-full">
            <div className="w-[90%] m-auto mb-10">
              <button
                className="w-full bg-[#f3c02d] text-white"
                onClick={() => {
                  setinfor({...infor,flat:!infor.flat});
                }}
              >
                Add new Address
              </button>
            </div>
            <div className="h-96 overflow-y-scroll">
              {infor1.addresses &&
                infor1.addresses.map((el) => <Address el={el} />)}
            </div>
          </div>
          <div
            className={`${
              infor.flat ? "translate-y-full" : ""
            }  duration-300 ease-in-out z-40  h-full w-full top-[70px]  absolute`}
          >
            <div className="bg-[#E8E9EB] h-full w-full rounded-[40px] shadow-inner  -translate-y-5">
              <div className="p-5">
                <div className="font-mono font-bold text-lg">
                  Address Details
                </div>
                <div className="text-sm w-[70%]">
                  Complete address would assist better us in serving you
                </div>
              </div>
              <div className="flex flex-row gap-4 p-5">
                <div>
                  <button
                    onClick={() => {
                      setdisplay1(!display1);
                    }}
                    className="text-[#6d6dfa] text-3xl text-center p-2 w-10 h-10 flex justify-center items-center border-2 border-[#cacacd]"
                  >
                    +
                  </button>
                </div>
                <div
                  className={`${!display1 ? "flex" : "hidden"}  flex-row gap-4`}
                >
                  <button
                    onClick={(e) => {
                      setinfor({ ...infor, title: e.target.innerHTML });
                    }}
                    className={` ${
                      infor.title === "Home" ? "bg-[#dfdffc]" : ""
                    } text-[#6d6dfa]  border-2 border-[#cacacd] hover:bg-[#dfdffc] text-center p-2 w-fit h-10 flex justify-center items-center`}
                  >
                    Home
                  </button>
                  <button
                    onClick={(e) => {
                      setinfor({ ...infor, title: e.target.innerHTML });
                    }}
                    className={` ${
                      infor.title === "Office" ? "bg-[#dfdffc]" : ""
                    } text-[#6d6dfa]  border-2 border-[#cacacd] hover:bg-[#dfdffc] text-center p-2 w-fit h-10 flex justify-center items-center`}
                  >
                    Office
                  </button>
                  <button
                    onClick={(e) => {
                      setinfor({ ...infor, title: e.target.innerHTML });
                    }}
                    className={` ${
                      infor.title === "Friend Home" ? "bg-[#dfdffc]" : ""
                    } text-[#6d6dfa]  border-2 border-[#cacacd] hover:bg-[#dfdffc] text-center p-2 w-fit h-10 flex justify-center items-center`}
                  >
                    Friend Home
                  </button>
                </div>
                <div
                  className={`${
                    display1 ? "flex" : "hidden"
                  } flex-row gap-4 w-[80%] relative -translate-y-2`}
                >
                  <span className="absolute -top-4 p-1 pb-0 rounded-lg font-bold z-30 left-2 text-xs bg-[#E8E9EB]">
                    Title address
                  </span>
                  <input
                    type="text"
                    onChange={(e) => {
                      setinfor({ ...infor, title: e.target.value });
                    }}
                    className="absolute w-full p-3 rounded-lg border-2 border-black"
                    placeholder="Enter Title"
                  />
                </div>
              </div>
              <div className="flex flex-col h-fit gap-4">
                <div
                  className={`flex flex-row gap-4 w-[80%] relative m-auto h-[60px]`}
                >
                  <span className="absolute -top-4 p-1 pb-0 rounded-lg font-bold z-30 left-2 text-xs bg-[#E8E9EB]">
                    Number address
                  </span>
                  <input
                  value={infor.state}
                    type="text"
                    onChange={(e) => {
                      setinfor({ ...infor, state: e.target.value });
                    }}
                    className="absolute w-full p-3 rounded-lg border-2 border-black"
                    placeholder="Enter number address"
                  />
                </div>
                <div
                  className={`flex flex-row gap-4 w-[80%] relative m-auto  h-[60px]`}
                >
                  <span className="absolute -top-4 p-1 pb-0 rounded-lg font-bold z-30 left-2 text-xs bg-[#E8E9EB]">
                    district address
                  </span>
                  <input
                    type="text"
                    value={infor.city}
                    onChange={(e) => {
                      setinfor({ ...infor, city: e.target.value });
                    }}
                    className="absolute w-full p-3 rounded-lg border-2 border-black"
                    placeholder="Enter district"
                  />
                </div>
                <div
                  className={`flex flex-row gap-4 w-[80%] relative m-auto  h-[60px]`}
                >
                  <span className="absolute -top-4 p-1 pb-0 rounded-lg font-bold z-30 left-2 text-xs bg-[#E8E9EB]">
                    City address
                  </span>
                  <input
                  value={infor.country}
                    type="text"
                    onChange={(e) => {
                      setinfor({ ...infor, country: e.target.value });
                    }}
                    className="absolute w-full p-3 rounded-lg border-2 border-black"
                    placeholder="Enter City"
                  />
                </div>
              </div>
              <div className="w-[90%] m-auto">
                <button
                  onClick={() => {
                    let flat = true;
                    for (let key in infor) {
                      if(key!="flat")
                      {
                        if (infor[key] == "") {
                        alert(`Please Enter value ${key}`);
                        flat = false;
                      }
                      }
                      
                    }
                    if (flat) {
                      dispatch(
                        CreateAddress({
                          account_id: infor1.account_id,
                          city: infor.city,
                          state: infor.state,
                          country: infor.country,
                          title: infor.title,
                        })
                      );
                      setinfor({...infor,
                        city: "",
                          state: "",
                          country: "",
                          title: "",
                          flat:true
                    })
                    }
                  }}
                  className="w-full bg-[#f3c02d] text-white"
                >
                  Save Address
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Fixpage;
