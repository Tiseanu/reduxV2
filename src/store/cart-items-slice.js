import { createSlice } from '@reduxjs/toolkit';

export const itemCurrecy = "$";

const cartItemsObj = [
    {id: 1,  title: 'Product 1', description: 'This is description for Product 1', price: '6', basePrice: '6', qty: 1},
];
const prodItemsObj = [
    {id: 1,  title: 'Product 2', description: 'This is description for Product 2', price: '5', basePrice: '5', qty: 1}
];

const cartItemsReducer = createSlice({
    name: 'cart_item',
    initialState: { cartItemsObj, prodItemsObj, total: 6},
    reducers: {
        addItem2cart(state, action) {
            state.cartItemsObj = [...state.cartItemsObj, state.prodItemsObj[action.payload]];
            state.prodItemsObj.splice(action.payload - 1, 1);
            state.total += Number(state.cartItemsObj[action.payload + 1].basePrice);
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
            state.total += Number(state.cartItemsObj[action.payload].basePrice);
        },
        minus(state, action) {
            const updated_qty = state.cartItemsObj[action.payload].qty - 1;
            if (updated_qty === 0) {
                state.total -= Number(state.cartItemsObj[action.payload].basePrice);
                state.prodItemsObj = [...state.prodItemsObj, state.cartItemsObj[action.payload]];
                state.cartItemsObj.splice(action.payload, 1);
            } else {
                const updated_price = state.cartItemsObj[action.payload].basePrice * updated_qty;
                state.cartItemsObj[action.payload].price = updated_price;
                state.cartItemsObj[action.payload].qty = updated_qty;
                state.cartItemsObj = [...state.cartItemsObj];
                state.total -= Number(state.cartItemsObj[action.payload].basePrice);
            }
        },
    }
});

export default cartItemsReducer.reducer;
export const constCartItemsFcts = cartItemsReducer.actions;