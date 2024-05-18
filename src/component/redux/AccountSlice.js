import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "";
const url1 = "http://26.232.136.42:8080/api/account/create";
const AcountSLice = createSlice({
  name: "acount",
  initialState: {
    user: [],
    state: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkAcount.fulfilled, (state, action) => {
        state.user = action.payload;
      })
      .addCase(logincheck.fulfilled, (state, action) => {
        state.state = action.payload;
      });
  },
});
export const checkAcount = createAsyncThunk("acount/checkAcount", async (acount) => {
  console.log(2)
  const res = await fetch(`${url}`, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(acount)
  });
  const data = await res.json();
  if (res.ok) {
    console.log(data);
    return data;
  } else {
    console.error("Failed to Find a count");
  }
});
export const logincheck = createAsyncThunk(
   
  "acount/logincheck",
  async (acount) => {
    console.log(acount);
    const res = await fetch(`${url1}`, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(acount),
    });
    const data = await res.json();
    if (res.ok) {
      console.log(data);
      return data;
    } else {
      console.error("Failed to Find a count");
    }
  }
);
export default AcountSLice;
