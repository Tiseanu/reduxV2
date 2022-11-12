import { createSlice } from '@reduxjs/toolkit';
import { constShowCartFcts } from './toggle-cart-slice';

export const itemCurrecy = "$";

const prodItemsObj = [
    {id: 1,  title: 'Product 1', description: 'This is description for Product 1', price: '6', basePrice: '6', qty: 1},
    {id: 1,  title: 'Product 2', description: 'This is description for Product 2', price: '5', basePrice: '5', qty: 1}
];

const cartItemsReducer = createSlice({
    name: 'cart_item',
    initialState: { cartItemsObj: [], prodItemsObj, total: 0},
    reducers: {
        addItem2cart(state, action) {
            state.cartItemsObj = [...state.cartItemsObj, state.prodItemsObj[action.payload]];
            state.prodItemsObj.splice(action.payload, 1);
            state.total += Number(state.cartItemsObj[action.payload].basePrice);
        },
        removeItem(state, action) {
            state.cartItemsObj.splice(action.payload, 1);
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


export const sendData = (link, item) => { // returns an async function
    return async (dispatch) => {
        dispatch(constShowCartFcts.showNotification({ status: 'pending', title: 'Loading...', message: 'Updating data' }));

        const sendRequest = async () => {
            const response = await fetch(link, {
                method: 'PUT',
                body: JSON.stringify(item)
            });
            if (!response.ok) {
                throw new Error('Could not update the DB');
            }
        };

        try {
            await sendRequest();
            dispatch(constShowCartFcts.showNotification({ status: 'success', title: 'Success!', message: 'Success updating data' }));
        } catch (err) {
            dispatch(constShowCartFcts.showNotification({ status: 'error', title: 'Error', message: err.message }));
        }
    };
};


export default cartItemsReducer.reducer;
export const constCartItemsFcts = cartItemsReducer.actions;