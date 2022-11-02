import MainPage from './pages/MainPage';
import CategoryPage from './pages/CategoryPage';
import ProductPage from './pages/ProductPage';
import Header from './components/Header';
import Drawer from './components/Drawer';
import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import axios from 'axios';
import { categories } from './model';
import { API_URL } from './api';
import { useAppDispatch, useAppState } from './context/AppContext';
import CartPage from './pages/CartPage';
import Footer from './components/Footer';

function App() {
  const [isDrawer, setIsDrawer] = useState(false);
  const { colorMode, products } = useAppState();
  const dispatch = useAppDispatch();

  useEffect(() => {
    async function getProducts() {
      const { data } = await axios.get(API_URL);
      dispatch({ type: 'SET_PRODUCTS', products: [...data] });
    }
    getProducts();
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', colorMode);
    window.localStorage.setItem('color-mode', colorMode);
  }, [colorMode]);

  useEffect(() => {
    if (isDrawer) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [isDrawer]);

  const onDrawer = () => {
    setIsDrawer(!isDrawer);
  };

  if (products.length === 0) return <div>상품 로딩중!</div>;

  return (
    <div>
      {isDrawer && <Drawer onDrawer={onDrawer} />}
      <Header onDrawer={onDrawer} />
      <div
        style={{
          marginTop: '4rem',
        }}
      ></div>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {categories.map((category) => (
          <Route
            key={category.keyword}
            path={category.url}
            element={
              <CategoryPage title={category.title} keyword={category.keyword} />
            }
          />
        ))}
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/cart" element={<CartPage />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
