import { User } from "../redux/selector";
import { useState } from "react";
import { useSelector } from "react-redux";
const arr = ["Title", "Number", "district", "City"];
import Input from "./Component/Input";
import {CreateAddress} from "../redux/AccountSlice"
import { useDispatch } from "react-redux";
const OrderHistory = () => {
  const dispatch = useDispatch();
  const [infor, setinfor] = useState({
    city: "",
    state: "",
    country: "",
    title: "",
  });
  const user = useSelector(User);
  console.log(user.orders);
  return (
    <div className="w-full h-fit">
    <div className="w-[1100px] flex flex-row h-full rounded-lg overflow-hidden">
      <div className="w-[70%] h-full">
        <div className=" p-4 text-xl font-bold font-mono">List Address</div>
        <div className="border-2 border-slate-300 rounded-lg">
          <div className="w-[100%] flex bg-slate-200 flex-row gap-6 m-auto border-b-2 border-blue-500  justify-around p-1">
            {arr.map((el) => (
              <div className=" text-xl text-blue-400">{el}</div>
            ))}
          </div>
          <div className="flex w-full flex-col h-56 overflow-y-hidden shadow-xl">
            {user.addresses.map((el) => (
              <div className="w-[100%] flex flex-row border-b-[2px] border-slate-400 gap-10 h-10 justify-center items-center m-aut p-1">
                <div className=" text-center w-[200px] text-sm ">
                  {el.title}
                </div>
                <div className=" text-center w-[200px] text-sm ">
                  {el.state}
                </div>
                <div className="  w-[200px] text-center text-sm ">
                  {el.city}
                </div>
                <div className=" text-center w-[200px] text-sm ">
                  {el.country}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-[70%]  h-full ">
        <div className="p-4">
          <div className="mb-4">
            <Input
              width={46}
              name="title"
              change={setinfor}
              infor1={infor}
              value={infor.title}
              header="Title"
              placehoder="Home"
            />
          </div>
          <div className="mb-4">
            <Input
              width={46}
              name="state"
              change={setinfor}
              infor1={infor}
              value={infor.state}
              header="Number of address"
              placehoder="86/28 Âu Cơ"
            />
          </div>
          <div className="mb-4">
            <Input
              width={46}
              name="city"
              change={setinfor}
              infor1={infor}
              value={infor.city}
              header="District"
              placehoder="Quận Bình Chánh"
            />
          </div>
          <div className="mb-4">
            <Input
              width={46}
              name="country"
              change={setinfor}
              infor1={infor}
              value={infor.country}
              header="City"
              placehoder="Hà Nội"
            />
          </div>
        </div>
        <div>
          <button
                  onClick={() => {
                    let flat = true;
                    for (let key in infor) {
                        if (infor[key] == "") {
                        alert(`Please Enter value ${key}`);
                        flat = false;
                      }
                    }
                    if (flat) {
                      dispatch(
                        CreateAddress({
                          account_id: user.account_id,
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
                    })
                    }
                  }}
                  className="w-[90%] bg-[#f3c02d] flex justify-center items-center m-auto text-center text-white"
                >
                  Save Address
                </button>
        </div>
      </div>
    </div>
    </div>
  );
};

export default OrderHistory;
