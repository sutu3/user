import { useState } from "react";
import { User } from "../redux/selector";
import Dropdown from "./Component/Dropdown.jsx";
import AccountSlice, {
  UpdateInforAccount,
  CreateAddress,
} from "../redux/AccountSlice.jsx";
import { useSelector, useDispatch } from "react-redux";
import Ranger from "./Component/Ranger.jsx";
import Ranger1 from "./Component/Ranger1.jsx";
import Button from "./Component/Button.jsx";
import Address from "./Component/Address.jsx";
import EmailTelephone from "./Component/EmailTelephone.jsx";
import Gender from "./Component/Gender.jsx";
import Date from "./Component/Date.jsx";
import Input from "./Component/Input.jsx";
const Fixpage = () => {
  const [display1, setdisplay1] = useState(false);
  const [infor, setinfor] = useState({
    name: "",
    email: "",
    phone: "",
    gender: "",
    dayOfBirth: "",
    height: 0,
    weight: 0,
    pass: "",
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
                h-full gap-5 bg-white w-[1100px] opacity-100 
              z-0  rounded-xl relative"
    >
      <div className="w-full bg-white shadow-xl h-[600px] rounded-lg p-3">
        <div className=" p-3 text-xl font-bold font-mono">Basic Info</div>
        <div className="flex flex-row justify-around">
          <div>
            <Input
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
              name="password"
              change={setinfor1}
              infor1={infor1}
              value={infor1.password}
              header="PassWord"
              placehoder="12345"
            />
          </div>
          
        </div>
        <div className="flex flex-row justify-around">
          <div>
          <Dropdown defaultValue={infor1.dayOfBirth.split("-")[0]} placeholder="Year" />
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Fixpage;
