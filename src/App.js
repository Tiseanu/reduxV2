import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import Cart from './components/Cart/Cart';
import Layout from './components/Layout/Layout';
import Products from './components/Shop/Products';

function App() {
  const toggleCartState = useSelector(state => state.toggleCart.showCart);
  const myCart = useSelector(state => state.cartItems);

  useEffect(() => {
    fetch('https://products-345ff-default-rtdb.firebaseio.com/cart.json', {
      method: 'PUT',
      body: JSON.stringify(myCart.cartItemsObj)
    })
  }, [myCart]);

  useEffect(() => {
    fetch('https://products-345ff-default-rtdb.firebaseio.com/prods.json', {
      method: 'PUT',
      body: JSON.stringify(myCart.prodItemsObj)
    })
  }, [myCart]);

  return (
    <Layout>
      {toggleCartState && <Cart />}
      <Products />
    </Layout>
  );
}

export default App;
