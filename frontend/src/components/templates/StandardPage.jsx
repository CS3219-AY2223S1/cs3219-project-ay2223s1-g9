import styles from "./StandardPage.module.scss";

const StandardPage = ({ header, contentStyle, children }) => {
  return (
    <div className={styles.wrapper}>
      {header}
      <div className={styles.content} style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default StandardPage;
