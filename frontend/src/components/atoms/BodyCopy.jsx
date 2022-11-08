import styles from "./BodyCopy.module.scss";

const BodyCopy = ({ text, style, bold, children, color }) => {
  return (
    <p
      className={`${styles.text} ${styles[bold]} ${styles[color]}`}
      style={style}
    >
      {text}
      {children}
    </p>
  );
};

export default BodyCopy;
