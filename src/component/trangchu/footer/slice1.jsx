//import React from 'react'

const arr=[
  {
  name:'Áo Thun',
  link:'https://i.pinimg.com/564x/15/f4/71/15f471d3a4254d7b615fb3e1eeaf9ca9.jpg'
  },
  {
  name:'Áo sơ mi',
  link:'https://i.pinimg.com/736x/fe/fd/d4/fefdd401005aa5e6b1a1944fe3439f05.jpg'
  },
  {
  name:'Áo Polo',
  link:'https://i.pinimg.com/564x/18/e0/90/18e0905588279f30a0766cbc810f0eb4.jpg'
  },
  {
  name:'Áo khoác nam',
  link:'https://i.pinimg.com/564x/54/80/25/548025b94b5675e2e5c739ed44fc1491.jpg'
  },
]
const slice1 = () => {
 
  return (
    <div className="w-full ">
    <div className=" ml-56 pb-4 text-3xl m-auto uppercase text-gray-400">Áo Nam</div>
    <div className=" flex flex-wrap w-[70%] font-serif
    m-auto gap-5 border-gray-400 border-b-2">
      {
        arr.map((el,index)=>(<div key={index} className="w-60 h-96">
          <img className="transition-all ease-in-out hover:duration-100 
          h-80 w-full border-black hover:border-2
          object-cover rounded-lg border-solid border-1" src={el.link} alt="" />
          <div className="font-bold p-2">{el.name}</div>
        </div>))
      }
      </div>
    </div>
  );
};

export default slice1;
