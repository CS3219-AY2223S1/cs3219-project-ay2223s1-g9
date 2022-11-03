import styles from "./BodyCopyLarge.module.scss";

const BodyCopyLarge = ({ text, style, bold, children }) => {
  return (
    <p className={`${styles.text} ${styles[bold]}`} style={style}>
      {text}
      {children}
    </p>
  );
};

export default BodyCopyLarge;
