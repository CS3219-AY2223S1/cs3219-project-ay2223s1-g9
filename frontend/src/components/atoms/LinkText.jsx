import { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./LinkText.module.scss";

const LinkText = ({ text, link = "/", children, style }) => {
  return (
    <Link className={styles.text} to={link}>
      {text}
      {children}
    </Link>
  );
};

export default LinkText;
