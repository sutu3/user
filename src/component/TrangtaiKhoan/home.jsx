import {useEffect} from 'react'
import { Link, Outlet,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckLogin } from "../redux/selector";
const arr1 = ["Thông Tin", "Lịch Sử đơn hàng", "Trạng thái đơn hàng"];
const arr = [
  {
    name: "Thông Tin",
    url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-business-icon-png-image_4694626.jpg",
    value: "infor",
  },
  {
    name: "Chỉnh Sửa Thông Tin",
    url: "https://png.pngtree.com/png-vector/20190703/ourmid/pngtree-edit-icon-in-trendy-style-isolated-background-png-image_1536522.jpg",
    value: "fix",
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
  {
    name: "Giỏ hàng",
    url: "https://png.pngtree.com/png-vector/20190703/ourmid/pngtree-edit-icon-in-trendy-style-isolated-background-png-image_1536522.jpg",
    value: "cart",
  },
];

const home = () => {
  const navigate=useNavigate()
    const check = useSelector(CheckLogin);
  useEffect(() => {
    if (!check.username && !check.password) {
      navigate('/');
    }
  }, [check, navigate]);
  return (
    <div className="w-full h-fit bg-white">
      <div className="w-[90%] top-5 m-auto p-10 pt-20 flex flex-row gap-5 ">
        <nav className="flex gap-4 flex-col w-[30%] bg-[#283339] rounded-md h-[600px]">
          {arr.map((el, index) => (
            <li
              className=" hover:after:block hover:after:absolute relative hover:after:content-[''] hover:after:rounded-md hover:after:z-0
                hover:after:w-full hover:after:h-full hover:after:top-0 hover:after:left-0 hover:after:transition ease-in
                justify-between w-[80%] m-auto  list-none h-14 flex items-center p-2 rounded-lg text-white hover:after:duration-400"
              key={index}
            >
              <span
                className="bg-no-repeat bg-center bg-cover w-9 h-[90%] rounded-lg"
                style={{ backgroundImage: `url(${el.url})` }}
              ></span>
              <Link
                className="m-auto ml-2 text-white z-20 w-full  flex justify-between font-serif items-center"
                to={el.value}
                onClick={console.log(el.value)}
              >
                {el.name}
                <span className="font-bold text-2xl">></span>
              </Link>
            </li>
          ))}
          <Link
              className="ml- z-20 w-[80%] m-auto hover:text-[#6c73f1] justify-between  bg-[#283339] list-none h-14 flex items-center p-2 rounded-lg text-white "
            onClick={()=>{
              localStorage.removeItem("account")
            to="/"
            }}>
              <span
                className="bg-no-repeat bg-center bg-cover w-9 h-[90%] rounded-lg"
                style={{ backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRs2JSkFXfV6EF80mmUX7Y7WR-7DOBMFz4cRg&s)` }}
              ></span>
            Đăng Xuất ></Link>
        </nav>
        <div className="w-full h-fit m-2 rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default home;
