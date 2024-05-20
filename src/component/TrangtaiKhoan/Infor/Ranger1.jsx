import React, { useState } from "react";

const Ranger = ({ weight, infor, change }) => {
  const [weightValue, setHeightValue] = useState(weight);

  const handleChange = (e) => {
    setHeightValue(e.target.value);
  };

  return (
    <div className='flex h-12 w-full justify-center items-center'>
      <div className='w-full flex gap-2'>
        <button
          onClick={() => {
            change({
              ...infor,
              accountweight: weightValue,
            });
          }}
          className="w-28 h-10 bg-white border-solid border-black border-2 text-sm"
        >
          Cân Nặng
        </button>
        <input
          type="range"
          min="40"
          max="100"
          value={weightValue}
          onChange={handleChange}
          className='slider flex items-center justify-center h-2 translate-y-2 rounded-lg'
          step={1}
          style={{
            width: '40%',
            background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
            opacity: '0.7',
            cursor: 'pointer',
            WebkitAppearance: 'none',
            borderRadius: '10px',
          }}
        />
        <div className='flex justify-center items-center' style={{ textAlign: 'center' }}>
          {weightValue} Kg
        </div>
      </div>
    </div>
  );
};

export default Ranger;
