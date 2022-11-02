import styles from './ProductsList.module.css';
import { Product } from '../model';
import { Link } from 'react-router-dom';
import cx from 'clsx';

interface Props {
  home: boolean;
  title: string;
  items?: Product[];
}

export default function ProductsList({ home, title, items }: Props) {
  return (
    <>
      <h2 className={styles.title}>{title}</h2>
      <div className={cx(styles.gridContainer, { [styles.home]: home })}>
        {items?.map((item) => (
          <Link
            to={`/product/${item.id}`}
            key={item.id}
            className={styles.card}
          >
            <figure>
              <img src={item.image} alt={item.title} />
            </figure>
            <div className={styles.cardBody}>
              <p className={styles.cardTitle}>{item.title}</p>
              <p className={styles.cardPrice}>{`$${Math.round(item.price)}`}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
