import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://26.232.136.42:8080/api/account";
const url1="http://26.232.136.42:8080/api/account/Verification/"
const url2="http://26.232.136.42:8080/api/account/getaccount/"
const AcountSLice = createSlice({
  name: "acount",
  initialState: {
    infor: localStorage.getItem("account")?JSON.parse(localStorage.getItem("account")):{},
    state: localStorage.getItem("account")?true:false,
    emailcheck:false,
    check:{
      username: localStorage.getItem("account")?true:false,
      password: localStorage.getItem("account")?true:false,
    },
  },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(CheckSignupEmail.fulfilled, (state, action) => {
        state.emailcheck=false;
        state.emailcheck=action.payload
      })
      .addCase(CheckEmailAccount.fulfilled, (state, action) => {
        state.check.username=action.payload
        state.state=true;
      })
      .addCase(CheckPassAccount.fulfilled, (state, action) => {
        if(action.payload!=-1)
          {
            state.check.password=true;
            state.state=true;
          }
          else{
            state.check.password=false;
          }
      })
      .addCase(SendAccountInfor.fulfilled, (state, action) => {
        state.infor=action.payload
        localStorage.setItem("account", JSON.stringify(state.infor));
      })
      .addCase(CreateAcount.fulfilled, (state, action) => {
        state.infor=action.payload
        console.log(action.payload)
        localStorage.setItem("account", JSON.stringify(state.infor));
        state.check.password=true;
        state.check.username=true;
      })
  },
});
//check email
export const sendSignUp=(Account)=>{
  return async function check(dispatch,getState){
    const checkemail=await dispatch(CheckSignupEmail(Account.email));
    if(getState().account.emailcheck){
      dispatch(CreateAcount(Account))
    }
  }
}
export const SendAccount = (Account) => {
  return async function Check(dispatch, getState) {
    const emailResponse = await dispatch(CheckEmailAccount(Account.email));
    if (getState().acount.check.username) {
      const passResponse = await dispatch(CheckPassAccount(Account));
      if(getState().acount.check.password)
      {
                dispatch(SendAccountInfor(passResponse.payload));
      }
    }
  };
};
export const SendAccountInfor=createAsyncThunk("acount/SendAccount",async(passResponse)=>{
  const res = await fetch(`${url2}${passResponse}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data
})
export const CheckPassAccount=createAsyncThunk("acount/CheckPassAccount",async(data1)=>{
  const res = await fetch(`${url1}pass?email=${data1.email}&pass=${data1.pass}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data
})
export const CheckEmailAccount=createAsyncThunk("acount/CheckEmailAccount",async(email)=>{
  const res = await fetch(`${url1}user?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data
})
export const CreateAcount=createAsyncThunk("acount/CreateAcount",async(account)=>{
  const res = await fetch(`${url}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
    const data = await res.json();
    return data
})
export const CheckSignupEmail=createAsyncThunk("acount/CheckSignupEmail",async(email)=>{
  const res=await fetch(`${url}?email=${email}`,{
    method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
  })
  const data=await res.json();
  return data;
})
export default AcountSLice;
