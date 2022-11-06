import { useSelector } from 'react-redux';
import ProductItem from './ProductItem';
import classes from './Products.module.css';

const Products = (props) => {
  const prodItemsObj = useSelector(prod => prod.cartItems.prodItemsObj);

  return (
    <section className={classes.products}>
      <h2>Buy your favorite products</h2>
      <ul>
        {prodItemsObj.length >= 1 && prodItemsObj.map((prod, i) => ( <ProductItem key={i} info={prod} id={i} /> ))}
        {prodItemsObj.length < 1 && <p className={classes.empty}>No products available!</p>}
      </ul>
    </section>
  );
};

export default Products;
