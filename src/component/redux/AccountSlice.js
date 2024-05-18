import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://26.232.136.42:8080/api/account";
const AcountSLice = createSlice({
  name: "acount",
  initialState: {
    user: [],
    infor: {},
    state: true,
  },
  reducers: {
    changestate: (state, action) => {
      state.state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAcountName.fulfilled, (state, action) => {
          state.user=action.payload
      })
      .addCase(logincheck.fulfilled, (state, action) => {
        state.state = action.payload;
      });
  },
});
//check tên tài khoản
export const checkAcountName = createAsyncThunk(
  "acount/checkAcount",
  async (acount) => {
    const res = await fetch(`${url}/getlogin?username=${acount.username}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
//check mật khẩu
export const checkAcountPass = (password) => {
  return function Check(dispatch, getState) {
    getState().acount.user.map((el)=>{
      el.accountpassword===password?dispatch(AcountSLice.action.changestate(true)):dispatch(AcountSLice.action.changestate(false))
    })
  };
};
export const logincheck = createAsyncThunk(
  "acount/logincheck",
  async (acount) => {
    console.log(acount);
    const res = await fetch(`${url}/create`, {
      method: "POST",
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
