import { createSlice } from '@reduxjs/toolkit';

const showCartReducer = createSlice({
    name: 'toggle_cart',
    initialState: { showCart: false, notification: null },
    reducers: {
        toggleCart(state) {
            state.showCart = !state.showCart;
        },
        showNotification(state, action) {
            state.notification = {status: action.payload.status, text: action.payload.title, message: action.payload.message};
        }
    }
});
export default showCartReducer.reducer;
export const constShowCartFcts = showCartReducer.actions;