import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

import styles from "./SignupButton.module.scss";

const SignupButton = () => {
  const { loginWithRedirect } = useAuth0();

  const handleSignUp = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/profile",
      },
      authorizationParams: {
        screen_hint: "signup",
      },
    });
  };

  return (
    <button className={styles["button__sign-up"]} onClick={handleSignUp}>
      Sign Up
    </button>
  );
};

export default SignupButton;
