export const Productimage=(State)=>State.product.images;
export const Productinfor=(State)=>State.product.productInfor;
export const CheckLogin=(State)=>State.acount.check;
export const UserLogin=(State)=>State.acount.user;
export const StateLogin=(State)=>State.acount.state;
export const User=(State)=>State.acount.infor;
export const UpdateInfor=(State)=>State.acount.updateinfor;
export const Cart = (state) => {
    const userCart = state.cart.Cart.find(el => el.accountid === 3);
    return userCart ? userCart.product : [];
};