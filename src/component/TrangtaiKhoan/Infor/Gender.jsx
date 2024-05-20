import { useState } from "react";

const genderOptions = ["Nam", "Nu", "Khác"];

const Gender = ({ gender1, infor, change }) => {
  const [selectedGender, setSelectedGender] = useState(gender1 || "");
  const [flat, setFlat] = useState([false, false, false]);

  const handleButtonClick = (index) => {
    const newFlat = flat.map((value, idx) => idx === index);
    setFlat(newFlat);
    setSelectedGender(genderOptions[index]);
    change({
      ...infor,
      accountgender: genderOptions[index],
    });
  };
  return (
    <div className="ml-10">
      <h3>Giới Tính</h3>
      <div className="w-72 p-2 flex gap-2">
        {genderOptions.map((el, index) => (
          <button
            style={{ backgroundColor: flat[index] ? '#aeadee' : 'white' }}
            key={index}
            className="bg-white border-solid border-black border-1 flex gap-2"
            onClick={() => handleButtonClick(index)}
          >
            <input
              type="radio"
              checked={selectedGender === el}
              name="gioitinh"
              id={el}
              className="h-full"
            />
            <label htmlFor={el}>{el}</label>
          </button>
        ))}
      </div>
    </div>
  );
};

export default Gender;