//import React from 'react'
//https://cdn.pixabay.com/photo/2021/02/20/06/17/woman-6032412_960_720.jpg

import "./style.css";
const Header = () => {
  return (
    <div className="w-full h-[45rem] head relative">
      <div
        className="flex mb-11 ml-[20%]
      items-start justify-center font-serif flex-col"
      >
        <div className="text-xl text-gray-200 font-bold">Up To 50% Off</div>
        <div className="text-7xl text-[hsl(33,93%,54%)]">Shirt For Man</div>
        <div className="w-80 m-10 text-white ml-0">
          Maboriosam in a nesciung eget magnae dapibus disting tloctio in the
          find it pereri odiy maboriosm.
        </div>
        <button className="text-[hsl(33,93%,54%)] hover:bg-[hsl(33,93%,54%)] border-0
        hover:border-0 text-lg bg-while
         hover:text-white transition duration-300 ease-in-out">Shop more</button>
      </div>
    </div>
  );
};

export default Header;
