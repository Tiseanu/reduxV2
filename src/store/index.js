import { configureStore } from '@reduxjs/toolkit';
import constShowCartFcts from './toggle-cart-slice';
import constCartItemsFcts from './cart-items-slice';

const store = configureStore({
    reducer: {
        toggleCart: constShowCartFcts,
        cartItems: constCartItemsFcts
    }
});
export default store;