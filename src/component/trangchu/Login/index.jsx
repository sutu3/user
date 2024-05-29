//import React from "react";
import { Link,Outlet } from "react-router-dom";
const index = () => {
  return (
    <div className="absolute top-28 w-full">
      <div className='className="h-96 w-96 m-auto "'>
        <div className="flex w-full">
        <div className="w-fit m-auto flex gap-3 ">
          <Link to="signin"  className="flex justify-center items-center rounded-md text-slate-700 h-12 pl-10 pr-10 bg-slate-200 transition-colors duration-200 ease-in-out hover:bg-slate-600 hover:text-slate-200 font-mono focus:text-slate-200 focus:bg-slate-600">
            Sign in
          </Link>
          <Link  to="signup"  className="flex justify-center items-center rounded-md text-slate-700 h-12 pl-10 pr-10 bg-slate-200 transition-colors duration-200 ease-in-out hover:bg-slate-600 hover:text-slate-200 font-mono focus:text-slate-200 focus:bg-slate-600">
            Sign up
          </Link>
          </div>
        </div>
        <div className="w-[80%] m-auto">
            <Outlet/>
        </div>
      </div>
    </div>
  );
};

export default index;
