import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './Carousel.module.css';
import { Carousel as CarouselLib } from 'react-responsive-carousel';
import { useState, useEffect } from 'react';

const imgs = [
  {
    id: 1,
    src: 'https://react-shop-oinochoe.vercel.app/img_shop_fashion.jpeg',
    title: '물빠진 청바지!',
    desc: '이제 막 도착한 패션 청바지를 구경해 보세요.',
  },
  {
    id: 2,
    src: 'https://react-shop-oinochoe.vercel.app/img_shop_digital.jpeg',
    title: '신속한 업무처리!',
    desc: '다양한 디지털 상품을 둘러보세요.',
  },
  {
    id: 3,
    src: 'https://react-shop-oinochoe.vercel.app/img_shop_grocery.jpeg',
    title: '신선한 제품!',
    desc: '농장 직배송으로 더욱 신선한 식료품을 만나보세요.',
  },
];
export default function Carousel() {
  const [clientWidth, setClientWidth] = useState(0);

  useEffect(() => {
    const clientWidth = document.documentElement.clientWidth;
    setClientWidth(clientWidth);
    window.addEventListener('resize', () => {
      const clientWidth = document.documentElement.clientWidth;
      setClientWidth(clientWidth);
    });
  }, []);

  return (
    <div className={styles.container}>
      <CarouselLib
        autoPlay={false}
        infiniteLoop={true}
        showArrows={clientWidth >= 1025 ? true : false}
        showStatus={false}
        showThumbs={false}
      >
        {imgs.map((img) => (
          <div className={styles.slide} key={img.id}>
            <img src={img.src} />
            <div className={styles.caption}>
              <h2 className={styles.title}>{img.title}</h2>
              <p className={styles.desc}>{img.desc}</p>
              <button className={styles.button}>바로가기</button>
            </div>
          </div>
        ))}
      </CarouselLib>
    </div>
  );
}
