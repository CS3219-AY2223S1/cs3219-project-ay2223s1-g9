import styles from "./BodyCopy.module.scss";

const BodyCopy = ({ text, style, bold, children }) => {
  return (
    <p className={`${styles.text} ${styles[bold]}`} style={style}>
      {text}
      {children}
    </p>
  );
};

export default BodyCopy;
