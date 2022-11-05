import BodyCopy from "./BodyCopy";
import BodyCopyLarge from "./BodyCopyLarge";
import styles from "./PrimaryButton.module.scss";

const PrimaryButton = ({ text, onClick }) => {
  return (
    <div className={`${styles["btn__wrapper"]}`} onClick={onClick}>
      <div className={styles.btn__text}>Start Now</div>

      {/* <BodyCopy
        //style={{ color: "black" }}
        bold={"bold"}
        text={text}
      /> */}
    </div>
  );
};

export default PrimaryButton;
