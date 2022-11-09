import styles from "./StandardPage.module.scss";

const StandardPage = ({ header, style, contentStyle, children }) => {
  return (
    <div className={styles.wrapper} style={style}>
      {header}
      <div className={styles.content} style={contentStyle}>
        {children}
      </div>
    </div>
  );
};

export default StandardPage;
