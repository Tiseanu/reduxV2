import { constShowCartFcts } from './toggle-cart-slice';
import { constCartItemsFcts } from './cart-items-slice';

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
            dispatch(constShowCartFcts.showNotification({ status: 'error', title: 'Fail!', message: err.message }));
        }
    };
};

export const getData = (link, db) => { // returns an async function
    return async (dispatch) => {
        dispatch(constShowCartFcts.showNotification({ status: 'pending', title: 'Loading...', message: 'Getting data' }));

        const sendRequest = async () => {
            const response = await fetch(link);
            
            if (!response.ok) {
                throw new Error('Could not get data from DB');
            }
            const data = await response.json();
            return data;
        };

        try {
            const dataDB = await sendRequest();
            if (db === 'cart' && dataDB) {
                dispatch(constCartItemsFcts.setCartFromDB(dataDB));
            }
            if (db === 'prods' && dataDB) {
                dispatch(constCartItemsFcts.setProdsFromDB(dataDB));
            }
            
            dispatch(constShowCartFcts.showNotification({ status: 'success', title: 'Success!', message: 'Success Getting data' }));
        } catch (err) {
            dispatch(constShowCartFcts.showNotification({ status: 'error', title: 'Fail!', message: err.message }));
        }
        
    };
};