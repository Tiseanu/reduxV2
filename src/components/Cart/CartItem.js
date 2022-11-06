import { useDispatch } from 'react-redux';
import classes from './CartItem.module.css';

import { constCartItemsFcts } from '../../store/cart-items-slice'

const CartItem = (props) => {
  const { title, price, basePrice, currency, qty } = props.info;
  const dispatch = useDispatch();

  const plusQty = () => {
    dispatch(constCartItemsFcts.plus(props.id));
  }
  const minusQty = () => {
    dispatch(constCartItemsFcts.minus(props.id));
  }

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          {currency}{price} <span className={classes.itemprice}>({currency}{basePrice}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{qty}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={minusQty}>-</button>
          <button onClick={plusQty}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
