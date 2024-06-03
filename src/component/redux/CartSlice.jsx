import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import { useEffect } from "react";
import { Cart,User } from "./selector";
const url = "http://26.232.136.42:8080/api/variant/";
const url1 = "http://26.232.136.42:8080/api/ordersitem/updatequantity";
const url2 = "http://26.232.136.42:8080/api/ordersitem/updateorderitem";
const url3="http://26.232.136.42:8080/api/ordersitem/deleteorderitem?id=";
const cartFromLocalStorage = localStorage.getItem("cart");
const cart = cartFromLocalStorage ? JSON.parse(cartFromLocalStorage) : [];
console.log(cart.map((el)=>el.account_id===1?el.product:[]));
const CartSlice = createSlice({
  name: "cart",
  initialState: {
    Cart: cart,
    state: false,
      change: cart.flatMap(el => el.account_id === 1 ? el.product.map(() => ({ Size: '', Color: '' })) : [])
  },
  reducers: {
    addCart: (state, action) => {
      state.Cart.push(action.payload);
      localStorage.setItem("cart", JSON.stringify(state.Cart));
    },
    changeElement: (state, action) => {
      state.change=action.payload
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
      .addCase(UpdateElement.fulfilled, (state, action) => {
        console.log(state.Cart)
        state.change = state.change.map((el, index) => 
    index === action.payload.index ?(el.Color='',el.Size='')
    : el
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
        console.log(state.Cart)
        localStorage.setItem("cart", JSON.stringify(state.Cart));
      })
      .addCase(DeleteCartElement.fulfilled,(state, action) => {
        state.Cart = state.Cart.map((el) =>
          el.account_id === action.payload.account_id
            ? {
                ...el,
                product: el.product.filter((el1) =>
                  el1.order_items_id !== action.payload.order_items_id
                ),
              }
            : el
        );
                localStorage.setItem("cart", JSON.stringify(state.Cart));
      })
      .addCase(UpdateQuantity.fulfilled, (state, action) => {
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
export const CheckElement = (data) => {
  return async function Check(dispatch, getState) {
    console.log(data)
   const update = getState().cart.change.map((el, index) => 
    index === data.index ? 
    {
      ...el,
      [data.var === 'Color' ? 'Color' : 'Size']: data.value
    } 
    : el
  );
  await dispatch(CartSlice.actions.changeElement(update));
  if(getState().cart.change[data.index].Size!=""&&getState().cart.change[data.index].Color!="")
    {
  dispatch(UpdateElement({
            account_id:data.account_id,
            order_items_id:data.order_items_id,
            size:data.size,
            color:data.color,
            index:data.index
  }))
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
    // "variants_id": 4,
    // "quantity_in_stock": 10,
    // "color": "#FF33A8",
    // "size": "XL",
    const data2 = {
      account_id: data1.account_id,
      order_items_id: data1.order_items_id,
      variants: data,
    };
    console.log(data2);
    return data2;
  }
);
export const UpdateQuantity = createAsyncThunk(
  "cart/UpdateQuantity",
  async (data1) => {
    const res = await fetch(
      `${url1}/${data1.order_items_id}?quantity=${data1.quantity}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    if (data) {
      console.log(data1);

      return data1;
    }
    return null;
  }
);
export const CheckCart = (data) => {
  return async function Check(dispatch, getState) {
    console.log(getState().acount.infor.account_id)
    if(getState().acount.infor!={})
      {
        
        dispatch(FetchCart({
              account_id: getState().acount.infor.account_id,
              version_product_id:data.version_product_id,
              variants_id:data.variants_id,
              product_name:data.product_name,
              product_price:data.product_price,
              quantity:1,
        }))
      }
      else{
        
      }

  }}
  
export const FetchCart = createAsyncThunk(
  "cart/fetchCart",
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
export const DeleteCartElement=createAsyncThunk("cart/DeleteCartElement",
  async(payload) => {
    const res = await fetch(
      `${url3}${payload.order_items_id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data=res.json();
    if(data)
      {
        return payload;
      }
  }
)

export default CartSlice;
