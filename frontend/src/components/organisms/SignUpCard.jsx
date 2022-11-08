import Heading4 from "../atoms/Heading4";
import LinkText from "../atoms/LinkText";
import styles from "./AuthCard.module.scss";
import BodyCopy from "../atoms/BodyCopy";
import PrimaryButton from "../atoms/PrimaryButton";

const SignUpCard = ({
  username,
  setUsername,
  password,
  setPassword,
  handleSubmit,
}) => {
  return (
    <div className={styles.wrapper}>
      <Heading4 text={"Sign Up"} />
      <form className={styles.form}>
        <input
          className={styles.field}
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className={styles.field}
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <PrimaryButton text={"Create Account"} onClick={handleSubmit} />
      </form>

      <BodyCopy>
        Have an account? <LinkText>Login</LinkText>
      </BodyCopy>
    </div>
  );
};

export default SignUpCard;
