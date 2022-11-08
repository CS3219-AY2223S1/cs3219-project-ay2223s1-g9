import LogoLink from "../atoms/LogoLink";
import styles from "./NavBar.module.scss";

const SecondaryNavBar = () => {
  return (
    <div className={styles.wrapper}>
      <LogoLink />
    </div>
  );
};

export default SecondaryNavBar;
