//import React from 'react'
import { Link } from "react-router-dom";
import {  CheckLogin, Cart, StateCard } from "../../redux/selector";
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
      className="w-full backdrop-blur-md sticky rounded-lg flex flex-row justify-between"
      style={{
        position: "fixed",
        top: "5%",
        left: "50%",
        transform: "translate(-50%,-50%)",
        zIndex: 10,
        margin: "auto",
        marginTop: "20px",
      }}
    >
      <div
        className="translate-x-40 bg-cover bg-no-repeat bg-center w-10 h-10 sm:w-16 sm:h-16 rounded-lg "
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
      -translate-x-36 w-30h -20 
      hidden justify-center items-center sm:flex "
      >
        <ul className="flex flex-row items-center justify-center gap-2 h-3/5">
          <li
            key={"1"}
            className="h-full flex items-center justify-center p-1 
            font-bold rounded-sm hover:bg-slate-400 hover:animate-pulse "
          >
            <Link to="/">Trang Chủ</Link>
          </li>
          <li
            key={"2"}
            className="h-full flex items-center justify-center p-1 
            font-bold rounded-sm hover:bg-slate-400 hover:animate-pulse "
          >
            Sản Phẩm
          </li>
          {check.username == false && check.password == false ? (
            <li
              key={"3"}
              className="h-full flex items-center justify-center p-1 
            font-bold rounded-sm hover:bg-slate-400 hover:animate-pulse "
            >
              <Link to="/DangNhap">Dang Nhap</Link>
            </li>
          ) : (
            <li
              key={"3"}
              className="h-full w-12 flex items-center justify-center p-1 
            
            font-bold rounded-sm hover:bg-slate-400 hover:animate-pulse "
            >
              <Link to="/account/infor" className="w-full h-full">
                <div
                  style={{
                    backgroundImage: "url(/src/assets/Image/Username.png)",
                  }}
                  className="bg-cover bg-center m-auto w-7 h-7"
                ></div>
              </Link>
            </li>
          )}
          <li
            onClick={() => {
              dispatch(CartSlice.actions.changeState(!state));
            }}
            key={"4"}
            className="bg-center bg-no-repeat bg-cover h-full w-10 relative"
            style={{ backgroundImage: 'url("src/assets/Image/iconCart.png")' }}
          >
            <span
              className="w-5 h-5 rounded-full flex 
            items-center justify-center absolute top-[60%] 
            left-[60%] font-bold text-white bg-blue-400"
            >
              {CartList.length}
            </span>
          </li>
        </ul>
        <input
          type="text"
          className="border-slate-800 border-solid border-2
       rounded-xl h-7 text-gray-800
      p-3"
          name=""
          id=""
        />
      </div>
    </div>
  );
};

export default Index;
