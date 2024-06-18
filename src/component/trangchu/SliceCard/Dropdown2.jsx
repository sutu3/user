import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector} from "react-redux";
import { CheckElement } from "../../redux/CartSlice";
import { Element2 } from "../../redux/selector";
const Dropdown = ({quantity,color,size,index, options, selectedOption, onOptionSelect, placeholder, defaultValue, selectedSizes, cardIndex }) => {
  const change=useSelector(Element2)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch=useDispatch()
  const [currentOption, setCurrentOption] = useState(
    selectedOption || (defaultValue !== '' ? defaultValue : "")
  );

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    console.log(option)
    dispatch(CheckElement({
        id:1,
        data:{
            var:placeholder,
            value:option,
            quantity:quantity,
            index:index,
            cardIndex:cardIndex,
            size:placeholder=='Size'?option:size,
            color:placeholder=='Color'?option:color,}
    }))
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
    
    if (!selectedOption && defaultValue && defaultValue !== '') {
      setCurrentOption(defaultValue);
    }
  }, [defaultValue, selectedOption]);

  useEffect(() => {
    console.log(defaultValue)
    console.log(currentOption)
    if(defaultValue!="")
        {
            if (!options.includes(defaultValue)) {
      setCurrentOption("");
    }
        }
        else{
            if (!options.includes(currentOption)) {
      setCurrentOption("");
    }
        }
    
  }, [options, selectedSizes, cardIndex]);

  return (
    <div ref={dropdownRef} className="relative w-28">
      <button
        className="w-full bg-white border border-gray-300 rounded-2xl p-2"
        onClick={handleToggle}
      >
        {defaultValue ? (
          <span
            style={{ backgroundColor: defaultValue, color: defaultValue }}
            className={`p-2 rounded-md`}
          >
            {defaultValue}
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
              className="p-2 cursor-pointer bg-slate-500 hover:bg-gray-200"
              onClick={() => handleOptionSelect(option)}
            >
              <span
                style={{ backgroundColor: option }}
                className="block h-6 w-full text-center rounded-lg text-white "
              >
                {placeholder === 'Size' ? option : ""}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
