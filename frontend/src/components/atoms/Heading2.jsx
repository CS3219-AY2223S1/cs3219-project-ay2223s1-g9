import styles from "./Heading2.module.scss";

const Heading2 = ({ text, style }) => {
  return (
    <p className={styles.text} style={style}>
      {text}
    </p>
  );
};

export default Heading2;
