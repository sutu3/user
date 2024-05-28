import { createSlice } from "@reduxjs/toolkit";

const CartSlice = createSlice({
  name: "cart",
  initialState: {
    Cart: localStorage.getItem("cart")
      ? JSON.parse(localStorage.getItem("cart"))
      : [],
      state:false,
  },
  reducers: {
    addCart: (state, action) => {
      state.Cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.Cart));
    },
    changeState: (state, action) => {
      state.state=action.payload;
    },
    updateCart: (state, action) => {
      const index = state.Cart.findIndex(
        (el) => el.accountid === action.payload.accountid
      );
      if (index !== -1) {
        // Update the products in the user's cart
        state.Cart[index].product = action.payload.product;
      } else {
        // If user cart does not exist, add it
        state.Cart.push({
          accountid: action.payload.accountid,
          product: action.payload.product,
        });
      }
      localStorage.setItem("cart", JSON.stringify(state.Cart));
    },
  },
});

export const { addCart, updateCart } = CartSlice.actions;

export const CheckCartid = (payload) => {
  return (dispatch, getState) => {
    const state = getState();
    const userCart = state.cart.Cart.find(
      (el) => el.accountid === payload.accountid
    );
    if (!userCart) {
      dispatch(addCart({ accountid: payload.accountid, product: [payload] }));
    } else {
      const productIndex = userCart.product.findIndex(
        (el) => el.productid === payload.productid
      );
      let updatedProducts;

      if (productIndex !== -1) {
        updatedProducts = userCart.product.map((el) =>
          el.productid === payload.productid
            ? { ...el, productbuy: el.productbuy + payload.productbuy }
            : el
        );
      } else {
        updatedProducts = [...userCart.product, payload];
      }

      dispatch(
        updateCart({ accountid: payload.accountid, product: updatedProducts })
      );
    }
  };
};

export default CartSlice;
