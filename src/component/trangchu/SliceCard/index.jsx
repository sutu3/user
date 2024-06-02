import { useState, useEffect, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { StateCard, Cart, Productinfor } from "../../redux/selector";
import { UpdateQuantity,DeleteCartElement } from "../../redux/CartSlice";
import Dropdown from "./Dropdown";

const Index = () => {
  const dispatch = useDispatch();
  const state = useSelector(StateCard);
  const product = useSelector(Productinfor);
  const card = useSelector(Cart);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});

  useEffect(() => {
    const initialColors = {};
    const initialSizes = {};
    card.forEach((el, index) => {
      initialColors[index] = el.variants?.color || '';
      initialSizes[index] = el.variants?.size || '';
    });
    setSelectedColors(initialColors);
    setSelectedSizes(initialSizes);
  }, [card]);

  const handleColorSelect = (index, color) => {
    setSelectedColors((prev) => ({ ...prev, [index]: color }));
  };

  const handleSizeSelect = (index, size) => {
    setSelectedSizes((prev) => ({ ...prev, [index]: size }));
  };

  const getAvailableSizes = (el, el1) => {
    return el1.sizes
      .filter((sizeObj) =>
        sizeObj.colors.some(
          (colorObj) => colorObj.color === el.variants.color
        )
      )
      .map((sizeObj) => sizeObj.size);
  };

  return (
    <div
      className={`border-b-indigo-100 w-[25%] h-96 top-24 transition-transform duration-700 ease-in-out sticky rounded-lg gap-5 flex-col transform ${
        state ? "translate-x-full" : ""
      }`}
    >
      {card.map((el, cardIndex) => (
        <div key={cardIndex} className="flex flex-row h-28 m-2 gap-3">
          <input type="checkbox" name="" id="" />
          <img
            className="w-20 h-full rounded-md"
            src={
              "https://dongphuchaianh.vn/wp-content/uploads/2022/05/quan-ao-cong-so-dep.jpg"
            }
            alt=""
          />
          <div>
            <div className="text-sm m-2 font-bold">{el.product_name}</div>
            {product.map((el1, productIndex) =>
              el1.sizes.map((el2, sizeIndex) =>
                el2.colors.map((el3, colorIndex) => {
                  const color=Array.isArray(el1.sizes)
      ? el1.sizes
          .flatMap((sizeObj) => 
            (selectedSizes[cardIndex] === "" || sizeObj.size === selectedSizes[cardIndex])
              ? sizeObj.colors.map((colorObj) => colorObj.color)
              : []
          )
      : []
                  if (el3.variants[0].variants_id === el.idvariant) {
                    const availableSizes = getAvailableSizes(el, el1);
                    return (
                      <div key={`${productIndex}-${sizeIndex}-${colorIndex}`} className="flex flex-row gap-4">
                        <div className="flex flex-col gap-2">
                          <div className="w-20 text-[13px]">
                            <Dropdown
                             OrderItem={el.order_items_id}
                             options={
                                color
                              }
                              index={productIndex}
                              size={selectedSizes[cardIndex]}
                              color={selectedColors[cardIndex]}
                              selectedOption={selectedColors[cardIndex]}
                              onOptionSelect={(color) =>
                                handleColorSelect(cardIndex, color)
                              }
                              account_id={el.account_id}
                              placeholder="Color"
                              defaultValue={
                                color.some((col) => el.variants.color === col)
                                  ? el.variants.color
                                  : ''
                              }                            />
                          </div>
                          <div className="w-20 text-[13px]">
                            <Dropdown
                            OrderItem={el.order_items_id}
                              options={el1.sizes.flatMap(sizeObj => sizeObj.size)}
                              selectedOption={selectedSizes[cardIndex]}
                              onOptionSelect={(size) =>
                                handleSizeSelect(cardIndex, size)
                              }
                              account_id={el.account_id}
                              index={productIndex}
                              size={selectedSizes[cardIndex]}
                              color={selectedColors[cardIndex]}
                              placeholder="Size"
                              defaultValue={el.variants.size}
                            />
                          </div>
                        </div>
                        <div>
                          <div className="flex flex-row bg-slate-50 rounded-full">
                            <button
                              onClick={() => {
                                console.log(el.account_id)
                                if (el.quantity > 1) {
                                  dispatch(UpdateQuantity({
                                    account_id:el.account_id,
                                    order_items_id: el.order_items_id,
                                    quantity: el.quantity - 1,
                                  }));
                                }
                                else{
                                  dispatch(DeleteCartElement({
                                    account_id:el.account_id,
                                    order_items_id: el.order_items_id,
                                  }))
                                }
                              }}
                              className="bg-transparent rounded-s-2xl h-10 flex items-center justify-center px-4"
                            >
                              -
                            </button>
                            <span className="w-10 flex items-center justify-center">
                              {el.quantity}
                            </span>
                            <button
                              onClick={() => {
                                dispatch(UpdateQuantity({
                                  account_id:el.account_id,
                                  order_items_id: el.order_items_id,
                                  quantity: el.quantity + 1,
                                }));
                              }}
                              className="bg-transparent rounded-e-2xl h-10 flex items-center justify-center px-4"
                            >
                              +
                            </button>
                          </div>
                          <div className="font-mono text-xl ml-10 mt-5">
                            {el.product_price}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  return null;
                })
              )
            )}
          </div>
        </div>
      ))}
      {card.length !== 0 ? (
        <div className="w-full flex gap-3 justify-center mt-10">
          <button className="bg-slate-100 w-3/4 p-2 transition duration-300 ease-in-out hover:text-slate-200 hover:bg-slate-500">
            Thanh toán
          </button>
          <button className="bg-white text-red-500 text-sm hover:border-red-500">Clean</button>
        </div>
      ) : (
        <div className="bg-gradient-to-r from-violet-500 to-fuchsia-500 bg-center bg-no-repeat bg-cover h-40 w-40 ml-20 text-center pt-28 text-sm text-slate-500 font-sans" style={{ backgroundImage: "url(https://janbox.com/_nuxt/img/notfound.ab34387.svg)" }}>
          Chưa có sản phẩm trong giỏ hàng
        </div>
      )}
    </div>
  );
};

export default Index;
