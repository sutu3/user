import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { User, Statedisplay,Cart } from "../redux/selector";


const Infor = () => {
  const user = useSelector(User);
  const CartList=useSelector(Cart)
  const statedisplay = useSelector(Statedisplay);
  const [infor1, setinfor1] = useState(user);
  const [showPassword, setShowPassword] = useState(false);
  //const InforUser = useSelector(UpdateInfor);
  const dispatch = useDispatch();
  return (
    <div className="w-full relative">
      <div className="flex flex-col gap-6">
        <div className="w-full gap-10 h-fit rounded-md flex flex-row">
          <div className="p-5 w-[350px] bg-[#f2f2f2] shadow-x rounded-lg">
            <div className="text-[#424449] font-mono flex flex-row gap-2">
              <div
              className="bg-center bg-no-repeat bg-cover w-5 h-5"
                style={{
                  backgroundImage:
                    "url(https://upload.wikimedia.org/wikipedia/commons/thumb/9/9e/User-rights_icon.svg/1024px-User-rights_icon.svg.png)",
                }}
              ></div>{" "}
              Contract Infor
            </div>
            <div className=" flex  w-60 justify-between m-auto">
              <div className="text-[#99999f]">Name</div>
              <div className="text-[#5a5d63] font-serif">{infor1.username}</div>
            </div>
            <div className=" flex  w-60 justify-between m-auto">
              <div className="text-[#99999f]">Phone</div>
              <div className="text-[#5a5d63] font-serif">{infor1.phoneNumber}</div>
            </div>
            <div className=" flex  w-60 justify-between m-auto">
              <div className="text-[#99999f]">Email</div>
              <div className="text-[#5a5d63] text-sm  font-serif">{infor1.email}</div>
            </div>
            <div className=" flex  w-60 justify-between m-auto">
              <div className="text-[#99999f]">Pass</div>
              <div className="text-[#5a5d63] font-serif">{infor1.password}</div>
            </div>
          </div>
           <div className="p-5 w-[350px] bg-[#f2f2f2] shadow-x rounded-lg">
            <div className="text-[#424449]  font-mono flex flex-row gap-2">
              <div
              className="bg-center bg-no-repeat bg-cover w-5 h-5 "
                style={{
                  backgroundImage:
                    "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQwXEGapfKEa9PUdyvK9_U8t64q6-MnfMbuKRwUps-Ox4QHpfj7mkcl3S3kE1y8dMqxUE&usqp=CAU)",
                }}
              ></div>{" "}
              personal information
            </div>
            <div className=" flex  w-60 justify-between m-auto">
              <div className="text-[#99999f]">Height</div>
              <div className="text-[#5a5d63] font-serif">{infor1.height}</div>
            </div>
            <div className=" flex  w-60 justify-between m-auto">
              <div className="text-[#99999f]">Weight</div>
              <div className="text-[#5a5d63] font-serif">{infor1.weight}</div>
            </div>
            <div className=" flex  w-60 justify-between m-auto">
              <div className="text-[#99999f]">Giới Tính</div>
              <div className="text-[#5a5d63] text-sm  font-serif">{infor1.gender||"Khác"}</div>
            </div>
            <div className=" flex  w-60 justify-between m-auto">
              <div className="text-[#99999f]">Ngày Sinh</div>
              <div className="text-[#5a5d63] font-serif">{infor1.dayOfBirth||"0000-00-00"}</div>
            </div>
          </div>
        </div>
         <div className="p-5 w-[350px] bg-[#f2f2f2] shadow-x rounded-lg ">
            <div className="text-[#424449] items-center  font-mono flex flex-row gap-2">
              <div
              className="flex justify-center items-center rounded-full w-10 h-10 bg-black text-white  "
              
              >  {CartList?CartList[0].product.length:0} </div>{" "}
              Sản phẩm trong giỏ hàng
            </div>
            <div className="text-sm text-blue-400 font-mono pl-12">Hãy mở rộng giỏ hàng</div>
          </div>
        <div className="p-5 w-[750px] bg-[#f2f2f2] shadow-x rounded-lg ">
            <div className="text-[#424449]  font-mono flex flex-row gap-2">
              <div
              className="bg-center bg-no-repeat bg-cover w-5 h-5"
                style={{
                  backgroundImage:
                    "url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSswEHoqoC8mrkqaz3tEq6WPXwE9EGtbvLELA&s)",
                }}
              >   </div>{" "}
              User Address
            </div>
            <div className="w-full gap-5  flex flex-row flex-wrap">
            <div className="bg-white w-[250px] p-5 rounded-lg">
              <span className="pb-2 text-[#99999f] text-sm">Địa chỉ công ty</span>
              <div className="font-mono w-full">150 Au Co P9 quận tân Phú Thành Phú Hồ Chí Minh</div>
            </div>
            <div className="bg-white w-[250px] p-5 rounded-lg">
              <span className="pb-2 text-[#99999f] text-sm">Địa chỉ công ty</span>
              <div className="font-mono w-full">150 Au Co P9 quận tân Phú Thành Phú Hồ Chí Minh</div>
            </div>
            </div>
          </div>
      </div>
      {/* <div>
        {statedisplay && (
          <div
            style={{
              perspective: "20px",
            }}
            onClick={() => {
              dispatch(AccountSlice.actions.changeState(false));
            }}
            className=" backdrop-hue-rotate-90 bg-black/70 z-30 absolute  
            -top-[250px] w-screen h-[820px]  -left-[500px] transition duration-700 ease-in-out"
          >
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
              className="drop-shadow-lg shadow-sm shadow-black 
              m-auto flex flex-col gap-5 bg-white w-2/4 opacity-100 
              z-40 h-fit rounded-xl mt-32 relative"
            >
              <div
                onClick={() => {
                  dispatch(AccountSlice.actions.changeState(false));
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
                date={infor1.dayOfBirth}
                infor={infor1}
                change={setinfor1}
              />
              <Gender
                gender1={infor1.gender}
                infor={infor1}
                change={setinfor1}
              />
              <EmailTelephone
                sdt={infor1.phoneNumber}
                infor={infor1}
                change={setinfor1}
                email={infor1.email}
              />
              <Ranger
                height={infor1.height}
                infor={infor1}
                change={setinfor1}
              />
              <Ranger1
                weight={infor1.weight}
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
          </div>
        )}
      </div> */}
    </div>
  );
};

export default Infor;
