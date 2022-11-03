import styles from "./Heading2.module.scss";

const Heading2 = ({ text, style, children }) => {
  return (
    <p className={styles.text} style={style}>
      {text}
      {children}
    </p>
  );
};

export default Heading2;
