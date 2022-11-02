export interface Product {
  category: string;
  description: string;
  id: number;
  image: string;
  title: string;
  price: number;
  rating: { count: number; rate: number };
}

export const categories = [
  {
    title: '패션',
    url: '/fashion',
    keyword: 'clothing',
  },
  {
    title: '액세서리',
    url: '/accessory',
    keyword: 'jewelery',
  },
  {
    title: '디지털',
    url: '/digital',
    keyword: 'electronics',
  },
];
