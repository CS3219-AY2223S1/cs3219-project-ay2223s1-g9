import { useEffect } from "react";
import { Link } from "react-router-dom";

import styles from "./LinkText.module.scss";

const LinkText = ({ text, link = "/", onClick, children, style }) => {
  return (
    <div className={styles.wrapper} style={style}>
      {onClick ? (
        <div className={styles.text} onClick={onClick}>
          {text}
          {children}
        </div>
      ) : (
        <Link className={styles.text} to={link}>
          {text}
          {children}
        </Link>
      )}
    </div>
  );
};

export default LinkText;
