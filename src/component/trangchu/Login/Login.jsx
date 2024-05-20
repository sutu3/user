import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  checkAcountName,
  logincheck,
  checkAcountPass,
} from "../../redux/AccountSlice.js";
import { CheckLogin, UserLogin, StateLogin, User } from "../../redux/selector";
import { Link,useNavigate  } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const check = useSelector(CheckLogin);
  const user = useSelector(UserLogin);
  const state = useSelector(StateLogin);
  const Infor = useSelector(User);
  //{!state&& alert("Login already")}
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [telephone, setTelephone] = useState("");
  const [email, setEmail] = useState("");
  const [display, setdisplay] = useState(true);

  return (
    <div className="absolute top-28 w-full">
      <div
        className="h-96 w-96 m-auto "
        style={{ display: display ? "block" : "none" }}
      >
        <h1 className="text-center mb-16">Đăng Nhập</h1>
        <div className="mb-5 h-10 flex justify-center items-center relative">
          <input
            style={
              !check.username && state
                ? { border: "1px solid red" }
                : { border: "1px solid black" }
            }
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="rounded-lg pl-10 h-full w-full border-2 border-solid 
        border-black active:border-0"
            type="text"
            placeholder="Enter Your Name Acount"
          />
          {/*
          state: check coi đã gửi thông tin lên serve chu
          */}
          {!check.username && state && (
            <span className="bg-white text-sm absolute top-[70%] left-4 rounded-lg text-red-500">
              Không Tìm Thấy tên tài khoản
            </span>
          )}
          <div
            className="absolute left-[90%] bg-no-repeat bg-center bg-cover w-5 h-5"
            style={{ backgroundImage: "url(src/assets/Image/Username.png)" }}
          ></div>
        </div>

        <div className="h-10 flex justify-center items-center justify-between relative">
          <input
            style={
              check.username && !check.password
                ? { border: "1px solid red" }
                : { border: "1px solid black" }
            }
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="rounded-lg pl-10 h-full w-full border-2 border-solid 
        border-black active:border-0"
            type="text"
            placeholder="Enter Your Pass Acount"
          />
          {check.username && !check.password && (
            <span className="bg-white text-sm absolute top-[70%] left-4 rounded-lg text-red-500">
              Nhập sai mật khẩu
            </span>
          )}
          <div
            className="absolute left-[90%] bg-no-repeat bg-center bg-cover w-5 h-5"
            style={{ backgroundImage: "url(src/assets/Image/Pass.png)" }}
          ></div>
        </div>
        <div className="w-full flex justify-end">Forgot password</div>
        <div className="flex gap-10 w-fit m-auto mt-5">
          <button
            onClick={() => {
              dispatch(
                checkAcountName({
                  username: username,
                })
              );
              {
                check.username && dispatch(checkAcountPass(password));
              }
              console.log(check.username + " " + check.password);
              {(check.username && check.password)&&navigate('/')}
            }}
            className="bg-orange-400 text-white border-0"
          >
            Đăng Nhập
          </button>
          <button
            onClick={() => {
              setdisplay(!display);
            }}
            className="bg-white active:border-blue-400"
          >
            Đăng Ký
          </button>
        </div>
      </div>
      {/* Đăng ký*/}
      <div
        className="h-96 w-96 m-auto "
        style={{ display: !display ? "block" : "none" }}
      >
        <h1 className="text-center mb-16">Đăng Ký</h1>
        <div className="mb-5 h-10 flex justify-center items-center  relative">
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            className="rounded-lg pl-10 h-full w-full border-2 border-solid 
        border-black active:border-0"
            type="text"
            placeholder="Enter Your Name Acount"
          />
          <div
            className="absolute left-[90%] bg-no-repeat bg-center bg-cover w-5 h-5"
            style={{ backgroundImage: "url(src/assets/Image/Username.png)" }}
          ></div>
        </div>
        <div className="mb-5 h-10 flex justify-center items-center relative">
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="rounded-lg pl-10 h-full w-full border-2 border-solid 
        border-black active:border-0"
            type="text"
            placeholder="Enter Your Pass Acount"
          />
          <div
            className="absolute left-[90%] bg-no-repeat bg-center bg-cover w-5 h-5"
            style={{ backgroundImage: "url(src/assets/Image/Pass.png)" }}
          ></div>
        </div>

        <div className="mb-5 h-10 flex justify-center items-center relative">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            className="rounded-lg pl-10 h-full w-full border-2 border-solid 
        border-black active:border-0"
            type="email"
            placeholder="Enter Your Email"
          />
          <div
            className="absolute left-[90%] bg-no-repeat bg-center bg-cover w-5 h-5"
            style={{ backgroundImage: "url(src/assets/Image/email.png)" }}
          ></div>
        </div>
        <div className="mb-5 h-10 flex justify-center items-center relative">
          <input
            value={telephone}
            onChange={(e) => {
              setTelephone(e.target.value);
            }}
            className="rounded-lg pl-10 h-full w-full border-2 border-solid 
        border-black active:border-0"
            type="text"
            placeholder="Enter Your Telephone"
          />
          <div
            className="absolute left-[90%] bg-no-repeat bg-center bg-cover w-5 h-5"
            style={{ backgroundImage: "url(src/assets/Image/telephone.png)" }}
          ></div>
        </div>

        <div className="flex gap-10 w-fit m-auto mt-5">
          <button
            onClick={() => {
              console.log(1);
              dispatch(
                logincheck({
                  accountusername: username,
                  accountpassword: password,
                  accountphonenumber: telephone,
                  accountemail: email,
                })
              );
            }}
            className="bg-orange-400 text-white border-0"
          >
            Đăng Ký
          </button>
          <button
            onClick={() => {
              setdisplay("none");
            }}
            className="bg-white active:border-blue-400"
          >
            Đăng Nhập
          </button>
        </div>
      </div>
      <div className="bg-blue-400 w-1/2 m-auto h-96"> Đăng nhập xong </div>
    </div>
  );
};

export default Login;
