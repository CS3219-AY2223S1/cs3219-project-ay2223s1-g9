import BodyCopyLarge from "./BodyCopyLarge";
import styles from "./PrimaryButton.module.scss";

const PrimaryButton = ({ text }) => {
  return (
    <div className={styles.wrapper}>
      <BodyCopyLarge
        style={{ color: "black" }}
        className={styles.text}
        text={text}
      />
    </div>
  );
};

export default PrimaryButton;