import { createSlice } from '@reduxjs/toolkit';

const showCartReducer = createSlice({
    name: 'toggle_cart',
    initialState: { showCart: true },
    reducers: {
        toggleCart(state) {
            state.showCart = !state.showCart;
        }
    }
});
export default showCartReducer.reducer;
export const constShowCartFcts = showCartReducer.actions;