import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StateCard,
  Cart,
  Productinfor,
  User,
  CheckLogin,
  Product,
} from "../redux/selector";
import Cart1 from "./cart1";
import Cart2 from "./cart2";
import { Link, useNavigate } from "react-router-dom";
import {
  UpdateQuantity,
  DeleteCartElement,
  DeleteAll,
} from "../redux/CartSlice";
import { CheckEmail,ChangeCart } from "../redux/AccountSlice.jsx";
import Dropdown from "../trangchu/SliceCard/Dropdown";
const arr = ["Product", "Size", "Color", "Quantity", "Total"];
const Index = () => {
  const navigate = useNavigate();
  const [address, setaddress] = useState(-1);
  const dispatch = useDispatch();
  const user = useSelector(User);
  const [pay, setpay] = useState("");
  const card1 = useSelector(Product);
  const check = useSelector(CheckLogin);
  const [display, setdisplay] = useState(false);
  const [display1, setdisplay1] = useState(true);
  const [infor, setinfor] = useState(check.username?{
    name: user.username,
    email: user.email,
    phone: user.phoneNumber,
    city: "",
    state: "",
    country: "",
    title: "",
  } : {
    name: "",
    email: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    title: "",
  });
  const card = useSelector(Cart);
  return (
    <div className="z-50 gap-5 translate-y-20 flex justify-center items-center h-[600px] w-full p-5">
      <div className="bg-[#f3fdff] shadow-lg w-[60%] h-full rounded-lg p-5">
        <div className="font-bold font-mono text-3xl">Shopping card</div>
        <div className="flex flex-row w-full border-b-2 border-gray-300 justify-around mt-10">
          {arr.map((el) => (
            <div className="font-bold">{el}</div>
          ))}
        </div>
        <div className="h-[400px] overflow-x-hidden">
          {check.username && check.password ? <Cart1 /> : <Cart2 />}
        </div>
        <div className="w-full justify-end flex">
          <div></div>
          <div className="flex w-56 justify-around border-t-2 border-slate-300 p-1">
            <div className="font-bold font-mono text-2xl">Total:</div>
            <div className="text-xl">
              ${" "}
              {check.username
                ? card[0] &&
                  card[0].product.reduce(
                    (el, el1) => el + el1.product_price * el1.quantity,
                    0
                  )
                : card1.reduce((el, el1) => el + el1.price * el1.quantity, 0)}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#0d1c45] z-50 w-[30%] shadow-indigo-100 shadow-lg h-full p-10 rounded-lg text-white ">
        {check.username ? (
          <div className={`${!display ? "flex" : "hidden"} relative w-full`}>
            <div className="h-[365px] overflow-y-scroll absolute">
              {user.addresses &&
                user.addresses.map((el, index) => (
                  <div
                    onClick={() => {
                      setinfor({
                        city: el.city,
                        state: el.state,
                        country: el.country,
                        title: el.title,
                      });

                      setaddress(index);
                    }}
                    className={`${
                      index == address ? "bg-slate-600" : ""
                    } transition-transform duration-300 ease-in-out hover:bg-slate-600 w-[90%] border-slate-200 border-2 m-auto mb-2  shadow-md rounded-md `}
                  >
                    <div className="flex h-10 p-3 gap-2">
                      <div
                        className="bg-center bg-no-repeat bg-cover w-5 h-5"
                        style={{
                          backgroundImage:
                            "url(https://cdn-icons-png.flaticon.com/512/1275/1275302.png)",
                        }}
                      ></div>
                      <div className="font-mono font-bold">{el.title}</div>
                    </div>
                    <div className="p-3">
                      {el.state},{el.country},{el.city}
                    </div>
                  </div>
                ))}
            </div>
            <div
              className={`${
                display1 ? "-translate-y-[120%]" : "-translate-y-[5%]"
              } transition duration-300 ease-in-out top-0 bg-slate-50 w-full h-96 absolute rounded-md flex flex-col`}
            >
              <div
                className={` flex-row m-auto mt-0 mb-0 gap-4 h-20 w-[80%] relative translate-y-5`}
              >
                <span className="absolute -top-4 p-1 pb-0 rounded-lg font-bold z-30 left-2 text-xs text-[#0d1c45] bg-slate-50">
                  title address
                </span>
                <input
                  type="text"
                  value={infor.title}
                  onChange={(e) => {
                    setinfor({ ...infor, title: e.target.value });
                  }}
                  className="absolute w-full text-slate-600 p-3 rounded-lg border-2 border-black"
                  placeholder="Enter Title"
                />
              </div>
              <div
                className={` flex-row m-auto mt-0 mb-0 gap-4 h-20 w-[80%] relative translate-y-5`}
              >
                <span className="absolute -top-4 p-1 pb-0 rounded-lg font-bold z-30 left-2 text-xs text-[#0d1c45] bg-slate-50">
                  Number address
                </span>
                <input
                  type="text"
                  value={infor.state}
                  onChange={(e) => {
                    setinfor({ ...infor, state: e.target.value });
                  }}
                  className="absolute w-full text-slate-600 p-3 rounded-lg border-2 border-black"
                  placeholder="Enter Number address"
                />
              </div>
              <div
                className={` flex-row m-auto mt-0 mb-0 gap-4 h-20 w-[80%] relative translate-y-5`}
              >
                <span className="absolute -top-4 p-1 pb-0 rounded-lg font-bold z-30 left-2 text-xs text-[#0d1c45] bg-slate-50">
                  district address
                </span>
                <input
                  type="text"
                  value={infor.city}
                  onChange={(e) => {
                    setinfor({ ...infor, city: e.target.value });
                  }}
                  className="absolute w-full p-3 rounded-lg border-2 text-slate-600 border-black"
                  placeholder="Enter district address"
                />
              </div>
              <div
                className={` flex-row m-auto mt-0 mb-0 gap-4 h-20 w-[80%] relative translate-y-5`}
              >
                <span className="absolute -top-4 p-1 pb-0 rounded-lg font-bold z-30 left-2 text-xs text-[#0d1c45] bg-slate-50">
                  City address
                </span>
                <input
                  type="text"
                  value={infor.country}
                  onChange={(e) => {
                    setinfor({ ...infor, country: e.target.value });
                  }}
                  className="absolute w-full text-slate-600 p-3 rounded-lg border-2 border-black"
                  placeholder="Enter City address"
                />
              </div>
            </div>
            <div className="absolute  left-1/2 -translate-x-1/2 w-80 m-auto top-96 ">
              <button
                onClick={() => {
                  setdisplay1(!display1);
                  setinfor({
                    city: "",
                    state: "",
                    country: "",
                    title: "",
                  });
                }}
                className="text-[#0d5973] w-[100%] m-auto hover:font-bold duration-300 ease-in-out"
              >
                ADD Address
              </button>
            </div>
            <div className="absolute top-[450px] left-1/2 -translate-x-1/2 w-80 m-auto">
              <button
               onClick={() => {
                  if (infor.title != "") {
                    if (infor.state != "") {
                      if (infor.city != "") {
                        if (infor.country != "") {
                          setdisplay(!display);
                        } else {
                          alert("Please Enter Your Country");
                        }
                      } else {
                        alert("Please Enter Your City");
                      }
                    } else {
                      alert("Please Enter Your State");
                    }
                  } else {
                    alert("Please Enter Your Title");
                  }
                }}
                className="w-full text-[#0d1c45]"
              >
                Next
              </button>
            </div>
          </div>
        ) : (
          <div
            className={`${!display ? "flex" : "hidden"} flex flex-col gap-4`}
          >
            <div className="font-serif font-bold text-3xl mb-5">
              Address Infor
            </div>
            <div className="w-[100%] relative h-20 m-0">
              <span className="absolute w-28 h-10 -top-3 text-xs z-20">
                Title Address
              </span>
              <input
                type="text"
                value={infor.title}
                onChange={(e) => {
                  setinfor({ ...infor, title: e.target.value });
                }}
                placeholder="Enter Number address"
                className=" absolute w-full bg-[#0d1c45] outline-0 border-b-2 text-slate-600 border-[#bacbf9] p-2"
              />
            </div>
            <div className="w-[100%] relative h-20 m-0">
              <span className="absolute w-28 h-10 -top-3 text-xs z-20">
                Number address
              </span>
              <input
                type="text"
                value={infor.state}
                onChange={(e) => {
                  setinfor({ ...infor, state: e.target.value });
                }}
                placeholder="Enter Number address"
                className=" absolute w-full bg-[#0d1c45] outline-0 border-b-2 border-[#bacbf9] p-2"
              />
            </div>
            <div className="w-[100%] relative h-20 m-0">
              <span className="absolute w-28 h-10 -top-3 text-xs z-20">
                district
              </span>
              <input
                value={infor.city}
                onChange={(e) => {
                  setinfor({ ...infor, city: e.target.value });
                }}
                type="email"
                placeholder="Enter Your district"
                className=" absolute w-full bg-[#0d1c45] outline-0 border-b-2 border-[#bacbf9] p-2"
              />
            </div>
            <div className="w-[100%] relative h-20 m-0">
              <span className="absolute w-10 h-10 -top-3 text-xs z-20">
                City
              </span>
              <input
                value={infor.country}
                onChange={(e) => {
                  setinfor({ ...infor, country: e.target.value });
                }}
                type="text"
                placeholder="Enter Your City"
                className=" absolute w-full bg-[#0d1c45] outline-0 border-b-2 border-[#bacbf9] p-2"
              />
            </div>
            <div className="w-[90%] m-auto">
              <button
                onClick={() => {
                  if (infor.title != "") {
                    if (infor.state != "") {
                      if (infor.city != "") {
                        if (infor.country != "") {
                          setdisplay(!display);
                        } else {
                          alert("Please Enter Your Country");
                        }
                      } else {
                        alert("Please Enter Your City");
                      }
                    } else {
                      alert("Please Enter Your State");
                    }
                  } else {
                    alert("Please Enter Your Title");
                  }
                }}
                className="w-full text-[#0d1c45]"
              >
                Next
              </button>
            </div>
          </div>
        )}

        <div className={`${display ? "flex" : "hidden"} flex flex-col gap-4`}>
          <div className="font-serif font-bold text-3xl ">Payment Infor</div>
          <div className="w-[100%] relative h-20 m-0">
            <span className="absolute w-10 h-10 -top-2 text-xs z-20">Name</span>
            <input
              value={infor.name}
              onChange={(e) => {
                setinfor({ ...infor, name: e.target.value });
              }}
              type="text"
              placeholder="Enter Your Name"
              className=" absolute w-full bg-[#0d1c45] outline-0 border-b-2 border-[#bacbf9] p-2"
            />
          </div>
          <div className="w-[100%] relative h-20 m-0">
            <span className="absolute w-10 h-10 -top-2 text-xs z-20">
              Email
            </span>
            <input
              value={infor.email}
              disabled={check.username?true:false}
              onChange={(e) => {
                setinfor({ ...infor, email: e.target.value });
              }}
              type="email"
              placeholder="Enter Your Email"
              className=" absolute w-full bg-[#0d1c45] outline-0 border-b-2 border-[#bacbf9] p-2"
            />
          </div>
          <div className="w-[100%] relative h-20 m-0">
            <span className="absolute w-10 h-10 -top-2 text-xs z-20">
              PhoneNumber
            </span>
            <input
              value={infor.phone}
              onChange={(e) => {
                setinfor({ ...infor, phone: e.target.value });
              }}
              type="text"
              placeholder="Enter Your Email"
              className=" absolute w-full bg-[#0d1c45] outline-0 border-b-2 border-[#bacbf9] p-2"
            />
          </div>
          <div className="w-[100%] relative h-20 m-0 border-b-2 border-[#bacbf9]">
            <span className="absolute w-28 h-10 -top-2 text-xs z-20">
              Payment Methor
            </span>
            <div className="flex text-[#0d1c45] w-[80%] justify-around absolute translate-y-4 gap-4">
              <button
                onClick={(e) => {
                  setpay(e.target.innerHTML);
                }}
                className={`${
                  pay == "Money" ? "bg-[#0d5973] text-white" : ""
                } w-52 focus:bg-[#0d5973] focus:text-white`}
                name="btn"
              >
                Money
              </button>
              <button
                onClick={(e) => {
                  setpay(e.target.innerHTML);
                }}
                className={`${
                  pay == "Credit Card" ? "bg-[#0d5973] text-white" : ""
                } w-52 focus:bg-[#0d5973] focus:text-white`}
                name="btn"
              >
                Credit Card
              </button>
            </div>
          </div>
          <div className="w-[90%] m-auto">
            <button
              onClick={async () => {
                if (infor.name != "") {
                  if (infor.email != "") {
                    if (infor.phone != "") {
                      if (check.username && check.password) {
                        await dispatch(ChangeCart(infor));
                        localStorage.clear("cart");
                        navigate("/");
                        setinfor({
                          name: "",
                          email: "",
                          phone: "",
                          city: "",
                          state: "",
                          country: "",
                          title: "",
                        });
                      } else {
                        await dispatch(CheckEmail(infor));
                        localStorage.clear("product");
                        navigate("/");
                        setinfor({
                          name: "",
                          email: "",
                          phone: "",
                          city: "",
                          state: "",
                          country: "",
                          title: "",
                        });
                      }
                    } else {
                      alert("Please enter Phone");
                    }
                  } else {
                    alert("Please enter Email");
                  }
                } else {
                  alert("Please enter Name");
                }
              }}
              className="text-[#0d5973] w-[100%] hover:font-bold duration-300 ease-in-out"
            >
              Confirm & Pay ${" "}
              {check.username
                ? card[0] &&
                  card[0].product.reduce(
                    (el, el1) => el + el1.product_price * el1.quantity,
                    0
                  )
                : card1.reduce((el, el1) => el + el1.price * el1.quantity, 0)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
