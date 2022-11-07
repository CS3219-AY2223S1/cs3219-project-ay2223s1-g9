import { AuthContext } from "../../AuthContext";
import BodyCopy from "./BodyCopy";
import styles from "./ProfileDropdown.module.scss";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import AccountIcon from "../../assets/icons/AccountIcon";

const ProfileDropdown = ({ text, to = "/problems" }) => {
  const { user, setUser } = useContext(AuthContext);
  const [dropdown, setDropdown] = useState(false);
  return (
    <div
      className={styles.wrapper}
      onClick={() => {
        setDropdown(!dropdown);
      }}
    >
      <AccountIcon />
      <BodyCopy text={user.username} />
      <div
        className={`${styles.dropdown} ${
          dropdown ? "" : styles["dropdown--hidden"]
        }`}
      >
        <div className={styles.dropdown__elem}>
          <BodyCopy text={"Change Password"} />
        </div>
        <div className={styles.dropdown__elem}>
          <BodyCopy text={"Delete Account"} />
        </div>
        <div className={styles.dropdown__elem}>
          <BodyCopy text={"Logout"} />
        </div>
      </div>
    </div>
  );
};

export default ProfileDropdown;
