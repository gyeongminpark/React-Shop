import styles from './Drawer.module.css';
import { categories } from '../model';
import { Link } from 'react-router-dom';

interface Props {
  onDrawer: () => void;
}

export default function Drawer({ onDrawer }: Props) {
  return (
    <>
      <div className={styles.blurred} onClick={onDrawer}></div>
      <ul className={styles.menu}>
        {categories.map((category) => (
          <li key={category.keyword}>
            <Link onClick={onDrawer} className={styles.link} to={category.url}>
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
