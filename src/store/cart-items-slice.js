import { createSlice } from '@reduxjs/toolkit';

const cartItemsObj = [
    {id: 1,  title: 'Product 1', description: 'This is description for Product 1', price: '6', basePrice: '6', currency: '$', qty: 1},
];
const prodItemsObj = [
    {id: 1,  title: 'Product 2', description: 'This is description for Product 2', price: '5', basePrice: '5', currency: '$', qty: 1}
];

const cartItemsReducer = createSlice({
    name: 'cart_item',
    initialState: { cartItemsObj, prodItemsObj },
    reducers: {
        addItem2cart(state, action) {
            state.cartItemsObj = [...state.cartItemsObj, state.prodItemsObj[action.payload]];
            state.prodItemsObj.splice(action.payload - 1, 1);
        },
        removeItem(state, action) {
            state.cartItemsObj.splice(action.payload - 1, 1);
            state.cartItemsObj = [...state.cartItemsObj];
        },
        plus(state, action) {
            const updated_qty = state.cartItemsObj[action.payload].qty + 1;
            const updated_price = state.cartItemsObj[action.payload].basePrice * updated_qty;
            state.cartItemsObj[action.payload].price = updated_price;
            state.cartItemsObj[action.payload].qty = updated_qty;
            state.cartItemsObj = [...state.cartItemsObj];
        },
        minus(state, action) {
            const updated_qty = state.cartItemsObj[action.payload].qty - 1;
            if (updated_qty === 0) {
                state.prodItemsObj = [...state.prodItemsObj, state.cartItemsObj[action.payload]];
                state.cartItemsObj.splice(action.payload, 1);
            } else {
                const updated_price = state.cartItemsObj[action.payload].basePrice * updated_qty;
                state.cartItemsObj[action.payload].price = updated_price;
                state.cartItemsObj[action.payload].qty = updated_qty;
                state.cartItemsObj = [...state.cartItemsObj];
            }
        },
    }
});

export default cartItemsReducer.reducer;
export const constCartItemsFcts = cartItemsReducer.actions;