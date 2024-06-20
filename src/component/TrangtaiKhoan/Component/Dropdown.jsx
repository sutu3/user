import { useState } from "react";

 const Dropdown = ({ defaultValue, placeholder,option,infor,change }) => {
  const [isOpen, setIsOpen] = useState(false);
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear; i >= currentYear - 25; i--) {
    years.push(i);
  }

  const handleOptionSelect = (option) => {
    change({...infor,gender:option})
    setIsOpen(false);
  };

  return (
    <div>
    <div className="p-2 pb-0 font-bold text-[13px] font-sans">I'm</div>
    <div className="relative w-56 pt-2 p-1">
      <button
        className="w-full bg-white border border-gray-300 rounded-lg p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {defaultValue || placeholder}
      </button>
      {isOpen && (
        <ul className=" h-[145px] overflow-hidden absolute z-10 w-full bg-white border border-gray-200 rounded-2xl mt-1">
          {option.map((option, index) => (
            <li
              key={index}
              className="p-1  cursor-pointer bg-slate-100 h-12 hover:bg-gray-200 justify-center items-center flex"
              onClick={() => handleOptionSelect(option)}
            >
              <span className="block h-6 w-full text-center rounded-lg text-black">
                {option}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
    </div>
  );
};

export default Dropdown;
