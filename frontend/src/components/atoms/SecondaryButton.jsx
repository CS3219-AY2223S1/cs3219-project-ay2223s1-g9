import BodyCopy from "./BodyCopy";
import BodyCopyLarge from "./BodyCopyLarge";
import styles from "./SecondaryButton.module.scss";

const SecondaryButton = ({ text, onClick, color = "green", disable }) => {
  return (
    <div
      className={`${styles["btn__wrapper"]} ${
        styles[`btn__wrapper--${disable ? "disable" : color}`]
      }`}
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

export default SecondaryButton;
