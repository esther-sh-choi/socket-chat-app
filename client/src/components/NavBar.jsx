import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

import LogoutButton from "./LogoutButton";
import LoginButton from "./LoginButton";
import SignupButton from "./SignupButton";

import styles from "./NavBar.module.scss";

const NavBar = ({ socket }) => {
  const { isAuthenticated, user } = useAuth0();

  console.log("navbar");

  return (
    <div className={styles.navbar__container}>
      <nav className={styles.navbar}>
        <div>Chatty</div>

        {isAuthenticated ? (
          <div className={styles.authentication_buttons}>
            <p>Logged in as {user.nickname}</p>
            <LogoutButton />
          </div>
        ) : (
          <div className={styles.authentication_buttons}>
            <LoginButton />
            <SignupButton />
          </div>
        )}
      </nav>
    </div>
  );
};

export default NavBar;
