import styles from './Container.module.css';
import cx from 'clsx';

export default function Container({
  home,
  children,
}: {
  children: React.ReactNode;
  home: boolean;
}) {
  return (
    <section className={cx(styles.container, { [styles.home]: home })}>
      {children}
    </section>
  );
}
