import BodyCopy from "./BodyCopy";
import BodyCopyLarge from "./BodyCopyLarge";
import styles from "./PrimaryButton.module.scss";

const PrimaryButton = ({ text, onClick, style }) => {
  return (
    <div
      className={`${styles["btn__wrapper"]}`}
      style={style}
      onClick={onClick}
    >
      <div className={styles.btn__text}>{text}</div>

      {/* <BodyCopy
        //style={{ color: "black" }}
        bold={"bold"}
        text={text}
      /> */}
    </div>
  );
};

export default PrimaryButton;
