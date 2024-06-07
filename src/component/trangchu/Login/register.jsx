import  { useEffect,useState } from 'react'
import { sendSignUp } from '../../redux/AccountSlice'
import { CheckLogin } from '../../redux/selector'
import { useDispatch,useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
const Register = () => {
    const dispatch = useDispatch()
    const navigate=useNavigate()
    const check = useSelector(CheckLogin)
    const [name,setname]=useState('')
    const [email,setemail]=useState('')
    const [pass,setpass]=useState('')
    const [phone,setphone]=useState('')
    useEffect(() => {
    if (check.username && check.password) {
      navigate('/');
    }
  }, [check, navigate]);
  return (

      <div className="h-96">
        <h1 className="text-center mb-16">Đăng Ký</h1>
        <div className='flex flex-col gap-5'>
        <div className="h-10 flex justify-center items-center relative">
          <input value={name} onChange={(e) => {
            setname(e.target.value)
            }}
            className="rounded-lg pl-10 h-full w-full border-2 border-solid absolute 
        border-black active:border-0 top-0 left-0"
            type="text"
            placeholder="Enter Your Username"
          />
        <span className='absolute -top-1/3 left-[5%] text-sm text-gray-500 bg-white'>username</span>

          <div
            className="absolute left-[90%] bg-no-repeat bg-center bg-cover w-5 h-5"
            style={{ backgroundImage: "url(src/assets/Image/Username.png)" }}
          ></div>
        </div>
          <div className="h-10 flex justify-center items-center relative">
          <input value={email} onChange={(e) => {
            setemail(e.target.value)
            }}
            className="rounded-lg pl-10 h-full w-full border-2 border-solid absolute 
        border-black active:border-0 top-0 left-0"
            type="email"
            placeholder="Enter Your Email"
          />
        <span className='absolute -top-1/3 left-[5%] text-sm text-gray-500 bg-white'>Email</span>

          <div
            className="absolute left-[90%] bg-no-repeat bg-center bg-cover w-5 h-5"
            style={{ backgroundImage: "url(src/assets/Image/Username.png)" }}
          ></div>
        </div>
        <div className="h-10 flex justify-center items-center relative">
          <input value={pass} onChange={(e) => {
            setpass(e.target.value)
            }}
            className="rounded-lg pl-10 h-full w-full border-2 border-solid absolute 
        border-black active:border-0 top-0 left-0"
            type="text"
            placeholder="Enter Your Password"
          />
        <span className='absolute -top-1/3 left-[5%] text-sm text-gray-500 bg-white'>Password</span>

          <div
            className="absolute left-[90%] bg-no-repeat bg-center bg-cover w-5 h-5"
            style={{ backgroundImage: "url(src/assets/Image/Username.png)" }}
          ></div>
        </div>
        <div className="h-10 flex justify-center items-center relative">
          <input value={phone} onChange={(e) => {
            setphone(e.target.value)
            }}
            className="rounded-lg pl-10 h-full w-full border-2 border-solid absolute 
        border-black active:border-0 top-0 left-0"
            type="text"
            placeholder="Enter Your PhoneNumber"
          />
        <span className='absolute -top-1/3 left-[5%] text-sm text-gray-500 bg-white'>Phone</span>

          <div
            className="absolute left-[90%] bg-no-repeat bg-center bg-cover w-5 h-5"
            style={{ backgroundImage: "url(src/assets/Image/Username.png)" }}
          ></div>
        </div>
        </div>
        <div className="flex gap-10 w-[70%] m-auto mt-5">
          <button
            onClick={() => {
                dispatch(sendSignUp({
                    email:email,
                    username:name,
                    phoneNumber:phone,
                    password:pass
                }))
                setemail('')
                setname('')
                setpass('')
                setphone('')
            }}
            className="bg-orange-400 text-white border-0 focus:outline-none hover:outline-black active:outline-blue-600 pl-8 pr-8 w-[290px] outline outline-2 outline-offset-2"
          >
            Tạo Tài Khoản
          </button>
        </div>
    </div>
  )
}

export default Register
