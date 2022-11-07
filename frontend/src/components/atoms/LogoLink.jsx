import Logo from "../../assets/icons/LogoIcon";
import { Link } from "react-router-dom";

import styles from "./LogoLink.module.scss";

const LogoLink = ({ text, style, bold, children }) => {
  return (
    <Link className={styles.wrapper} to={"/"}>
      <Logo />
    </Link>
  );
};

export default LogoLink;
