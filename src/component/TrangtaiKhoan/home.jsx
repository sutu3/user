import {useEffect} from 'react'
import { Link, Outlet,useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CheckLogin } from "../redux/selector";
import CartSlice from "../redux/CartSlice"
import { useDispatch } from 'react-redux';
import AccountSlice from "../redux/AccountSlice"
const arr1 = ["Thông Tin", "Lịch Sử đơn hàng", "Trạng thái đơn hàng"];
const arr = [
  {
    name: "Information",
    url: "https://png.pngtree.com/png-clipart/20190921/original/pngtree-business-icon-png-image_4694626.jpg",
    value: "infor",
  },
  {
    name: "Edit Information",
    url: "https://png.pngtree.com/png-vector/20190703/ourmid/pngtree-edit-icon-in-trendy-style-isolated-background-png-image_1536522.jpg",
    value: "fix",
  },
  {
    name: "Address",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSgFkq3yKg-B3qzr9GuSM6vrHgIa5BYYALU8MW20Gg6Q&s",
    value: "order",
  },
  {
    name: "Status ShopCart",
    url: "https://png.pngtree.com/png-clipart/20190924/original/pngtree-fast-delivery-icon-for-your-project-png-image_4857125.jpg",
    value: "state",
  },
];

const home = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate()
    const check = useSelector(CheckLogin);
  useEffect(() => {
    if (!check.username && !check.password) {
      navigate('/');
    }
  }, [check, navigate]);
  return (
    <div className="w-full h-fit bg-[hsl(204,45%,98%)]">
      <div className="w-[100%] top-5 m-auto p-10 pt-20 flex flex-row gap-10 ">
        <nav className="flex gap-0 flex-col shadow-lg shadow-slate-300 w-[20%] m-auto bg-white rounded-md h-[500px]">
          {arr.map((el, index) => (
            <li
              className=" hover:after:block transition duration-150 ease-in-out hover:after:absolute relative hover:after:content-[''] hover:after:rounded-md hover:after:z-0
                hover:after:w-full hover:after:h-full hover:after:top-0 hover:after:left-0 hover:after:transition ease-in
                justify-between w-[90%] m-auto hover:bg-[#ddeefb] list-none h-14 flex items-center p-2 rounded-lg text-white hover:after:duration-400"
              key={index}
            >
              {/* <span
                className="bg-no-repeat bg-center bg-cover w-9 h-[90%] rounded-lg"
                style={{ backgroundImage: `url(${el.url})` }}
              ></span> */}
              <Link
                className="m-auto ml-2 text-slate-500 z-20 w-full  flex justify-between font-serif items-center"
                to={el.value}
                onClick={console.log(el.value)}
              >
                {el.name}
                <span className="font-bold text-2xl">></span>
              </Link>
            </li>
          ))}
          <div
              className="font-bold text-2xl font-serif z-20 transition duration-150 ease-in-out hover:text-[#6c73f1] justify-between  w-[90%] m-auto hover:bg-[#ddeefb] list-none h-14 flex items-center p-2 rounded-lg text-slate-500 "
            onClick={()=>{
              dispatch(CartSlice.actions.changeState(false));
            navigate('/GioHang')
            }}>
              <span
                className="pl-2 bg-no-repeat font-thin text-sm bg-center bg-cover w-40 h-[90%] rounded-lg items-center flex"
              >Cart</span>
             ></div>
          <div
              className="font-bold text-2xl font-serif z-20 transition duration-150 ease-in-out hover:text-[#6c73f1] justify-between  w-[90%] m-auto hover:bg-[#ddeefb] list-none h-14 flex items-center p-2 rounded-lg text-slate-500 "
            onClick={()=>{
              dispatch(AccountSlice.actions.changecheckPassword(false))
              localStorage.removeItem("account")
              localStorage.removeItem("cart")
            navigate('/')
            }}>
              <span
                className="pl-2 bg-no-repeat font-thin text-sm bg-center bg-cover w-40 h-[90%] rounded-lg items-center flex"
              >Log Out</span>
             ></div>
        </nav>
        <div className="w-full h-fit m-2 rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default home;
