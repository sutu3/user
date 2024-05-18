import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
const url = "http://26.232.136.42:8080/api/product/urlimage";
const url1 = "http://26.232.136.42:8080/api/product";
//http://localhost:5173
const ProductSlice = createSlice({
  name: "product",
  initialState: {
    status: "idle",
    productInfor: [],
    images:[],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(FetchImage.pending, (state) => {
        state.status = "loading";
      })
      .addCase(FetchImage.fulfilled, (state, action) => {
        state.status = "idle";
        state.images = action.payload;
      })
      .addCase(FetchProduct.fulfilled, (state, action) => {
        state.productInfor = action.payload;
        console.log(state.productInfor)
      })
  },
});
export const FetchImage = createAsyncThunk(
  "product/FetchImage",
  async () => {
    const res = await fetch(`${url}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export const FetchProduct = createAsyncThunk(
  "product/FetchProduct",
  async () => {
    const res = await fetch(`${url1}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export default ProductSlice;
