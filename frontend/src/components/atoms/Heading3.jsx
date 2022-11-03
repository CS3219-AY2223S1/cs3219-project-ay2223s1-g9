import styles from "./Heading3.module.scss";

const Heading3 = ({ text, style }) => {
  return (
    <p className={styles.text} style={style}>
      {text}
    </p>
  );
};

export default Heading3;
