//import React from 'react'
import { Link, Outlet } from "react-router-dom";
const arr1 = ["Thông Tin", "Lịch Sử đơn hàng", "Trạng thái đơn hàng"];
const arr = [
  {
    name: "Thông Tin",
    url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-business-icon-png-image_4694626.jpg",
    value: "infor",
  },
  {
    name: "Lịch Sử đơn hàng",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgFkq3yKg-B3qzr9GuSM6vrHgIa5BYYALU8MW20Gg6Q&s",
    value: "order",
  },
  {
    name: "Trạng thái đơn hàng",
    url: "https://png.pngtree.com/png-clipart/20190924/original/pngtree-fast-delivery-icon-for-your-project-png-image_4857125.jpg",
    value: "state",
  },
];
const home = () => {
  return (
    <div className="w-full h-fit bg-slate-200">
      <div className="w-[80%] top-5 m-auto p-10 pt-40 flex flex-row gap-5">
        <nav className="flex gap-4 flex-col w-[25%]">
          {arr.map((el, index) => (
            <li
              className=" hover:after:block hover:after:absolute relative hover:after:content-[''] hover:after:rounded-md after:backdrop-invert-0 hover:after:z-0
                hover:after:w-full hover:after:h-full hover:after:backdrop-invert hover:after:top-0 hover:after:left-0 hover:after:transition ease-in
                justify-between bg-black list-none h-14 flex items-center p-2 rounded-lg text-white hover:after:duration-400"
              key={index}
            >
              <span
                className="bg-no-repeat bg-center bg-cover w-9 h-[90%] rounded-lg"
                style={{ backgroundImage: `url(${el.url})` }}
              ></span>
              <Link
                className="ml-2 text-white z-20 w-full flex justify-between items-center"
                to={el.value}
                onClick={console.log(el.value)}
              >
                {el.name}
                <span className="font-bold text-2xl">></span>
              </Link>
            </li>
          ))}
          <li
              className=" hover:after:block hover:after:absolute relative hover:after:content-[''] hover:after:rounded-md after:backdrop-invert-0 hover:after:z-0
                hover:after:w-full hover:after:h-full hover:after:backdrop-invert hover:after:top-0 hover:after:left-0 hover:after:transition ease-in
               ml- z-20 w-full hover:text-yellow-400 justify-between  bg-black list-none h-14 flex items-center p-2 rounded-lg text-white hover:after:duration-400"
            onClick={()=>{
              
            }}>
              <span
                className="bg-no-repeat bg-center bg-cover w-9 h-[90%] rounded-lg"
                style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2JSkFXfV6EF80mmUX7Y7WR-7DOBMFz4cRg&s)` }}
              ></span>
            Đăng Xuất ></li>
        </nav>
        <div className="w-full h-fit bg-white rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default home;
