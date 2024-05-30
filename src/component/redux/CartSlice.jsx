import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://26.232.136.42:8080/api/variant/";
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    Cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
    state: false,
  },
  reducers: {
    addCart: (state, action) => {
      state.Cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.Cart));
    },
    changeState: (state, action) => {
      state.state = action.payload;
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
});
//              account_id:3,
//             variants_id:el1.variants[0].variants_id,
//             product_name:product1.name,
//             product_price:product1.productVersion[0].price,
//             quantity:1,
export const { addCart, updateCart } = CartSlice.actions;
export const FindCart = createAsyncThunk(
  "cart/AddCart",
  async (data1, thunkAPI) => {
    console.log(data1);
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
    console.log(data);
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
        updatedProducts = [...userCart.product, payload];
      }

      dispatch(
        updateCart({ account_id: payload.account_id, product: updatedProducts })
      );
    }
  };
};
export const FetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (payload, { dispatch }) => {
    const check = await dispatch(AddCart(payload)); // unwrap() để lấy dữ liệu từ kết quả của action AddCart

    if (check !== -1) {
      await dispatch(
        FindCart({
          idVariant: payload.variants_id,
          idOrderItem: check.payload,
          account_id: payload.account_id,
        })
      );
    }
  }
);
export default CartSlice;
