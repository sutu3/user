import { useState } from "react";
import { User } from "../redux/selector";
import AccountSlice, { UpdateInforAccount } from "../redux/AccountSlice.js";
import { useSelector, useDispatch } from "react-redux";
import Ranger from "./Infor/Ranger";
import Ranger1 from "./Infor/Ranger1";
import Button from "./Infor/Button.jsx";
import EmailTelephone from "./Infor/EmailTelephone";
import Gender from "./Infor/Gender";
import Date from "./Infor/Date";
const Fixpage = () => {
  const dispatch = useDispatch();
  const user = useSelector(User);
  const [infor1, setinfor1] = useState(user);

  return (
    <div
      style={{
        transformStyle: "preserve-3d",
      }}
      className="
               flex flex-col gap-5 bg-white w-[700px] opacity-100 
              z-40 h-fit rounded-xl relative"
    >
      <div className="w-full bg-[#f2f2f2] rounded-md  h-[260px]">
        <div className="w-full flex flex-row justify-between p-2">
          <div className="border-l-4 border-[#feb715] text-[#feb715] font-serif font-bold pl-2">
            Profile
          </div>
          <div className="font-mono">Last Update at {infor1.created_at}</div>
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
      <div className="w-full bg-[#f2f2f2] rounded-md  h-[260px]">
        <div className="w-full flex flex-row justify-between p-2">
          <div className="border-l-4 border-[#feb715] text-[#feb715] font-serif font-bold pl-2">
            Even
          </div>
          <div className="font-mono">Last Update at {infor1.created_at}</div>
        </div>
        <div className="flex flex-row justify-between p-2 pt-6 w-full">
          <div className="">
            <Date
                date={infor1.dayOfBirth}
                infor={infor1}
                change={setinfor1}
              />
          </div>
        </div>
        <div className="flex flex-row justify-between p-2 w-full ">
          <div className="">
            <Gender
                gender1={infor1.gender}
                infor={infor1}
                change={setinfor1}
              />
          </div>
          <div className="-translate-x-24">
            <Ranger
        name="height"
        value={infor1.height}
        infor={infor1}
        change={setinfor1}
      />
          </div>
        </div>
        <div className="w-full justify-end -translate-y-5">
          <Button
            infor1={infor1}
            UpdateInforAccount={UpdateInforAccount}~
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
    </div>
  );
};

export default Fixpage;
