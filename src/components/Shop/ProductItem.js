import { useDispatch } from 'react-redux';
import Card from '../UI/Card';
import classes from './ProductItem.module.css';
import { constCartItemsFcts } from '../../store/cart-items-slice';


const ProductItem = (props) => {
  const { title, description, basePrice, currency } = props.info;
  const dispatch = useDispatch();
  const addProd2Cart = () => {
    // dispatch(constCartItemsFcts.addItem2cart({id, title, description, price: basePrice, basePrice, currency, qty}));
    dispatch(constCartItemsFcts.addItem2cart(props.id));
  };

  return (
    <li className={classes.item}>
      <Card>
        <header>
          <h3>{title}</h3>
          <div className={classes.price}>{currency}{basePrice}</div>
        </header>
        <p>{description}</p>
        <div className={classes.actions}>
          <button onClick={addProd2Cart}>Add to Cart</button>
        </div>
      </Card>
    </li>
  );
};

export default ProductItem;
