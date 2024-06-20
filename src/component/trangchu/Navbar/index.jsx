//import React from 'react'
import { Link } from "react-router-dom";
import SliceCard from '../SliceCard/index'
import SliceCard2 from '../SliceCard/index2'
import { CheckLogin, Cart, StateCard } from "../../redux/selector";
import { useSelector, useDispatch } from "react-redux";
import CartSlice from "../../redux/CartSlice";
const Index = () => {
  const dispatch = useDispatch();
  const state = useSelector(StateCard);
  const CartList = useSelector(Cart);
  console.log(CartList);
  const check = useSelector(CheckLogin);
  console.log(check);
  return (
    <div
      className="w-full bg-white sticky rounded-lg flex flex-row justify-between"
      style={{
        position: "fixed",
        top: "0",
        left: "50%",
        transform: "translate(-50%,-0%)",
        zIndex: 10,
        margin: "auto",
        marginTop: "00px",
      }}
    >
      <div
        className="translate-x-40 flex justify-center items-center  bg-cover bg-no-repeat bg-center w-10 h-10 sm:w-16 sm:h-16 rounded-lg"
        style={{
          backgroundImage:
            "url(https://cdn.pixabay.com/photo/2024/02/23/20/43/ai-generated-8592771_1280.png)",
        }}
      ></div>
      <div
        className="bg-center bg-cover bg-no-repeat w-10 h-10 flex sm:hidden"
        style={{
          backgroundImage:
            "url(https://cdn-icons-png.flaticon.com/512/8777/8777583.png)",
        }}
      ></div>
      <div
        className="
      -translate-x-36 w-[70%] h-20 
      hidden justify-center items-center sm:flex relative"
      >
        <ul className="flex flex-row items-center justify-center gap-2 h-[40px] absolute left-[0%]  ">
          <li
            key={"1"}
            className="h-full flex items-center justify-center p-1 
            font-bold rounded-sm hover:bg-slate-200 hover:animate-pulse "
          >
            <Link to="/">Home</Link>
          </li>
          <li
            key={"2"}
            className="h-full flex items-center justify-center p-1 
            font-bold rounded-sm hover:bg-slate-200 hover:animate-pulse "
          >
          <Link to="/">clothes</Link>
            
          </li>
          <li
            key={"1"}
            className="h-full flex items-center justify-center  
            font-bold rounded-sm hover:bg-slate-200 hover:animate-pulse "
          >
            <Link to="/">Men clothes</Link>
          </li>
          <li
            key={"2"}
            className="h-full flex items-center justify-center p-1 
            font-bold rounded-sm hover:bg-slate-200 hover:animate-pulse "
          >
          <Link to="/">Women clothes</Link>
          </li>
        </ul>
        <ul className="w-fit h-full absolute left-[60%] flex flex-row gap-5">
          <li
            onClick={() => {
              dispatch(CartSlice.actions.changeState(!state));
            }}
            key={"4"}
            className="bg-center bg-no-repeat bg-cover h-10 w-10 relative translate-y-5"
            style={{ backgroundImage: 'url("/src/assets/Image/iconCart.png")' }}
          >
            <span
              className="w-5 h-5 rounded-full flex 
            items-center justify-center absolute top-[60%] 
            left-[60%] font-bold text-white bg-blue-400"
            >
              {CartList[0]?CartList[0].product.length:0}
            </span>
            
          </li>
          <div className={`absolute top-[100%] left-[100%] w-96 ${!state ? "-translate-y-full -z-30" : "z-10" }`}>
              {check.username && check.password ? (
                <SliceCard />
              ) : (
                <SliceCard2 />
              )}
            </div>
          <li
            key={"3"}
            className="h-full flex items-center justify-center
            font-bold translate-y-5"
          >
            {check.username == false && check.password == false ? (
              <Link to="/DangNhap" className="w-full h-full">
                <div
                  style={{
                    backgroundImage:
                      "url(https://i.pinimg.com/736x/a2/82/72/a282728431fcf05e2b1102f8da9370c1.jpg)",
                  }}
                  className="bg-cover bg-center m-auto w-6 h-6"
                ></div>
              </Link>
            ) : (
              <Link to="/account/infor" className="w-full h-full">
                <div
                  style={{
                    backgroundImage:
                      "url(https://i.pinimg.com/736x/a2/82/72/a282728431fcf05e2b1102f8da9370c1.jpg)",
                  }}
                  className=" bg-cover bg-center m-auto w-10 h-10"
                ></div>
              </Link>
            )}
          </li>
        </ul>
        <input
          type="text"
          className="border-slate-800 border-solid border-2
       rounded-md h-10 text-gray-800 w-96 absolute left-[70%]
      p-5"
          placeholder="Enter Name Product"
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default Index;
