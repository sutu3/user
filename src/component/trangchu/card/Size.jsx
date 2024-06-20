import { useState } from 'react';

const MyComponent = ({ product1,setcolor,color }) => {
  const colorSet = new Set();

  return (
    <ul className="w-36 flex flex-row gap-2 m-4 mb-0">
      {product1.sizes.map((size) => {
        return size.colors.map((colorObj, index) => {
          if (colorSet.has(colorObj.color)) {
            return null;
          }
          colorSet.add(colorObj.color);
          return (
            <li
              key={index}
              onClick={() => {
                setcolor(colorObj.color);
              }}
              style={{
                backgroundColor: colorObj.color,
                outline: color === colorObj.color ? '2px solid #3357FF' : 'none',
              }}
              className="w-10 h-4 rounded-lg hover:outline outline-offset-1 outline-blue-200 hover:duration-200"
            ></li>
          );
        });
      })}
    </ul>
  );
};

export default MyComponent;