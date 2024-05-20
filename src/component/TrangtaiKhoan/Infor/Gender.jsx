import { useState } from "react";

const genderOptions = ['Nam', 'Nu', 'Khác'];

const Gender = ({ gender1,infor,change }) => {
  // Đặt giá trị mặc định cho selectedGender từ gender1
  const [selectedGender, setSelectedGender] = useState(gender1 || "");

  return (
    <div>
      <h3>Giới Tính</h3>
      <div className="w-72 p-5 flex gap-2">
        {
          genderOptions.map((el, index) => (
            <button 
              key={index}
              className="bg-white border-solid border-black border-2 flex gap-2"
              onClick={() => setSelectedGender(el)}
            >
              <input
                type="radio"
                checked={selectedGender === el} // Sử dụng checked thay vì defaultChecked
                name="gioitinh"
                id={el}
                className="h-full"
                onClick={()=>{
                    change({
                        ...infor,
                        accountgender:el
                    })
                }}
              />
              <label htmlFor={el}>{el}</label>
            </button>
          ))
        }
      </div>
    </div>
  );
};

export default Gender;