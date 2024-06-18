import CartSlice, { CheckAndAddtoCart, FindCart } from "./CartSlice";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const url = "http://26.232.136.42:8080/api/account";
const url1 = "http://26.232.136.42:8080/api/account/Verification/";
const url2 = "http://26.232.136.42:8080/api/account/getaccount/";
const url3 = "http://26.232.136.42:8080/api/orders/createOrder/";
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
      .addCase(CreateAddress.fulfilled, (state, action) => {
        if (state.check.username) {
          state.infor = {
            ...state.infor,
            addresses:state.infor.addresses?[...state.infor.addresses, action.payload]:[action.payload] ,
          };
          localStorage.setItem("account", JSON.stringify(state.infor));
        }
      })
      .addCase(ChangeState.fulfilled,(state,action) => {
        state.infor={...state.infor,orders:state.infor.orders?[...state.infor.orders, action.payload]:[action.payload]}
      })
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
        state.check.username = true;
        state.check.password = true;
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
    if (!getState().acount.emailcheck) {
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
export const CheckEmail = (payload) => {
  return async function check(dispatch, getState) {
    try {
      const check = await dispatch(checkEmail(payload.email));
      let id = check;

      if (check.payload === 0) {
        const newAccount = await dispatch(
          CreateAcount1({
            email: payload.email,
            phoneNumber: payload.phone,
          })
        );
        id = newAccount; // Giả sử rằng CreateAcount1 trả về ID trong payload
      }

      const check1 = await dispatch(
        checkAddress({
          account_id: id.payload,
          city: payload.city,
          state: payload.state,
          country: payload.country,
        })
      );

      if (!check1.payload) {
        await dispatch(
          CreateAddress({
            account_id: id.payload,
            city: payload.city,
            state: payload.state,
            country: payload.country,
            title: payload.title,
          })
        );
      }
      console.log(typeof id.payload);
      const orderResult = await dispatch(CreateOrder(id.payload));
      const idorder = orderResult.payload; // Giả sử rằng CreateOrder trả về ID trong payload

      const productTasks = getState().cart.Product.map((el) => {
        return dispatch(
          CreateOrderItem({
            product_name: el.productversionName,
            product_price: el.price,
            productVersion: el.productversion,
            quantity: el.quantity,
            orders: idorder,
            typeOfVariant: el.variants_id,
          })
        );
      });

      await Promise.all(productTasks);
      await dispatch(
        AddAddressOrder({
          orderid: idorder,
          address: payload.state + "," + payload.country + "," + payload.title,
        })
      );
    } catch (error) {
      console.error("Error in CheckEmail:", error);
    }
  };
};
export const SendAccount = (Account) => {
  return async function Check(dispatch, getState) {
    const emailResponse = await dispatch(CheckEmailAccount(Account.email));
    if (getState().acount.check.username) {
      const passResponse = await dispatch(CheckPassAccount(Account));
      if (getState().acount.check.password) {
        await dispatch(SendAccountInfor(passResponse.payload));
        const orders = getState().acount.infor.orders;
        const lastOrder = orders[orders.length - 1];
        for (const el of lastOrder.orderItems) {
          await dispatch(
            FindCart({
              account_id: getState().acount.infor.account_id,
              idOrderItem: el.order_items_id,
              idVariant: el.typeOfVariant,
            })
          );
        }
        await dispatch(CheckAndAddtoCart());
        localStorage.removeItem("product");
      }
    }
  };
};
export const ChangeCart = (payload) => {
  return async function Check(dispatch, getState) {
    let idOrder=getState().cart.Cart[0].product[0].orders
    await dispatch(
        AddAddressOrder({
          orderid: idOrder,
          address: payload.state + "," + payload.country + "," + payload.title,
        })
      );
    await dispatch(ChangeState(idOrder))
  };
};
export const ChangeState = createAsyncThunk(
  "acount/ChangeState",
  async (payload) => {
    const res = await fetch(
      `http:// 26.232.136:8080/api/orders/${payload}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await res.json();
    return data;
  }
);
export const CreateOrderItem = createAsyncThunk(
  "acount/CreateOrderItem",
  async (payload) => {
    const res = await fetch(
      `http://26.232.136.42:8080/api/ordersitem/createorderitem`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );
    const data = await res.json();
    return data;
  }
);
export const CreateAcount1 = createAsyncThunk(
  "acount/CreateAcount1",
  async (Account) => {
    const res = await fetch(`${url}/createEmail`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Account),
    });
    const data = await res.json();
    return data;
  }
);
export const checkAddress = createAsyncThunk(
  "acount/checkAddress",
  async (payload) => {
    const res = await fetch(`${url}/checkAddress`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    return data;
  }
);
export const AddAddressOrder = createAsyncThunk(
  "acount/checkAddress",
  async (payload) => {
    const res = await fetch(
      `http://26.232.136.42:8080/api/orders/updateOrderAddress/${payload.orderid}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          addreString:payload.address
        }),
      }
    );
    const data = await res.json();
    return data;
  }
);
export const checkEmail = createAsyncThunk(
  "acount/checkEmail",
  async (email) => {
    const res = await fetch(`${url}/VerificationGetID/user?email=${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  }
);
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
export const CreateOrder = createAsyncThunk(
  "account/CreateOrder",
  async (account_id) => {
    console.log(typeof account_id);
    const res = await fetch(`${url3}${Number.parseInt(account_id)}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        total_amount: 0.0,
        addressorder: "",
        orderItems: [],
      }),
    });
    const data = await res.json();
    return data;
  }
);
export const CreateAddress = createAsyncThunk(
  "acount/CreateAddress",
  async (payload) => {
    const res = await fetch(`${url}/createAddress`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
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

export default AcountSLice;
