import { useState, useRef, useEffect } from "react";

const Dropdown = ({ options, selectedOption, onOptionSelect, placeholder, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const [currentOption, setCurrentOption] = useState(selectedOption || defaultValue);

  const handleToggle = () => setIsOpen(!isOpen);
  const handleOptionSelect = (option) => {
    onOptionSelect(option);
    setCurrentOption(option);
    setIsOpen(false);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (!selectedOption && defaultValue) {
      setCurrentOption(defaultValue);
    }
  }, [defaultValue, selectedOption]);

  return (
    <div ref={dropdownRef} className="relative w-full">
      <button
        className="w-full bg-white border border-gray-300 rounded-2xl p-2"
        onClick={handleToggle}
      >
        {currentOption ? (
          <span
            style={{ backgroundColor: currentOption, color: currentOption }}
            className={`p-2 rounded-md`}
          >
            {currentOption}
          </span>
        ) : (
          placeholder
        )}
      </button>
      {isOpen && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-2xl mt-1">
          {options.map((option, index) => (
            <li
              key={index}
              style={{ backgroundColor: option, padding: "10px", cursor: "pointer" }}
              className="p-2 cursor-pointer hover:bg-gray-200"
              onClick={() => handleOptionSelect(option)}
            >
              <span
                style={{ backgroundColor: option }}
                className="block h-6 w-full text-center rounded-md text-white"
              >
                {/* {option} */}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
