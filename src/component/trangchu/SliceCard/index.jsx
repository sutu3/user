import { useState } from "react";
import { useSelector } from "react-redux";
import { StateCard } from "../../redux/selector";
//import React from 'react'
const product = {
  name: "Áo thun nam Cotton Compact",
  price: "299.000đ",
  size: ["S", "M", "L", "XL", "2XL"],
  url1: "https://img.lazcdn.com/g/p/483dc4558e79095cd7e3d9ea3d67cb24.jpg_720x720q80.jpg",
  state: "đáng mua",
  color: ["#CDFADB", "#F6FDC3", "#FFCF96", "#FF8080"],
};

const Index = () => {
  const state=useSelector(StateCard)
  const [count, setCount] = useState(1);

  return (
    <div className={`border-b-indigo-100 w-[25%] h-96 top-24 transition-transform duration-700 ease-in-out 
    sticky rounded-lg  flex-col transform ${state?"translate-x-full":""}`}>
      <div className="flex flex-row h-28 m-2 gap-3">
        <input type="checkbox" name="" id="" />
        <img className="w-20 h-full rounded-md" src={product.url1} alt="" />
        <div>
          <div className="text-sm m-2 font-bold">{product.name}</div>
          <div className="flex flex-row gap-4">
            <div className="flex flex-col gap-2">
              <div className="w-20 text-[13px]">
                <select className="w-full rounded-2xl p-2 border border-gray-300">
                  <option value="">Color</option>
                  <option value="red" className="bg-red-500 text-white">
                    Red
                  </option>
                  <option value="blue" className="bg-blue-500 text-white">
                    Blue
                  </option>
                  <option value="yellow" className="bg-yellow-500 text-white">
                    Yellow
                  </option>
                  <option value="orange" className="bg-orange-500 text-white">
                    Orange
                  </option>
                </select>
              </div>
              <div className="w-20 text-[13px]">
                <select className="pl-6 font-bold w-full rounded-2xl bg-slate-200 p-2 border border-gray-300">
                  <option value="">Size</option>
                  <option value="S" className="font-bold text-white">
                    S
                  </option>
                  <option value="M" className="font-bold text-white">
                    M
                  </option>
                  <option value="L" className="font-bold text-white">
                    L
                  </option>
                  <option value="XL" className="font-bold text-white">
                    XL
                  </option>
                </select>
              </div>
            </div>
            <div>
              <div className="flex flex-row bg-slate-50 rounded-full">
                <button
                  onClick={() => {
                    setCount(count - 1);
                  }}
                  className="bg-transparent rounded-s-2xl h-10 flex items-center justify-center px-4"
                >
                  -
                </button>
                <span className="w-10 flex items-center justify-center">{count}</span>
                <button
                  onClick={() => {
                    setCount(count + 1);
                  }}
                  className="bg-transparent rounded-e-2xl h-10 flex items-center justify-center px-4"
                >
                  +
                </button>
              </div>
              <div className="font-mono text-xl ml-10 mt-5">{product.price}</div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex justify-center mt-10">
        <button className="bg-slate-100 w-3/4 p-2 transition duration-300 ease-in-out hover:text-slate-200 hover:bg-slate-500">Thanh toán</button>
      </div>
    </div>
  );
}

export default Index;
