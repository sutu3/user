import { useRef } from "react";

const Date = ({ date, infor, change }) => {
  console.log(date)
const arr1 = date ? date.split("-").reverse() : ["", "", ""];
  const dayRef = useRef(null);
  const monthRef = useRef(null);
  const yearRef = useRef(null);
  const arr = [
    {
      value: "Ngày",
      name: "dayRef",
      placeholder:"eg. 12",
      length: "2",
      ref: dayRef,
      next: monthRef,
    },
    {
      value: "Tháng",
      name: "monthRef",
      placeholder:"eg. 1",
      length: "2",
      ref: monthRef,
      next: yearRef,
    },
    {
      value: "Năm",
      name: "yearRef",
      placeholder:"eg. 2003",
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
    <div className="flex flex-col">
    <div className="p-2 pl-0  font-bold text-[13px] font-sans">
      Birth Day
    </div>
      <div className="flex gap-3 m-2 mt-0 w-full ml-2">
        {arr.map((el, index) => (
          <div key={index} className="relative">
            <input
              className="
          p-2 pl-4 border-[1.5px] border-slate-200 w-52  rounded-md bg-white"
              key={index}
              defaultValue={arr1[index]}
              placeholder={el.placeholder}
              type="text"
              ref={el.ref}
              maxLength={el.length}
              onKeyDown={(e) => handleKeyDown(e, el.next)}
              onKeyUp={(e) =>
                handleKeyUp(e, index > 0 ? arr[index - 1].ref : null)
              }
              onChange={(e)=>{
                if(
                  yearRef.current.value.length>3&& monthRef.current.value.length>1 && dayRef.current.value.length>1
                )
                {
                  change({...infor,dayOfBirth:`${yearRef.current.value}-${monthRef.current.value}-${dayRef.current.value}`})
                }
               
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Date;
