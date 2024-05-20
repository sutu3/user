import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://26.232.136.42:8080/api/account";
const AcountSLice = createSlice({
  name: "acount",
  initialState: {
    user: [],
    infor: {},
    state: false,
    check:{
      username: false,
      password: false,
    },
    updateinfor:false,
  },
  reducers: {
    changestate: (state, action) => {
      state.check.password = action.payload;
    },
    adduser:(state,action)=>{
      state.infor=action.payload;
    },
    updateInforL:(state,action)=>{
      state.updateinfor=action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAcountName.fulfilled, (state, action) => {
        (Array.isArray(action.payload) && action.payload.length === 0)?
        state.check.username=false:(
        state.user = action.payload,
        state.check.username=true)
          state.user=action.payload
          state.state=true;
      })
      .addCase(logincheck.fulfilled, (state, action) => {
        state.state=action.payload
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
    console.log(data)
    return data;
  }
);
//check mật khẩu
export const checkAcountPass = (password) => {
  return function Check(dispatch, getState) {
    const { user } = getState().acount;
    
    if (!Array.isArray(user) || user.length === 0) {
      dispatch(AcountSLice.actions.changestate(false));
    } else {
      const isPasswordCorrect = user.some(el => el.accountpassword === password);
      if (isPasswordCorrect) {
        dispatch(AcountSLice.actions.changestate(true));
        dispatch(AcountSLice.actions.adduser(user.filter(el => el.accountpassword === password)))
      } else {
        dispatch(AcountSLice.actions.changestate(false));
      }
    }
    console.log(user)
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
