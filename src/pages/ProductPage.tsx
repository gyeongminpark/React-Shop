import { useQuery } from 'react-query';
import { useParams } from 'react-router-dom';
import { getProduct } from '../api';
import { categories, Product } from '../model';
import { useEffect, useState } from 'react';
import Container from '../components/Container';
import ProductItem from '../components/ProductItem';
import Breadcrumbs from '../components/Breadcrumbs';
export default function ProductPage() {
  const [path, setPath] = useState<string[]>([]);
  const { id } = useParams();

  const { isLoading, isError, data, error } = useQuery<Product>(
    [`@products/${id}`, id],
    () => getProduct(id),
    {
      staleTime: Infinity,
      cacheTime: Infinity,
    },
  );

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (!data) return;

    const { category, title } = data;
    for (const { title: name, keyword } of categories) {
      if (category.includes(keyword)) {
        setPath([name, title]);
        return;
      }
    }
  }, [data]);

  if (isLoading) return <div>로딩중...</div>;
  if (isError) return <div>에러 발생!</div>;

  return (
    <Container home={false}>
      <Breadcrumbs routes={path} />
      <ProductItem item={data} />
    </Container>
  );
}
