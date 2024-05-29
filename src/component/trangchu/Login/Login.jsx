import {  useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  SendAccount
} from "../../redux/AccountSlice.js";
import { CheckLogin, StateLogin } from "../../redux/selector";
import { useNavigate  } from "react-router-dom";
const Login = () => {
  const navigate = useNavigate();
  const check = useSelector(CheckLogin);
  const state = useSelector(StateLogin);
  //{!state&& alert("Login already")}
  const dispatch = useDispatch();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
   useEffect(() => {
    if (check.username && check.password) {
      navigate('/');
    }
  }, [check, navigate]);
  return (
    
    <div className="">
      <div
        className="h-96"
      >
        <h1 className="text-center mb-16">Đăng Nhập</h1>
        <div className="mb-5 h-10 flex justify-center  items-center relative">
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
            placeholder="Enter Your Email Acount"
          />
                    <span className='absolute -top-1/3 left-[5%] text-sm text-gray-500 bg-white'>Email</span>
          {/*
          state: check coi đã gửi thông tin lên serve chu
          */}
          {!check.username && state && (
            <span className="bg-white text-sm absolute top-[70%] left-4 rounded-lg text-red-500">
              Không Tìm Thấy email tài khoản
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
          <span className='absolute -top-1/3 left-[5%] text-sm text-gray-500 bg-white'>Password</span>
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
        <div className="flex gap-10 w-[70%] m-auto mt-5">
          <button
            onClick={() => {
              dispatch(SendAccount({
                email:username,
                pass:password,
              }))
              setUsername('')
              setPassword('')
            }}
            className="bg-orange-400  w-[290px] text-white border-0 focus:outline-none hover:outline-black active:outline-blue-600 pl-4 pr-4 outline outline-2 outline-offset-2"
          >
            Đăng Nhập Tài Khoản
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
