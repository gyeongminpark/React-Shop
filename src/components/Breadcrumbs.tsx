import styles from './Breadcrumbs.module.css';

interface Props {
  routes: string[];
}

export default function Breadcrumbs({ routes }: Props) {
  return (
    <div className={styles.breadcrumbs}>
      <ul>
        {routes.map((route, idx) => (
          <li key={idx}>{route}</li>
        ))}
      </ul>
    </div>
  );
}
