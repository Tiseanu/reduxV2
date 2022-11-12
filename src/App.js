import { Fragment, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';
import Notification from './components/UI/Notification';
import { sendData, getData } from './store/action-creator';

// this will not change and is not reinitialized if the component rerenders
// will be initialize on the first load
let isInitialCart = true;

function App() {
  const dispatch = useDispatch();
  const toggleCartState = useSelector(state => state.toggleCart.showCart);
  const myCart = useSelector(state => state.cartItems);
  const myNotification = useSelector(state => state.toggleCart.notification);

  useEffect(() => {
    if (isInitialCart) {
      isInitialCart = false;
      return;
    }
    dispatch(sendData('https://products-345ff-default-rtdb.firebaseio.com/cart.json', myCart.cartItemsObj));
    dispatch(sendData('https://products-345ff-default-rtdb.firebaseio.com/prods.json', myCart.prodItemsObj));
  }, [myCart, dispatch]);

  useEffect(() => {
    dispatch(getData('https://products-345ff-default-rtdb.firebaseio.com/cart.json', 'cart'));
    dispatch(getData('https://products-345ff-default-rtdb.firebaseio.com/prods.json', 'prods'));
  }, [dispatch]);


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
