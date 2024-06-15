import {useState} from 'react'
import { User } from "../redux/selector";
import AccountSlice, { UpdateInforAccount } from "../redux/AccountSlice.js";
import { useSelector,useDispatch } from 'react-redux';
import Ranger from "./Infor/Ranger";
import Ranger1 from "./Infor/Ranger1";
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
              onClick={(e) => {
                if (!e.target.classList.contains("phantucon")) {
                  e.stopPropagation();
                } else {
                  dispatch(
                    UpdateInforAccount({
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
                    })
                  );
                }
              }}
              className="
              m-auto flex flex-col gap-5 bg-white w-[700px] opacity-100 
              z-40 h-fit rounded-xl relative"
            >
              
              <div className="text-3xl uppercase p-10 pb-0 font-serif">
                Settings
              </div>
              {/* <Date
                date={infor1.dayOfBirth}
                infor={infor1}
                change={setinfor1}
              />
              <Gender
                gender1={infor1.gender}
                infor={infor1}
                change={setinfor1}
              /> */}
              <EmailTelephone
                sdt={infor1.phoneNumber}
                infor={infor1}
                change={setinfor1}
                email={infor1.email}
              />
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
              <button
                className="hover:bg-slate-600 bg-transparent hover:text-white transition duration-300 ease-in-out
            w-3/4 m-auto border-1 border-solid border-black mb-5 z-50 phantucon"
                onClick={(e) => {}}
              >
                Xác Nhận
              </button>
            </div>
  )
}

export default Fixpage
