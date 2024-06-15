import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import CartSlice, { CheckAndAddtoCart, FindCart } from "./CartSlice";
const url = "http://26.232.136.42:8080/api/account";
const url1 = "http://26.232.136.42:8080/api/account/Verification/";
const url2 = "http://26.232.136.42:8080/api/account/getaccount/";
const AcountSLice = createSlice({
  name: "acount",
  initialState: {
    infor: localStorage.getItem("account")
      ? JSON.parse(localStorage.getItem("account"))
      : {},
    state: localStorage.getItem("account") ? true : false,
    emailcheck: false,
    check: {
      username: localStorage.getItem("account") ? true : false,
      password: localStorage.getItem("account") ? true : false,
    },
    statedisplay: false,
  },
  reducers: {
    changeState: (state, action) => {
      state.statedisplay = action.payload;
    },
    changecheckEmail: (state, action) => {
      state.emailcheck = false;
      state.emailcheck = action.payload;
    },
    changecheckPassword: (state, action) => {
      state.check.username = action.payload;
      state.check.password = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(CheckSignupEmail.fulfilled, (state, action) => {
        state.emailcheck = false;
        state.emailcheck = action.payload;
      })
      .addCase(CheckEmailAccount.fulfilled, (state, action) => {
        state.check.username = action.payload;
        state.state = true;
      })
      .addCase(CheckPassAccount.fulfilled, (state, action) => {
        if (action.payload != -1) {
          state.check.password = true;
          state.state = true;
        } else {
          state.check.password = false;
        }
      })
      .addCase(SendAccountInfor.fulfilled, (state, action) => {
        state.infor = action.payload;
        localStorage.setItem("account", JSON.stringify(state.infor));
      })
      .addCase(CreateAcount.fulfilled, (state, action, dispatch) => {
        state.infor = action.payload;
        console.log(action.payload);
        localStorage.setItem("account", JSON.stringify(state.infor));
        state.check.username = action.payload;
        state.check.password = action.payload;
      })
      .addCase(UpdateInforAccount.fulfilled, (state, action) => {
        state.infor = action.payload;
        localStorage.setItem("account", JSON.stringify(state.infor));
        state.statedisplay = false;
      });
  },
});
//check email

export const sendSignUp = (Account) => {
  return async function check(dispatch, getState) {
    const checkemail = await dispatch(CheckSignupEmail(Account.email));
    console.log(getState().acount);
    if (getState().acount.emailcheck) {
      dispatch(CreateAcount(Account));
    }
  };
};
export const LogoutAccount = (Acount) => {
  return async function logout({ thunkAPI, dispatch }) {
    await dispatch(AcountSLice.actions.changecheckEmail(false));
    await dispatch(AcountSLice.actions.changecheckPassword(false));
  };
};
export const SendAccount = (Account) => {
  return async function Check(dispatch, getState) {
    const emailResponse = await dispatch(CheckEmailAccount(Account.email));
    if (getState().acount.check.username) {
      const passResponse = await dispatch(CheckPassAccount(Account));
      if (getState().acount.check.password) {
        await dispatch(SendAccountInfor(passResponse.payload));
        console.log(getState().acount.infor)
        const orders = getState().acount.infor.orders;
    const lastOrder = orders[orders.length - 1];
    for (const el of lastOrder.orderItems) {
      console.log(el)
      console.log(getState().acount.infor.account_id)
      await dispatch(
        FindCart({
          account_id: getState().acount.infor.account_id,
          idOrderItem: el.order_items_id,
          idVariant: el.typeOfVariant,
        })
      );
    }
        await dispatch(CheckAndAddtoCart());
        localStorage.removeItem("product")
      }
    }
  };
};
export const UpdateInforAccount = createAsyncThunk(
  "acount/UpdateInforAccount",
  async (infor) => {
    const res = await fetch(
      `http://26.232.136.42:8080/api/account/updateaccount`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(infor),
      }
    );
    const data = await res.json();
    return data;
  }
);
export const SendAccountInfor = createAsyncThunk(
  "acount/SendAccount",
  async (passResponse) => {
    const res = await fetch(`${url2}${passResponse}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export const CheckPassAccount = createAsyncThunk(
  "acount/CheckPassAccount",
  async (data1) => {
    const res = await fetch(
      `${url1}pass?email=${data1.email}&pass=${data1.pass}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  }
);
export const CheckEmailAccount = createAsyncThunk(
  "acount/CheckEmailAccount",
  async (email) => {
    const res = await fetch(`${url1}user?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export const CreateAcount = createAsyncThunk(
  "acount/CreateAcount",
  async (account) => {
    const res = await fetch(`${url}/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(account),
    });
    const data = await res.json();
    return data;
  }
);
export const CheckSignupEmail = createAsyncThunk(
  "acount/CheckSignupEmail",
  async (email) => {
    const res = await fetch(`${url}?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
export default AcountSLice;
