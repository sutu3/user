import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Cart, Productinfor } from "../redux/selector";
import { UpdateQuantity, DeleteCartElement } from "../redux/CartSlice";
import Dropdown from "../trangchu/SliceCard/Dropdown";
const arr = ["Product", "Size", "Color", "Quantity", "Total"];
const Index = () => {
  const dispatch = useDispatch();
  const product = useSelector(Productinfor);
  const card = useSelector(Cart);
  const [selectedColors, setSelectedColors] = useState({});
  const [selectedSizes, setSelectedSizes] = useState({});
  useEffect(() => {
    const initialColors = {};
    const initialSizes = {};
    card.forEach((el, index) => {
      initialColors[index] = el.variants?.color || "";
      initialSizes[index] = el.variants?.size || "";
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
        sizeObj.colors.some((colorObj) => colorObj.color === el.variants.color)
      )
      .map((sizeObj) => sizeObj.size);
  };

  return (
    <div className="h-[400px] overflow-x-hidden">
      {card[0] &&
            card[0].product.map((el, cardIndex) => (
              <div
                key={cardIndex}
                className="flex flex-row h-28 m-2 gap-3  border-b-2 border-gray-300 pb-4 pt-4"
              >
                <input type="checkbox" name="" id="" />
                <div className="w-44 flex flex-row">
                  <img
                    className="w-20 h-full rounded-md"
                    src={
                      //el.product[0].images[0].image_urlString
                      "https://tiemchupanh.com/wp-content/uploads/2020/10/887c7c43527f3d7d76a6267baff22df9.jpg"
                    }
                    alt=""
                  />
                  <div className="text-sm m-2 font-bold">{el.product_name}</div>
                </div>

                <div className="flex flex-row">
                  {product.map((el1, productIndex) =>
                    el1.sizes.map((el2, sizeIndex) =>
                      el2.colors.map((el3, colorIndex) => {
                        const color = Array.isArray(el1.sizes)
                          ? el1.sizes.flatMap((sizeObj) =>
                              selectedSizes[cardIndex] === "" ||
                              sizeObj.size === selectedSizes[cardIndex]
                                ? sizeObj.colors.map(
                                    (colorObj) => colorObj.color
                                  )
                                : []
                            )
                          : [];
                        if (el3.variants[0].variants_id === el.idvariant) {
                          const availableSizes = getAvailableSizes(el, el1);
                          return (
                            <div
                              key={`${productIndex}-${sizeIndex}-${colorIndex}`}
                              className="flex flex-row gap-4"
                            >
                              <div className="flex flex-row gap-2 w-64 items-center justify-between">
                                <Dropdown
                                  OrderItem={el.order_items_id}
                                  options={color}
                                  index={productIndex}
                                  cardIndex={cardIndex}
                                  size={selectedSizes[cardIndex]}
                                  color={selectedColors[cardIndex]}
                                  selectedOption={selectedColors[cardIndex]}
                                  onOptionSelect={(color) =>
                                    handleColorSelect(cardIndex, color)
                                  }
                                  account_id={el.account_id}
                                  placeholder="Color"
                                  defaultValue={
                                    color.some(
                                      (col) => el.variants.color === col
                                    )
                                      ? el.variants.color
                                      : ""
                                  }
                                />
                                <Dropdown
                                  OrderItem={el.order_items_id}
                                  cardIndex={cardIndex}
                                  options={el1.sizes.flatMap(
                                    (sizeObj) => sizeObj.size
                                  )}
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
                              <div className="flex flex-row w-80 justify-evenly items-center ml-5">
                                <div className="flex flex-row border-2 border-gray-200 bg-slate-50 rounded-full h-10">
                                  <button
                                    onClick={() => {
                                      if (el.quantity > 1) {
                                        dispatch(
                                          UpdateQuantity({
                                            account_id: el.account_id,
                                            order_items_id: el.order_items_id,
                                            quantity: el.quantity - 2,
                                          })
                                        );
                                      } else {
                                        dispatch(
                                          DeleteCartElement({
                                            account_id: el.account_id,
                                            order_items_id: el.order_items_id,
                                          })
                                        );
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
                                      dispatch(
                                        UpdateQuantity({
                                          account_id: el.account_id,
                                          order_items_id: el.order_items_id,
                                          quantity: el.quantity ,
                                        })
                                      );
                                    }}
                                    className="bg-transparent rounded-e-2xl h-10 flex items-center justify-center px-4"
                                  >
                                    +
                                  </button>
                                </div>
                                <div className="font-mono text-xl ml-10 mt-5">
                                  ${el.product_price * el.quantity}
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
    </div>
  );
};

export default Index;
