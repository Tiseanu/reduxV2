import { useSelector } from 'react-redux';
import Card from '../UI/Card';
import classes from './Cart.module.css';
import CartItem from './CartItem';

const Cart = (props) => {
  const cartItemsObj = useSelector(state => state.cartItems.cartItemsObj);
  return (
    <Card className={classes.cart}>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItemsObj.length >= 1 && cartItemsObj.map((item, i) => (
          <CartItem key={i} info={item} id={i} />
        ))}
        {cartItemsObj.length < 1 && 
          <p>No Item in your cart</p>
        }
      </ul>
    </Card>
  );
};

export default Cart;
