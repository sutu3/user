import { createSelector } from 'reselect';
export const Productimage=(State)=>State.product.images;
export const Productinfor=(State)=>State.product.productInfor;
export const CheckLogin=(State)=>State.acount.check;
export const StateLogin=(State)=>State.acount.state;
export const checkemail=(State)=>State.acount.emailcheck;
export const User=(State)=>State.acount.infor;
export const Statedisplay=(State)=>State.acount.statedisplay;
export const StateCard=(State)=>State.cart.state;
export const Element=(State)=>State.cart.change;
export const Element2=(State)=>State.cart.change2;
export const Product=(State)=>State.cart.Product;
export const Cart = (state) => state.cart.Cart;
// export const Cart = createSelector(
//     GetCartData, User,
//     (cartData, account) => {
//         const userCart = cartData.find(el => el.account_id === account.account_id);
//         return userCart ? userCart.product : [];
//     }
// );