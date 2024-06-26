import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { useEffect } from "react";
const url = "http://26.232.136.42:8080/api/variant/";
const url1 = "http://26.232.136.42:8080/api/ordersitem/updatequantity";
const url2 = "http://26.232.136.42:8080/api/ordersitem/updateorderitem";
const url3 = "http://26.232.136.42:8080/api/ordersitem";
const cartFromLocalStorage = localStorage.getItem("cart");
const cart = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
const ProductCart = localStorage.getItem("product");
const Product = ProductCart ? JSON.parse(ProductCart) : [];
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    Product: Product,
    Cart: cart,
    state: false,
    change2: Product.map((el) => ({ Size: "", Color: "" })),
    change: cart.flatMap((el) => {
      const account = localStorage.getItem("account");
      const parsedAccount = account ? JSON.parse(account) : null;
      return el.account_id === (parsedAccount ? parsedAccount.account_id : "")
        ? el.product.map(() => ({ Size: "", Color: "" }))
        : [];
    }),
  },
  reducers: {
    deleteall: (state, action) => {
      state.Product = [];
      state.change2 = [];
      localStorage.removeItem("product");
    },
    cart: (state, action) => {
      state.Cart = action.payload;
      localStorage.setItem("cart", JSON.stringify(state.Cart));
    },
    PushChange: (state, action) => {
      action.payload.id == 2
        ? state.change.push({ Size: "", Color: "" })
        : state.change2.push({ Size: "", Color: "" });
    },
    addCart: (state, action) => {
      state.Cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.Cart));
    },
    changeElement: (state, action) => {
      if (action.payload.id == 2) {
        state.change = action.payload.data;
      } else {
        state.change2 = action.payload.data;
      }
    },
    changeState: (state, action) => {
      state.state = action.payload;
    },
    UpdateQuantity: (state, action) => {
      state.Cart = state.Cart.map((el) =>
        el.account_id === action.payload.account_id
          ? el.product.map((el1) => {
              el1.order_items_id === action.payload.order_items_id
                ? (el1.quantity = action.payload.quantity)
                : el1;
            })
          : el
      );
    },
    changeProduct: (state, action) => {
      state.Product = action.payload;
      localStorage.setItem("product", JSON.stringify(state.Product));
    },
    updateCart: (state, action) => {
      const index = state.Cart.findIndex(
        (el) => el.account_id === action.payload.account_id
      );
      if (index !== -1) {
        // Update the products in the user's cart
        state.Cart[index].product = action.payload.product;
      } else {
        // If user cart does not exist, add it
        state.Cart.push({
          account_id: action.payload.account_id,
          product: action.payload.product,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.Cart));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(DeleteAll.fulfilled, (state, action) => {
        state.Cart = [];
        state.change = [];
        localStorage.removeItem("cart");
      })
      .addCase(UpdateElement.fulfilled, (state, action) => {
        state.change = state.change.map((el, index) =>
          index === action.payload.index ? { ...el, Color: "", Size: "" } : el
        );
        state.Cart = state.Cart.map((el) =>
          el.account_id === action.payload.account_id
            ? {
                ...el,
                product: el.product.map((el1) =>
                  el1.order_items_id === action.payload.order_items_id
                    ? {
                        ...el1,
                        idvariant: action.payload.variants.variants_id,
                        variants: action.payload.variants,
                      }
                    : el1
                ),
              }
            : el
        );
        localStorage.setItem("cart", JSON.stringify(state.Cart));
      })
      .addCase(DeleteCartElement.fulfilled, (state, action) => {
        state.Cart = state.Cart.map((el) =>
          el.account_id === action.payload.account_id
            ? {
                ...el,
                product: el.product.filter(
                  (el1) => el1.order_items_id !== action.payload.order_items_id
                ),
              }
            : el
        );
        localStorage.setItem("cart", JSON.stringify(state.Cart));
      })
      .addCase(ProductAdd.fulfilled, (state, action) => {
        if (action.payload.flat) {
          const index = state.Product.findIndex(
            (el) => el.variants_id === action.payload.data.variants_id
          );
          if (index === -1) {
            state.Product = [
              ...state.Product,
              {
                ...action.payload.data,
                createTime:
                  action.payload.data.createTime,
              },
            ];
            state.change2.push({ Size: "", Color: "" });
          } else {
            state.Product = state.Product.map((el, idx) =>
              idx === index
                ? { ...el, quantity: action.payload.data.quantity + 1 }
                : el
            );
          }
        } else {
          state.Product = state.Product.map((el, idx) =>
            idx === action.payload.quantity.index
              ? {
                  ...action.payload.data,
                  quantity: action.payload.quantity.quantity,
                }
              : el
          );
        }
        localStorage.setItem("product", JSON.stringify(state.Product));
      })
      .addCase(UpdateQuantity.fulfilled, (state, action) => {
        console.log(action.payload);
        state.Cart = state.Cart.map((el) =>
          el.account_id === action.payload.account_id
            ? {
                ...el,
                product: el.product.map((el1) =>
                  el1.order_items_id === action.payload.order_items_id
                    ? { ...el1, quantity: action.payload.quantity }
                    : el1
                ),
              }
            : el
        );
        localStorage.setItem("cart", JSON.stringify(state.Cart));
      });
  },
});

