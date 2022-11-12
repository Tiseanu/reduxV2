import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { constShowCartFcts } from './store/toggle-cart-slice';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';

// this will not change and is not reinitialized if the component rerenders
// will be initialize on the first load
let isInitialCart = true;

function App() {

  const dispatch = useDispatch();
  const toggleCartState = useSelector(state => state.toggleCart.showCart);
  const myCart = useSelector(state => state.cartItems);
  const myNotification = useSelector(state => state.toggleCart.notification);

  // useEffect(() => {
  //   fetch('https://products-345ff-default-rtdb.firebaseio.com/cart.json', {
  //     method: 'PUT',
  //     body: JSON.stringify(myCart.cartItemsObj)
  //   });
  // }, [myCart]);

  // cart
  useEffect(() => {
    const sendCartData = async () => { // this runs only if some of the dependencies changes
      dispatch(constShowCartFcts.showNotification({ status: 'pending', title: 'Loading...', message: 'Updating cart data' }));
      const response = await fetch('https://products-345ff-default-rtdb.firebaseio.com/cart.json', {
        method: 'PUT',
        body: JSON.stringify(myCart.cartItemsObj)
      });
      if (!response.ok) {
        throw new Error('Could not update the cart DB');
      }
      dispatch(constShowCartFcts.showNotification({ status: 'success', title: 'Success!', message: 'Success updating cart data' }));
    };

    const sendProdData = async () => {
      dispatch(constShowCartFcts.showNotification({ status: 'pending', title: 'Loading...', message: 'Updating prods data' }));
      const response = await fetch('https://products-345ff-default-rtdb.firebaseio.com/prods.json', {
        method: 'PUT',
        body: JSON.stringify(myCart.prodItemsObj)
      });
      if (!response.ok) {
        throw new Error('Could not update the prods DB');
      }
      dispatch(constShowCartFcts.showNotification({ status: 'success', title: 'Success!', message: 'Success updating prods data' }));
    };

    if (isInitialCart) {
      isInitialCart = false;
      return;
    }
    // these  will run only for the first time
    sendCartData().catch(err => {
      dispatch(constShowCartFcts.showNotification({ status: 'error', title: 'Error', message: err.message }));
    });
    sendProdData().catch(err => {
      dispatch(constShowCartFcts.showNotification({ status: 'error', title: 'Error', message: err.message }));
    });


  }, [myCart, dispatch]);

  return (
    <Fragment>
      {myNotification && <Notification info={myNotification} />}
      <Layout>
        {toggleCartState && <Cart />}
        <Products />
      </Layout>
    </Fragment>
  );
}

export default App;
