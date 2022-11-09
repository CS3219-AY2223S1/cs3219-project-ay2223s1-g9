import BodyCopy from "./BodyCopy";
import styles from "./NavBarLink.module.scss";
import { Link } from "react-router-dom";

const NavBarLink = ({ text, to = "/problems" }) => {
  return (
    <div className={styles.wrapper}>
      <Link className={styles.link} to={to}>
        <BodyCopy text={text} />
      </Link>
    </div>
  );
};

export default NavBarLink;