export const { addCart, updateCart } = CartSlice.actions;
export const FindCart = createAsyncThunk(
  "cart/AddCart",
  async (data1, thunkAPI) => {
    const res = await fetch(
      `${url}ordersigleitem?idOrderItem=${data1.idOrderItem}&idVariant=${data1.idVariant}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const updatecart = { ...data, account_id: data1.account_id };
    thunkAPI.dispatch(CheckCartid(updatecart));
    return updatecart;
  }
);
export const AddCart = createAsyncThunk("cart/AddCart", async (data1) => {
  const res = await fetch(
    `${url}createorderitem?idAccount=${data1.account_id}&idVariant=${data1.variants_id}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        product_name: data1.product_name,
        product_price: data1.product_price,
        quantity: data1.quantity,
        productVersion: data1.version_product_id,
      }),
    }
  );
  const data = await res.json();
  return data;
});
export const CheckCartid = (payload) => {
  return (dispatch, getState) => {
    const state = getState();
    const userCart = state.cart.Cart.find(
      (el) => el.account_id === payload.account_id
    );
    if (!userCart) {
      dispatch(addCart({ account_id: payload.account_id, product: [payload] }));
    } else {
      const productIndex = userCart.product.findIndex(
        (el) => el.idvariant === payload.idvariant
      );
      let updatedProducts;

      if (productIndex !== -1) {
        updatedProducts = userCart.product.map((el) =>
          el.variants_id === payload.variants_id
            ? { ...el, quantity: el.quantity + payload.quantity }
            : el
        );
      } else {
        updatedProducts = [
          ...userCart.product,
          {
            ...payload,
            createdAt: payload.createdAt,
          },
        ];
        dispatch(CartSlice.actions.PushChange({ id: 2 }));
      }

      dispatch(
        updateCart({ account_id: payload.account_id, product: updatedProducts })
      );
    }
  };
};
export const CheckElement = (data) => {
  return async function Check(dispatch, getState) {
    const update = (
      data.id == 2 ? getState().cart.change : getState().cart.change2
    ).map((el, index) =>
      index === data.data.cardIndex
        ? {
            ...el,
            [data.data.var === "Color" ? "Color" : "Size"]: data.data.value,
          }
        : el
    );
    await dispatch(
      CartSlice.actions.changeElement({ id: data.id, data: update })
    );
    if (data.id === 2) {
      if (
        getState().cart.change[data.data.cardIndex].Size != "" &&
        getState().cart.change[data.data.cardIndex].Color != ""
      ) {
        dispatch(
          UpdateElement({
            account_id: data.data.account_id,
            order_items_id: data.data.order_items_id,
            size: data.data.size,
            color: data.data.color,
            index: data.data.index,
          })
        );
      }
    } else {
      if (
        getState().cart.change2[data.data.cardIndex].Size != "" &&
        getState().cart.change2[data.data.cardIndex].Color != ""
      ) {
        const varient = getState().product.productInfor[
          data.data.index
        ].sizes.flatMap((el1) =>
          el1.size == data.data.size
            ? el1.colors
                .filter((el2) => el2.color === data.data.color)
                .map((el2) => el2.variants[0].variants_id)
            : []
        );
        dispatch(
          ProductAdd({
            flat: false,
            data: varient,
            quantity: {
              index: data.data.cardIndex,
              quantity: data.data.quantity,
            },
          })
        );
      }
    }
  };
};
export const UpdateElement = createAsyncThunk(
  "cart/UpdateElement",
  async (data1, thunkAPI) => {
    const varient = thunkAPI
      .getState()
      .product.productInfor[data1.index].sizes.flatMap((el1) =>
        el1.size == data1.size
          ? el1.colors
              .filter((el2) => el2.color === data1.color)
              .map((el2) => el2.variants[0].variants_id)
          : []
      );
    const res = await fetch(
      `${url2}/${data1.order_items_id}?idvariant=${varient}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const data2 = {
      account_id: data1.account_id,
      order_items_id: data1.order_items_id,
      variants: data,
    };
    return data2;
  }
);
export const ProductAdd = createAsyncThunk(
  "cart/ProductAdd",
  async (variant) => {
    const res = await fetch(
      `http://26.232.136.42:8080/api/variant/getVariant/${variant.data}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    const updata = {
      flat: variant.flat,
      data: data,
      quantity: variant.quantity,
    };
    return updata;
  }
);
export const UpdateQuantity = createAsyncThunk(
  "cart/UpdateQuantity",
  async (data1) => {
    const res = await fetch(
      `${url1}/${data1.order_items_id}?quantity=${data1.quantity + 1}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return {...data1, quantity: data1.quantity+1};
  }
);
export const CheckAndAddtoCart = () => {
  return async function Check(dispatch, getState) {
    if (getState().cart.Product.length !== 0) {
      const products = getState().cart.Product;
      const promises = products.map(async (el) => {
  let idItem;
  const state = getState();
  if (state.cart.Cart.length !== 0) {
    const index = state.cart.Cart[0].product.findIndex((el1) => {
      if (el.variants_id === el1.idvariant) {
        idItem = el1.order_items_id;
        return true;
      }
      return false;
    });


    if (index === -1) {
      await dispatch(
        CheckCart({
          version_product_id: el.productversion,
          variants_id: el.variants_id,
          product_name: el.productversionName,
          product_price: el.price,
          quantity: 1,
        })
      );
    } else {
      const date = new Date(state.cart.Cart[0].product[index].updatedAt).getTime() / 1000;
      const date1 = new Date(el.createTime).getTime() / 1000;
      if (date < date1) {
        const productIndex = state.product.productInfor.findIndex(
          (el2) =>
            el2.productVersion.some(
              (el3) => el3.productVersion_id === el.productversion
            )
        );

        await dispatch(
          UpdateQuantity({
            account_id: state.acount.infor.account_id,
            order_items_id: idItem, // Cần dùng idItem thay vì index
            quantity:el.quantity-1,
            // size: el.size,
            // color: el.color,
            // index: productIndex,
          })
        );
      }
    }
  } else {
           const check =await dispatch(
            AddCart({
              variants_id:el.variants_id,
              account_id:getState().acount.infor.account_id,
              product_name: el.productversionName,
              product_price: el.price,
              quantity: el.quantity,
              version_product_id: el.productversion,
            })
          );
          await dispatch(
            FindCart({
              account_id: getState().acount.infor.account_id,
              idOrderItem:check.payload,
              idVariant: el.variants_id,
            })
          );
        }
      });

      // Đợi tất cả các promises hoàn thành
      await Promise.all(promises);
      // dispatch(
      //   updateCart({
      //     account_id: getState().acount.infor.account_id,
      //     product: getState().cart.Product,
      //   })
      // );
    }
  };
};

export const CheckCart = (data) => {
  return async function Check(dispatch, getState) {
    const index =
      getState().cart.Cart.length == 0
        ? -1
        : getState().cart.Cart[0].product.findIndex((product) => {
            return product.idvariant === data.variants_id;
          });
    console.log(index);
    if (
      getState().acount.check.username == true &&
      getState().acount.check.password == true
    ) {
      dispatch(
        FetchCart({
          account_id: getState().acount.infor.account_id,
          version_product_id: data.version_product_id,
          variants_id: data.variants_id,
          product_name: data.product_name,
          product_price: data.product_price,
          quantity: data.quantity,
          index: index,
          item:
            getState().cart.Cart.length == 0
              ? []
              : getState().cart.Cart[0].product,
        })
      );
    } else {
      dispatch(
        CheckProduct({
          variants_id: data.variants_id,
          quantity: data.quantity,
        })
      );
    }
  };
};
export const CheckProduct = (data) => {
  return (dispatch, getState) => {
    const { cart } = getState();
    console.log(); // Lấy cart từ store sử dụng getState
    const index = cart.Product.findIndex(
      (el) => el.variants_id === data.variants_id
    );
    console.log(index);
    if (index === -1) {
      dispatch(
        ProductAdd({
          flat: true,
          data: data.variants_id,
          quantity: data.quantity,
        })
      ); // Dispatch action ProductAdd với dữ liệu data
    } else {
      if (data.quantity == 0) {
        let updatedProduct = cart.Product.filter(
          (el, idx) => idx !== index && el
        );
        console.log(updatedProduct);
        dispatch(CartSlice.actions.changeProduct(updatedProduct));
      } else {
        const updatedProduct = cart.Product.map((el, idx) =>
          idx === index ? { ...el, quantity: data.quantity } : el
        );
        dispatch(CartSlice.actions.changeProduct(updatedProduct));
      }
    }
  };
};
export const FetchCart = createAsyncThunk(
  "cart/fetchCart",
  async (payload, { dispatch }) => {
    console.log(payload);
    if (payload.index !== -1) {
      await dispatch(
        FindCart({
          idVariant: payload.variants_id,
          idOrderItem: payload.item[payload.index].order_items_id,
          account_id: payload.account_id,
        })
      );
    } else {
      //dùng để add order-item vào serve
      console.log(2);
      const check = await dispatch(AddCart(payload)); // unwrap() để lấy dữ liệu từ kết quả của action AddCart

      if (check !== -1) {
        //này dùng để cập nhập số lượng
        await dispatch(
          FindCart({
            idVariant: payload.variants_id,
            idOrderItem: check.payload,
            account_id: payload.account_id,
          })
        );
      }
    }
  }
);
export const DeleteAll = createAsyncThunk("cart/DeleteAll", async (payload) => {
  const res = await fetch(`${url3}/deleteallorderitem?idOrder=${payload}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const data = res.json();
  if (data) {
    return payload;
  }
});
export const DeleteCartElement = createAsyncThunk(
  "cart/DeleteCartElement",
  async (payload) => {
    const res = await fetch(
      `${url3}/deleteorderitem?id=${payload.order_items_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = res.json();
    if (data) {
      return payload;
    }
  }
);

export default CartSlice;
