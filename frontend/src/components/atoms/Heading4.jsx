import styles from "./Heading4.module.scss";

const Heading4 = ({ text, style, children }) => {
  return (
    <p className={styles.text} style={style}>
      {text}
      {children}
    </p>
  );
};

export default Heading4;
