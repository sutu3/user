import React, { useState } from "react";

const Ranger = ({ height, infor, change }) => {
  const [heightValue, setHeightValue] = useState(height);
console.log(heightValue)
  const handleChange = (e) => {
    setHeightValue(e.target.value);
  };

  return (
    <div className='flex h-12 w-full ml-10 justify-center items-center'>
      <div className='w-full flex gap-2'>
        <button
          onClick={() => {
            change({
              ...infor,
              height: heightValue,
            });
          }}
          className="w-28 h-10 bg-white border-solid border-black border-2 text-sm"
        >
          Chiều cao
        </button>
        <input
          type="range"
          min="140"
          max="185"
          value={heightValue}
          onChange={handleChange}
          className='slider flex items-center mt-2 justify-center h-2 translate-y-2 rounded-lg'
          step={1}
          style={{
            width: '60%',
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            opacity: '0.7',
            cursor: 'pointer',
            WebkitAppearance: 'none',
            borderRadius: '10px',
          }}
        />
        <div className='flex justify-center items-center' style={{ textAlign: 'center' }}>
          {heightValue} cm
        </div>
      </div>
    </div>
  );
};

export default Ranger;
