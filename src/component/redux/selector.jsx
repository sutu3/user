export const Productimage=(State)=>State.product.images;
export const Productinfor=(State)=>State.product.productInfor;
export const CheckLogin=(State)=>State.acount.check;
export const StateLogin=(State)=>State.acount.state;
export const checkemail=(State)=>State.acount.emailcheck;
export const User=(State)=>State.acount.infor;
export const Statedisplay=(State)=>State.acount.statedisplay;
export const StateCard=(State)=>State.cart.state;
export const Element=(State)=>State.cart.change;
export const Cart = (state) => {
    const userCart = state.cart.Cart.find(el => el.account_id === 1);
    return userCart ? userCart.product : [];
};