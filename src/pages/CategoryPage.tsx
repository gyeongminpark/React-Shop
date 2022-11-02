import styles from './CategoryPage.module.css';
import Breadcrumbs from '../components/Breadcrumbs';
import Container from '../components/Container';
import ProductsList from '../components/ProductsList';
import { useEffect } from 'react';
import { Product } from '../model';
import { useAppState } from '../context/AppContext';

interface Props {
  title: string;
  keyword: string;
}

function CategoryPage({ title, keyword }: Props) {
  const { products } = useAppState();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [title]);

  return (
    <Container home={false}>
      <Breadcrumbs routes={['홈', title]} />
      <article className={styles.article}>
        <ProductsList
          home={false}
          title={title}
          items={products?.filter((el: Product) =>
            el.category.includes(keyword),
          )}
        />
      </article>
    </Container>
  );
}

export default CategoryPage;
