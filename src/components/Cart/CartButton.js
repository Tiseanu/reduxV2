import { useSelector, useDispatch } from 'react-redux';

import classes from './CartButton.module.css';
import { constShowCartFcts } from '../../store/toggle-cart-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const counterItems = useSelector(item => item.cartItems.cartItemsObj);

  const toggleCart = () => {
    dispatch(constShowCartFcts.toggleCart());
  };

  return (
    <button onClick={toggleCart} className={classes.button}>
      <span>My Cart</span>
      <span className={classes.badge}>{counterItems.length}</span>
    </button>
  );
};

export default CartButton;
