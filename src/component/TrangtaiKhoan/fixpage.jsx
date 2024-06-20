import { useState } from "react";
import { User } from "../redux/selector";
import Dropdown from "./Component/Dropdown.jsx";
import AccountSlice, {
  UpdateInforAccount,
  CreateAddress,
} from "../redux/AccountSlice.jsx";
import { useSelector } from "react-redux";
import Ranger from "./Component/Ranger.jsx";
import Ranger1 from "./Component/Ranger1.jsx";
import Button from "./Component/Button.jsx";
import Address from "./Component/Address.jsx";
import EmailTelephone from "./Component/EmailTelephone.jsx";
import Gender from "./Component/Gender.jsx";
import ButtonFile from "./Component/ButtonFile.jsx"
import Date from "./Component/Date.jsx";
import Input from "./Component/Input.jsx";
const Fixpage = () => {
  const user = useSelector(User);
  const [infor1, setinfor1] = useState(user);
  return (
    <div
      style={{
        transformStyle: "preserve-3d",
      }}
      className="
                h-full gap-5 bg-white w-[1100px] opacity-100 
              z-0  rounded-xl relative"
    >
      <div className="w-full bg-white  shadow-inner shadow-slate-300 h-[600px] rounded-lg p-3 ">
      <div className="flex flex-col gap-10 h-[600px]">
      <div className="flex flex-row h-[100px]">
        <div className="w-[1000px] pl-4 text-xl font-bold font-mono">Thông tin cá nhân - Cập nhật ngay!</div>
        <div className=" h-full rounded-3xl w-full justify-around flex flex-row shadow-inner shadow-slate-300 ">
        <div className="h-full w-[300px] rounded-lg flex flex-row gap-5">
          <div className="mt-1 mb-1 h-16 w-16 m-auto ml-4 mr-0 rounded-full overflow-hidden flex justify-center items-center">
            <div className="h-full w-full bg-no-repeat bg-cover bg-center" style={{backgroundImage:"url(https://demos.creative-tim.com/argon-dashboard-chakra-pro/static/media/avatar4.54d5c1de.png)"}}></div>
          </div>
          <div className="h-full justify-center items-start flex flex-col">
            <div className="font-bold font-mono text-[25px]">{user.username}</div>
            <div className="text-slate-400 text-sm">'{user.email}'</div>
          </div>
        </div>
        <div>
        <ButtonFile/>
        </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 h-[650px]">
        <div className="flex flex-row justify-between w-[900px] m-auto mb-0">
          <div>
            <Input
            width={96}
              name="username"
              change={setinfor1}
              infor1={infor1}
              value={infor1.username}
              header="User Name"
              placehoder="Michael"
            />
          </div>
          <div>
            <Input
            width={96}
              name="password"
              change={setinfor1}
              infor1={infor1}
              value={infor1.password}
              header="PassWord"
              placehoder="12345"
            />
          </div>
          
        </div>
        <div className="flex flex-row w-[900px] gap-5 justify-between m-auto mb-0">
        <div className="flex justify-center items-center">
          <Dropdown defaultValue={infor1.gender} infor={infor1} change={setinfor1} placeholder="Gender" option={["Nam", "Nữ", "Khác"]}/>
        </div>
          <div className="">
          <Date date={infor1.dayOfBirth} infor={infor1} change={setinfor1} />
          </div>
          
        </div>
        <div className="flex flex-row justify-between w-[900px] m-auto mb-0">
          <div>
            <Input
            width={96}
              name="phone"
              change={setinfor1}
              infor1={infor1}
              value={infor1.phoneNumber}
              header="Phone Number"
              placehoder="1234567890"
            />
          </div>
          <div>
            <Input
            width={96}
              name="email"
              change={setinfor1}
              infor1={infor1}
              value={infor1.email}
              header="Email"
              placehoder="Michael@gmail.com"
            />
          </div>
          
        </div>
        <div className="flex flex-row justify-between w-[900px] m-auto">
          <div>
            <Input
            width={96}
              name="weight"
              change={setinfor1}
              infor1={infor1}
              value={infor1.weight}
              header="Cân Nặng"
              placehoder="50kg"
            />
          </div>
          <div>
            <Input
            width={96}
              name="height"
              change={setinfor1}
              infor1={infor1}
              value={infor1.height}
              header="Chiều Cao"
              placehoder="180cm"
            />
          </div>
          
        </div>
         </div>
         <div className="p-3 m-3">
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
            }}
          />
         </div>
      </div>
      </div>
    </div>
  );
};

export default Fixpage;
