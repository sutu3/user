import { useState } from "react";

const Dropdown = ({ defaultValue, placeholder }) => {
  const [isOpen, setIsOpen] = useState(false);
  const years = [];
  const currentYear = new Date().getFullYear();

  for (let i = currentYear; i >= currentYear - 25; i--) {
    years.push(i);
  }

  const handleOptionSelect = (option) => {
    console.log('Selected year:', option);
    setIsOpen(false);
  };

  return (
    <div className="relative w-28">
      <button
        className="w-full bg-white border border-gray-300 rounded-2xl p-2"
        onClick={() => setIsOpen(!isOpen)}
      >
        {defaultValue || placeholder}
      </button>
      {isOpen && (
        <ul className="overflow-x-scroll h-52 absolute z-10 w-full bg-white border border-gray-300 rounded-2xl mt-1">
          {years.map((option, index) => (
            <li
              key={index}
              className="p-1 cursor-pointer bg-slate-200 h-5 hover:bg-gray-200"
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
  );
};

export default Dropdown;
