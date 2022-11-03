import styles from "./StandardPage.module.scss";

const StandardPage = ({ header, children }) => {
  return (
    <div className={styles.wrapper}>
      {header}
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default StandardPage;
