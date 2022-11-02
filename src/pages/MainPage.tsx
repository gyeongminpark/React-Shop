import styles from './MainPage.module.css';
import { useEffect } from 'react';
import Carousel from '../components/Carousel';
import ProductsList from '../components/ProductsList';
import { Product, categories } from '../model';
import { useAppState } from '../context/AppContext';
import Container from '../components/Container';

export default function MainPage() {
  const { products } = useAppState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Carousel />
      {categories.map((cate) => (
        <Container key={cate.keyword} home={true}>
          <ProductsList
            home={true}
            title={cate.title}
            items={products
              ?.filter((el: Product) => el.category.includes(cate.keyword))
              .slice(0, 4)}
          />
        </Container>
      ))}
    </>
  );
}
