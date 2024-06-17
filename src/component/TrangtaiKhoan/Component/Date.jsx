import { useRef } from "react";

const Date = ({ date, infor, change }) => {
  console.log(date)
const arr1 = date ? date.split("-") : ["0000", "00", "00"];
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const arr = [
    {
      value: "Ngày",
      name: "dayRef",
      length: "2",
      ref: dayRef,
      next: monthRef,
    },
    {
      value: "Tháng",
      name: "monthRef",
      length: "2",
      ref: monthRef,
      next: yearRef,
    },
    {
      value: "Năm",
      name: "yearRef",
      length: "4",
      ref: yearRef,
      next: null,
    },
  ];
  const handleKeyUp = (e, prevRef) => {
    if (e.keyCode === 8 || e.keyCode === 46) {
      // Kiểm tra nếu là phím Backspace hoặc Delete
      if (e.target.value === "") {
        if (prevRef) {
          prevRef.current.focus();
          prevRef.current.value = ""; // Xóa nội dung của trường trước đó
        }
      } else {
        e.target.value = ""; // Xóa nội dung của trường hiện tại
      }
    }
  };

  const handleKeyDown = (e, nextRef) => {
    if (e.target.value.length > e.target.maxLength - 1) {
      if (/^\d+$/.test(e.target.value)) {
        if (nextRef) {
          // Đặt lại giá trị của trường input hiện tại
          nextRef.current.focus();
        } else {
          console.log("Đã nhập đủ thông tin ngày tháng năm");
        }
      }
    }
  };

  return (
    <div>
      <div className="flex gap-4 m-2 w-full ml-2">
        {arr.map((el, index) => (
          <div key={index} className="relative">
            <span className="absolute bg-[#f2f2f2] text-sm uppercase text-[10px] -top-4 -left-3 rounded-md">
              {el.value}
            </span>
            <input
              className="
          p-2 border-2 border-solid border-gray-300 w-20 text-center rounded-md bg-slate-200"
              key={index}
              defaultValue={arr1[index]}
              placeholder={el.value}
              type="text"
              ref={el.ref}
              maxLength={el.length}
              onKeyDown={(e) => handleKeyDown(e, el.next)}
              onKeyUp={(e) =>
                handleKeyUp(e, index > 0 ? arr[index - 1].ref : null)
              }
            />
          </div>
        ))}
        <button
          className="bg-white border-solid border-gray-500 border-2px rounded-md"
          onClick={() => {
            change({
              ...infor,
              dayOfBirth: `${yearRef.current.value}-${monthRef.current.value}-${dayRef.current.value}`,
            });
          }}
        >
          cap nhap
        </button>
      </div>
    </div>
  );
};

export default Date;