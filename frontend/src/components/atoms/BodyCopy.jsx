import styles from "./BodyCopy.module.scss";

const BodyCopy = ({ text, style, bold }) => {
  return (
    <p className={`${styles.text} ${styles[bold]}`} style={style}>
      {text}
    </p>
  );
};

export default BodyCopy;
