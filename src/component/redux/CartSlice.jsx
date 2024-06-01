import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://26.232.136.42:8080/api/variant/";
const url1 = "http://26.232.136.42:8080/api/ordersitem/updatequantity";
const url2 = "http://26.232.136.42:8080/api/ordersitem/updateorderitem";
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
        state.Cart = state.Cart.map((el) =>
          el.account_id === action.payload.account_id
            ? {
                ...el,
//                 {
//     "order_items_id": 92,
//     "product_name": "Áo polo nữ",
//     "product_price": 180000.00,
//     "quantity": 1,
//     "productVersion": 3,
//     "createdAt": "2024-06-01T12:06:05",
//     "updatedAt": null,
//     "orders": 1,
//     "idvariant": 3,
//     "variants": {
//         "variants_id": 3,
//         "quantity_in_stock": 25,
//         "color": "#3357FF",
//         "size": "L",
//         "productversion": 3,
//         "images": [
//             {
//                 "images_id": 3,
//                 "image_url": "https://data.terabox.com/thumbnail/19c2db2bb956752dc616a4b4a91d14a7?fid=4398175765645-250528-1097576411969389&rt=pr&sign=FDTAER-DCb740ccc5511e5e8fedcff06b081203-kOQbff5D3WOMfuT%2bcr%2bXqLbn6yI%3d&expires=8h&chkbd=0&chkv=0&dp-logid=9217397751169544122&dp-callid=0&time=1716897600&size=c1536_u864&quality=90&vuk=4398175765645&ft=image&autopolicy=1",
//                 "created_at": "2024-05-24",
//                 "updated_at": "2024-05-28",
//                 "variant_id": 3
//             }
//         ]
//     }
// }
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
export const UpdateElement = createAsyncThunk(
  "cart/UpdateElement",
  async (data1, thunkAPI) => {
    const varient = thunkAPI
      .getState()
      .product.productInfor[data1.index].sizes.flatMap((el1) =>
        el1.size === data1.size
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
export default CartSlice;
