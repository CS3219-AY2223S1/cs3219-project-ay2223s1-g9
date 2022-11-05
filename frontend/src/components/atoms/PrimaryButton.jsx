import BodyCopy from "./BodyCopy";
import BodyCopyLarge from "./BodyCopyLarge";
import styles from "./PrimaryButton.module.scss";

const PrimaryButton = ({ text, onClick }) => {
  return (
    <div className={styles.wrapper} onClick={onClick}>
      {/* <BodyCopyLarge
        style={{ color: "black" }}
        className={styles.text}
        text={text}
      /> */}
      <BodyCopy style={{ color: "black" }} bold={"bold"} text={text} />
    </div>
  );
};

export default PrimaryButton;
