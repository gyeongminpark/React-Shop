import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../context/AppContext';
import { Product } from '../model';
import styles from './CartPage.module.css';
import cx from 'clsx';
import Container from '../components/Container';
import Breadcrumbs from '../components/Breadcrumbs';

function Nothing() {
  return (
    <>
      <h1 className={styles.nothing}>장바구니에 물품이 없습니다.</h1>
      <Link className={cx('btn', 'mt-10')} to="/">
        담으러 가기
      </Link>
    </>
  );
}

function List({ cart }: { cart: { product: Product; count: number }[] }) {
  return (
    <div className={styles.list}>
      {cart.map(({ product, count }) => (
        <Item key={product.id} product={product} count={count} />
      ))}
    </div>
  );
}

interface Props {
  product: Product;
  count: number;
}

function Item({ product, count }: Props) {
  const dispatch = useAppDispatch();
  return (
    <div className={styles.item}>
      <Link to={`/product/${product.id}`}>
        <figure className={styles.itemFigure}>
          <img src={product.image} alt={product.title} />
        </figure>
      </Link>
      <div className={styles.cardBody}>
        <h2 className={styles.cardTitle}>
          <Link to={`/product/${product.id}`}>{product.title}</Link>
        </h2>
        <p className={styles.cardPrice}>{`$${
          Math.round(product.price) * count
        }`}</p>
        <div className={styles.cardActions}>
          <div className={styles.btnGroup}>
            <button
              className={cx('btn')}
              onClick={() => dispatch({ type: 'DECREASE', product })}
            >
              -
            </button>
            <div className={styles.count}>{count}</div>
            <button
              className={cx('btn')}
              onClick={() => dispatch({ type: 'INCREASE', product })}
            >
              +
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CartPage() {
  const [costs, setCosts] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const { cart, total } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const sum = cart.reduce(
      (acc, cur) => acc + Math.round(cur.product.price) * cur.count,
      0,
    );
    setCosts(sum);
  }, [cart]);

  return (
    <Container home={false}>
      <Breadcrumbs routes={['홈', '장바구니']} />
      <div className={styles.cartInfo}>
        <div className={styles.costsArea}>
          <div>{total > 0 ? <List cart={cart} /> : <Nothing />}</div>
          <div className={styles.costsInfo}>
            <span>{`$${costs}`}</span>
            <label
              onClick={() => setShowModal(true)}
              htmlFor="confirm-modal"
              className={cx('btn', 'ml-5')}
            >
              구매하기
            </label>
          </div>
        </div>
      </div>
      <input
        type="checkbox"
        id="confirm-modal"
        className={styles.modalToggle}
      />
      <div className={cx(styles.modal, { [styles.show]: showModal })}>
        <div className={styles.modalBox}>
          <h3>정말로 구매하시겠습니까?</h3>
          <p>장바구니의 모든 상품들이 삭제됩니다.</p>
          <div className={styles.modalAction}>
            <label
              htmlFor="confirm-modal"
              className={cx('btn')}
              onClick={() => {
                dispatch({ type: 'REMOVEALL' });
                setShowModal(false);
              }}
            >
              네
            </label>
            <label
              onClick={() => setShowModal(false)}
              htmlFor="confirm-modal"
              className={cx('btn')}
            >
              아니요
            </label>
          </div>
        </div>
      </div>
    </Container>
  );
}
