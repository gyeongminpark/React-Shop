import styles from './Header.module.css';
import { categories, Product } from '../model';
import { BiMenu, BiSun, BiMoon, BiSearch, BiShoppingBag } from 'react-icons/bi';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppState } from '../context/AppContext';
import { useEffect, useState } from 'react';
import cx from 'clsx';

interface HeaderProps {
  onDrawer: () => void;
}

export default function Header({ onDrawer }: HeaderProps) {
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { colorMode, products, total } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (inputValue === '') {
      setFilteredProducts([]);
      return;
    }

    const filtered = products.filter((product) =>
      product.title.toLowerCase().includes(inputValue.toLowerCase()),
    );
    setFilteredProducts(filtered);
  }, [inputValue]);

  useEffect(() => {
    setInputValue('');
  }, [showSearchBar]);

  const setMode = () =>
    dispatch({
      type: 'CHANGE_MODE',
      color: colorMode === 'dark' ? 'light' : 'dark',
    });

  return (
    <div className={styles.header}>
      <div className={styles.inner}>
        <label className={styles.menuArea} htmlFor="side-menu">
          <BiMenu onClick={onDrawer} className={styles.menuIcon}></BiMenu>
        </label>
        <h1 className={styles.logo}>
          <Link to="/">React Shop</Link>
        </h1>
        <div className={styles.nav}>
          {categories.map((category, idx) => (
            <Link key={idx} className={styles.link} to={category.url}>
              {category.title}
            </Link>
          ))}
        </div>
        <div className={styles.flexContainer}>
          <label className={styles.swap}>
            <input type="checkbox" />
            {colorMode === 'dark' ? (
              <BiSun onClick={setMode} className={styles.swapLight}></BiSun>
            ) : (
              <BiMoon onClick={setMode} className={styles.swapDark}></BiMoon>
            )}
          </label>
          <div className={styles.dropdown}>
            <button
              type="button"
              onClick={() => setShowSearchBar(!showSearchBar)}
              className={styles.searchButton}
            >
              <BiSearch className={styles.searchIcon}></BiSearch>
            </button>
            <input
              className={cx(styles.searchInput, {
                [styles.show]: showSearchBar,
              })}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="검색"
            />
            <ul className={styles.filteredList}>
              {filteredProducts.map((product) => (
                <li
                  onClick={() => setShowSearchBar(!showSearchBar)}
                  key={product.id}
                >
                  <Link to={`product/${product.id}`}>{product.title}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link to="/cart" className={styles.cartArea}>
            <span>
              <BiShoppingBag className={styles.cartIcon}></BiShoppingBag>
              <div className={styles.total}>{total}</div>
            </span>
          </Link>
        </div>
      </div>
    </div>
  );
}
