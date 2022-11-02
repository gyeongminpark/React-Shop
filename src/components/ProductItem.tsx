import styles from './ProductItem.module.css';
import { Link } from 'react-router-dom';
import { Product } from '../model';
import { useAppDispatch } from '../context/AppContext';
import cx from 'clsx';

interface Props {
  item?: Product;
}
export default function ProductItem({ item }: Props) {
  const dispatch = useAppDispatch();

  if (!item) return <div></div>;

  return (
    <div className={styles.itemContainer}>
      <figure className={styles.figure}>
        <img className={styles.image} src={item.image} alt={item.title} />
      </figure>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>{item.title}</h2>
        <p className={styles.cardDescription}>{item.description}</p>
        <div className={styles.cardRating}>
          {`${item.rating.rate} / ${item.rating.count} 참여`}
        </div>
        <p className={styles.cardPrice}>{`$${Math.round(item.price)}`}</p>
        <div className={styles.cardActions}>
          <button
            className={cx('btn', 'btn-primary')}
            onClick={() => dispatch({ type: 'ADD_CART', product: item })}
          >
            장바구니에 담기
          </button>
          <Link className={cx('btn', 'btn-outline')} to="/cart">
            장바구니로 이동
          </Link>
        </div>
      </div>
    </div>
  );
}
