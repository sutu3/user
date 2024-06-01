import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector} from "react-redux";
import { UpdateElement } from "../../redux/CartSlice";
import { Element } from "../../redux/selector";
import CartSlice from "../../redux/CartSlice";
const Dropdown = ({account_id,OrderItem,color,size,index, options, selectedOption, onOptionSelect, placeholder, defaultValue, selectedSizes, cardIndex }) => {
  const change=useSelector(Element)
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch=useDispatch()
  const [currentOption, setCurrentOption] = useState(
    selectedOption || (defaultValue && defaultValue !== '' ? defaultValue : "")
  );

  const handleToggle = () => setIsOpen(!isOpen);

  const handleOptionSelect = (option) => {
    console.log(change)
    console.log(placeholder)
    if(change[index].Size!=''&&change[index].Color!='')
      {
        // dispatch(UpdateElement({
    //   account_id:account_id,
    //   order_items_id:OrderItem,
    //   size:placeholder=='Size'?option:size,
    //   color:placeholder=='Color'?option:color,
    //   index:index
    // }))
      }
      else{
        dispatch(CartSlice.actions.changeElement({index:index, var:placeholder,value:option}))
      }
    
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
    if (!options.includes(currentOption)) {
      setCurrentOption("");
    }
  }, [options, selectedSizes, cardIndex]);

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
