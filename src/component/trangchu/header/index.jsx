//import React from 'react'
//https://cdn.pixabay.com/photo/2021/02/20/06/17/woman-6032412_960_720.jpg
import './style.css'
const Header = () => {
  return (
    <div className="w-full h-[45rem] head">
      <div className="flex mb-11
      items-center justify-center font-serif flex-col">
        <div className="text-7xl mb-5">J Fashion Hub</div> 
        <div className="text-lg text-gray-500">Nơi tinh hoa thời trang gặp nhau</div> 
      </div>
      <ul className="flex flex-row gap-10 w-2/4 m-auto ">
        <li className="before:content-['']  relative hover:before:content-['Trang_phuc'] 
         hover:before:w-full hover:before:flex 
        hover:before:justify-center hover:before:items-center text-xl font-bold font-serif text-yellow-50
        hover:before:h-full hover:before:absolute hover:before:top-0
        hover:before:backdrop-blur-sm hover:before:transition hover:before:duration-700 ease-in-out
        bg-no-repeat rounded-xl bg-center bg-cover w-80 h-[28rem] drop-shadow-2xl translate-y-16" 
        style={{backgroundImage:'url(https://i.pinimg.com/564x/d2/a7/3e/d2a73e4869a7a61c33e0c3d07acd4ce9.jpg)'}}></li>
        <li className="before:content-['']  relative hover:before:content-['Trang_phuc'] 
         hover:before:w-full hover:before:flex 
        hover:before:justify-center hover:before:items-center text-xl font-bold font-serif text-yellow-50
        hover:before:h-full hover:before:absolute hover:before:top-0
        hover:before:backdrop-blur-sm hover:before:transition hover:before:duration-700 ease-in-out
        bg-no-repeat rounded-xl bg-center bg-cover w-80 h-[28rem] drop-shadow-2xl" 
        style={{backgroundImage:'url(https://i.pinimg.com/564x/d3/50/9b/d3509bc9fb5c092024331cb698aa2817.jpg)'}}></li>
        <li className="before:content-['']  relative hover:before:content-['Trang_phuc'] 
        hover:before:block hover:before:w-full hover:before:flex 
        hover:before:justify-center hover:before:items-center text-xl font-bold font-serif text-yellow-50
        hover:before:h-full hover:before:absolute hover:before:top-0
        hover:before:backdrop-blur-sm hover:before:transition hover:before:duration-700 ease-in-out
        bg-no-repeat rounded-xl bg-center bg-cover w-80 h-[28rem] drop-shadow-2xl translate-y-16" 
        style={{backgroundImage:'url(https://i.pinimg.com/564x/63/9e/9c/639e9cd63cfc2554658a759070ff9d6f.jpg)'}}></li>
      </ul>
    </div>
  )
}

export default Header
