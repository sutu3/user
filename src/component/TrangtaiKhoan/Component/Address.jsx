import React from "react";

const Address = ({ el }) => {
  return (
    <div className="w-[90%] bg-slate-100 m-auto mb-2  shadow-md rounded-md">
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
  );
};

export default Address;
