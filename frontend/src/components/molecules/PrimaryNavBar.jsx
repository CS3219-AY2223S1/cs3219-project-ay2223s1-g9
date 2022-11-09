import LogoLink from "../atoms/LogoLink";
import NavBarLink from "../atoms/NavBarLink";
import ProfileDropdown from "../atoms/ProfileDropdown";
import styles from "./NavBar.module.scss";

const PrimaryNavBar = () => {
  return (
    <div className={styles.wrapper}>
      <LogoLink />
      <div className={styles.content}>
        <NavBarLink text={"Problems"} />
        <ProfileDropdown />
      </div>
    </div>
  );
};

export default PrimaryNavBar;
